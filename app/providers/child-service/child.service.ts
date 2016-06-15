import {Injectable} from "@angular/core";
import {Injectable} from '@angular/core';
import {PouchDBService} from "../pouchdb/pouchdb.service";
import IPouchDB = pouchDB.IPouchDB;
import {Crew} from "../../models/crew.model";
import {Observable, BehaviorSubject} from "rxjs/Rx";
import {PouchDBChange} from "../pouchdb/pouchdb-change";
import {Child} from "../../models/child.model";

@Injectable()
export class ChildService {
  private db: IPouchDB;
  private changeObservable: Observable<PouchDBChange>;
  private data: BehaviorSubject<Array<Child>> = new BehaviorSubject([]);

  constructor(private pouchdbService: PouchDBService) {
    this.db = pouchdbService.getDb("some-db");
    this.changeObservable = pouchdbService.getChangeObservable("some-db").filter(x => x.doc.type === Child.type);
    this.updateData();
    this.changeObservable.subscribe((change) => this.updateData());
  }

  // TODO remove this method and filter on the side of the component? (using a view or something?)
  findByName(name: string): BehaviorSubject<Array<Child>> {
    name = name || "";
    return this.data.map(rows => rows.filter(row => {
      return (row.firstName + " " + row.lastName).toLowerCase().indexOf(name.toLowerCase()) !== -1;
    }));
  }

  getAll(): BehaviorSubject<Array<Child>> {
    return this.data;
  }

  private updateData(): void {
    this.db
      .query(row => {
        if (row.type === "type/child/v1") { // can't pass in Child.type, closures don't work
          //noinspection TypeScriptUnresolvedFunction
          emit(row._id, row)
        }
      })
      .then(res => res.rows.map(row => new Crew(row.value)))
      .then(res => this.data.next(res))
      .catch(e => console.error(e));
  }
}
