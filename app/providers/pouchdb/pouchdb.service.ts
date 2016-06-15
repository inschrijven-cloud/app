import {Injectable} from "@angular/core";
import "rxjs/add/operator/map";
import {Map} from "immutable";
import IPouchDB = pouchDB.IPouchDB;
import {Observable} from "rxjs/Rx";
import {PouchDBChange} from "./pouchdb-change";

@Injectable()
export class PouchDBService {
  private databases: Map<string, IPouchDB> = Map<string, IPouchDB>();
  private changeObservables: Map<string, Observable<PouchDBChange>> = Map<string, Observable<PouchDBChange>>();

  getDb(name: string): IPouchDB {
    if (!this.databases.get(name)) {
      this.databases = this.databases.set(name, new PouchDB(name));

      console.log("Starting PouchDB syncing...");
      const remote:string = "http://localhost:5984/test-children";
      this.databases.get(name).replicate
        .from(remote, {live: true, retry: true, continuous: true})
        .on("complete", () => console.log("Syncing PouchDB with remote complete"))
        .on("error", (e) => console.error("Error syncing with remote: ", e))
        .on("change", (change) => console.log("Syncing PouchDB: change detected"))
        .on("paused", () => console.log("Syncing PouchDB was paused, probably because of lost connection"))
        .on("active", () => console.log("Syncing PouchDB has become active, replication has been resumed"));

    }

    return this.databases.get(name);
  }

  getChangeObservable(name: string): Observable<PouchDBChange> {
    if(!this.changeObservables.get(name)) {
      const observable = Observable.create((observer) => {
        const pouchChange = this.databases.get(name).changes({
          since: 'now',
          live: true,
          include_docs: true,
        }).on('change', (change) => {
          observer.next(change);
        });

        return () => pouchChange.cancel();
      }).publish();

      observable.connect();
      this.changeObservables = this.changeObservables.set(name, observable);
    }

    return this.changeObservables.get(name);
  }
}
