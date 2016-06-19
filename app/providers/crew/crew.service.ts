import {Injectable} from "@angular/core";
import {PouchDBService} from "../pouchdb/pouchdb.service";
import IPouchDB = pouchDB.IPouchDB;
import {Crew} from "../../models/crew.model";
import {Observable, BehaviorSubject, ReplaySubject} from "rxjs/Rx";
import {PouchDBChange} from "../pouchdb/pouchdb-change";
import IOk = pouchDB.Response.IOk;

@Injectable()
export class CrewService {
  private db: IPouchDB;
  private changeObservable: Observable<PouchDBChange>;
  private data: BehaviorSubject<Array<Crew>> = new BehaviorSubject([]);

  constructor(private pouchdbService: PouchDBService) {
    this.db = pouchdbService.getDb("some-db");
    this.changeObservable = pouchdbService.getChangeObservable("some-db").filter(x => x.doc.type === Crew.theType);
    this.updateData();
    this.changeObservable.subscribe((change) => this.updateData());
  }

  insert(crew: Crew): Promise<IOk> {
    return this.db.put(crew);
  }

  getAll(): BehaviorSubject<Array<Crew>> {
    return this.data;
  }

  getById(id: string): ReplaySubject<Crew> {
    // could also filter this.data
    // but directly getting by id from the database will provide faster updates

    const res = new ReplaySubject<Crew>(1);

    this.db.get<any>(id).then(row => res.next(new Crew(row))).catch(e => res.error(e));

    this.changeObservable.filter(change => change.id === id).subscribe(
      (change) => this.db.get<any>(id).then(row => res.next(new Crew(row))).catch(e => res.error(e)),
      (e) => res.error(e)
    );

    return res;
  }

  private updateData(): void {
    // emit wil actually not be provided to the callback, this is done just so typescript doesn't complain
    const fun = <(doc: any) => void>((row, emit) => {
      if (row.type === "type/crew/v1") { // can't pass in Crew.type, closures don't work
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
