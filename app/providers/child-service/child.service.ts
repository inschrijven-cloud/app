import {Injectable} from "@angular/core";
import {PouchDBService} from "../pouchdb/pouchdb.service";
import IPouchDB = pouchDB.IPouchDB;
import {Observable, BehaviorSubject, ReplaySubject} from "rxjs/Rx";
import {PouchDBChange} from "../pouchdb/pouchdb-change";
import {Child} from "../../models/child.model";
import IOk = pouchDB.Response.IOk;

@Injectable()
export class ChildService {
  private db: IPouchDB;
  private changeObservable: Observable<PouchDBChange>;
  private data: BehaviorSubject<Array<Child>> = new BehaviorSubject([]);

  constructor(private pouchdbService: PouchDBService) {
    this.db = pouchdbService.getDb("some-db");
    this.changeObservable = pouchdbService.getChangeObservable("some-db").filter(x => x.doc.type === Child.theType).share();
    this.updateData();
    this.changeObservable.subscribe((change) => this.updateData());
  }

  insert(child: Child): Promise<IOk> {
    return this.db.put(child);
  }

  getAll(): BehaviorSubject<Array<Child>> {
    return this.data;
  }

  getById(id: string): ReplaySubject<Child> {
    // could also filter this.data
    // but directly getting by id from the database will provide faster updates

    const res = new ReplaySubject<Child>(1);

    this.db.get<any>(id).then(row => res.next(new Child(row))).catch(e => res.error(e));

    this.changeObservable.filter(change => change.id === id).subscribe(
      (change) => this.db.get<any>(id).then(row => res.next(new Child(row))).catch(e => res.error(e)),
      (e) => res.error(e)
    );

    return res;
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
