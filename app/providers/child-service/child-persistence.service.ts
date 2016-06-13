import {Injectable} from "@angular/core";
import IPouchDB = pouchDB.IPouchDB;
import {Child} from "../../models/child.model";

@Injectable()
export class ChildPersistenceService {
  db: IPouchDB;
  remote: string = "http://localhost:5984/test-children";

  constructor() {
    this.db = new PouchDB("some-db");

    let options = {
      live: true,
      retry: true,
      continuous: true,
      // auth: { username: this.username, password: this.password }
    };

    this.db.sync(this.remote, options);
  }

  getAll(): Promise<Array<Child>> {
    return this.db
      .query("child/all")
      .then(result => result.rows.map(row => row.value))
      .then(rows => rows.map(row => new Child(row)));
  }

  deleteChild(id: string) {
    this.db.get(id).then((obj) => {
      let res: any = obj;
      res._id = "type/child/v1/deleted";
      this.db.put(res);
    });
  }

  insertChild(child: Child): Promise<any> {
    return this.db.put(child);
  }

}
