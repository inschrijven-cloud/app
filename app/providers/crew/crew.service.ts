import {Injectable} from '@angular/core';
import {PouchDBService} from "../pouchdb/pouchdb.service";
import IPouchDB = pouchDB.IPouchDB;
import {Crew} from "../../models/crew.model";

@Injectable()
export class CrewService {
  private db: IPouchDB;

  constructor(private pouchdbService: PouchDBService) {
    this.db = pouchdbService.getDb("some-db")
  }

  getAll(): Promise<Array<Crew>> {
    return this.db
      .query(row => {
        if (row.type === "type/crew/v1") emit(row._id, row)
      })
      .then(res => res.rows.map(row => new Crew(row.value)))
  }
}
