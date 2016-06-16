import {Injectable} from "@angular/core";
import {PouchDBService} from "../pouchdb/pouchdb.service";
import IPouchDB = pouchDB.IPouchDB;
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

  getAll(): BehaviorSubject<Array<Child>> {
    return this.data;
  }

  private updateData(): void {
    // emit wil actually not be provided to the callback, this is done just so typescript doesn't complain
    const fun = <((doc: any) => void)>((row, emit) => {
      if (row.type === "type/child/v1") { // can't pass in Child.type, closures don't work
        emit(row._id, row);
      }
    });

    this.db
      .query(fun)
      .then(res => res.rows.map(row => new Child(row.value)))
      .then(res => this.data.next(res))
      .catch(e => console.error(e));
  }
}
