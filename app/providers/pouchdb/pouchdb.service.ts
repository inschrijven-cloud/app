import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map';
import IPouchDB = pouchDB.IPouchDB;

@Injectable()
export class PouchDBService {
  databases: Immutable.Map<string, IPouchDB> = Immutable.Map();

  getDb(name:string) {
    if(!this.databases.get(name)) {
      this.databases = this.databases.set(name, new PouchDB(name));
    }

    return this.databases.get(name);
  }
}

