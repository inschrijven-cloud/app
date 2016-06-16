import {Injectable} from "@angular/core";
import "rxjs/add/operator/map";
import {Map} from "immutable";
import IPouchDB = pouchDB.IPouchDB;
import {Observable, BehaviorSubject} from "rxjs/Rx";
import {PouchDBChange} from "./pouchdb-change";
import {PouchDBStatus} from "./pouchdb-status";

@Injectable()
export class PouchDBService {
  private databases: Map<string, IPouchDB> = Map<string, IPouchDB>();
  private changeObservables: Map<string, Observable<PouchDBChange>> = Map<string, Observable<PouchDBChange>>();
  private statusSubjects: Map<string, BehaviorSubject<PouchDBStatus>> = Map<string, BehaviorSubject<PouchDBStatus>>();

  getDb(name: string): IPouchDB {
    if (!this.databases.get(name)) {
      this.databases = this.databases.set(name, new PouchDB(name));

      const subject = new BehaviorSubject<PouchDBStatus>("started");

      const remote: string = "http://localhost:5984/test-children";
      this.databases.get(name).replicate
        .from(remote, {live: true, retry: true })
        .on("complete", () => subject.next("complete"))
        .on("paused", () => subject.next("paused"))
        .on("active", () => subject.next("active"))
        .on("error", (e) => {
          subject.next("error");
          console.error("Error syncing with remote: ", e)
        })
        .on("denied", (e) => {
          subject.next("denied");
          console.log("A document failed to replicatie (e.g. due to permissions)", e);
        });

      this.statusSubjects = this.statusSubjects.set(name, subject);
    }

    return this.databases.get(name);
  }

  getChangeObservable(name: string): Observable<PouchDBChange> {
    if (!this.changeObservables.get(name)) {
      const observable = Observable.create((observer) => {
        const pouchChange = this.databases.get(name).changes({
          since: "now",
          live: true,
          include_docs: true,
        }).on("change", (change) => {
          observer.next(change);
        });

        return () => pouchChange.cancel();
      }).publish();

      observable.connect();
      this.changeObservables = this.changeObservables.set(name, observable);
    }

    return this.changeObservables.get(name);
  }

  getStatusSubject(name: string): BehaviorSubject<PouchDBStatus> {
    return this.statusSubjects.get(name);
  }
}
