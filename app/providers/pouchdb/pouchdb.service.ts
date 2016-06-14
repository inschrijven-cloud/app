import {Injectable} from "@angular/core";
import "rxjs/add/operator/map";
import {Map} from "immutable";
import IPouchDB = pouchDB.IPouchDB;

@Injectable()
export class PouchDBService {
  private databases: Map<string, IPouchDB> = Map<string, IPouchDB>();

  getDb(name: string): IPouchDB {
    if (!this.databases.get(name)) {
      this.databases = this.databases.set(name, new PouchDB(name));
    }

    return this.databases.get(name);
  }
}
