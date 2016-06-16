import {Injectable} from "@angular/core";
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
  findByName(name: string): Observable<Array<Child>> {
    name = name || "";
    return this.data.map(rows => rows.filter(row => {
      return (row.firstName + " " + row.lastName).toLowerCase().indexOf(name.toLowerCase()) !== -1;
    }));
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
      .then(res => res.rows.map(row => new Crew(row.value)))
      .then(res => this.data.next(res))
      .catch(e => console.error(e));
  }
}
