import {Injectable} from "@angular/core";
import IPouchDB = pouchDB.IPouchDB;

@Injectable()
export class ChildService {
  db: IPouchDB;
  remote: string = "http://localhost:5984/test-children";
  data: Array<any> = [];


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

  getAll(): Promise<Array<any>> {
    return this.db
      .query("child/all")
      .then(result => result.rows.map(row => row.value));
  }

  findByName(name: string, limit: number = 25): Promise<any> {
    name = name || "";

    return this
      .getAll()
      .then((res) => {
        return res.filter((row) => {
          return (row.firstName + " " + row.lastName).toLowerCase().indexOf(name.toLowerCase()) !== -1; // TODO check if this works with strict equality
        });
      });
  }

  deleteChild(id: string) {
    this.db.get(id).then((obj) => {
      obj._id = "type/child/v1/deleted";
      this.db.put(obj);
    });
  }

  insertChild(child: any): Promise<any> {
    this.db.put(child);
  }

}

