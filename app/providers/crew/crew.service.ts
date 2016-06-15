import {Injectable} from '@angular/core';
import {PouchDBService} from "../pouchdb/pouchdb.service";
import IPouchDB = pouchDB.IPouchDB;
import {Crew} from "../../models/crew.model";
import {Observable, BehaviorSubject} from "rxjs/Rx";
import {PouchDBChange} from "../pouchdb/pouchdb-change";

@Injectable()
export class CrewService {
  private db: IPouchDB;
  private changeObservable: Observable<PouchDBChange>;
  private data: BehaviorSubject<Array<Crew>> = new BehaviorSubject([]);

  constructor(private pouchdbService: PouchDBService) {
    this.db = pouchdbService.getDb("some-db");
    this.changeObservable = pouchdbService.getChangeObservable("some-db").filter(x => x.doc.type === Crew.type);
    this.updateData();
    this.changeObservable.subscribe((change) => this.updateData());
  }

  getAll(): BehaviorSubject<Array<Crew>> {
    return this.data;
  }

  private updateData(): void {
    this.db
      .query(row => {
        if (row.type === "type/crew/v1") { // can't pass in Crew.type, closures don't work
          //noinspection TypeScriptUnresolvedFunction
          emit(row._id, row)
        }
      })
      .then(res => res.rows.map(row => new Crew(row.value)))
      .then(res => this.data.next(res))
      .catch(e => console.error(e));
  }
}
