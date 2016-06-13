import {Injectable} from "@angular/core";
import {ChildPersistenceService} from "./child-persistence.service";

@Injectable()
export class ChildService {
  data: Array<any> = [];

  constructor(private childPersistenceService: ChildPersistenceService) {
    // init
    childPersistenceService
      .getAll()
      .then(res => this.data = res)
      .catch(e => console.error(e));
  }

  findByName(name: string): Promise<any> {
    name = name || "";

    if(name === "") return Promise.resolve(this.data);

    return Promise.resolve(
      this.data
      .filter((row) => {
          return (row.firstName + " " + row.lastName).toLowerCase().indexOf(name.toLowerCase()) !== -1;
        })
    );
  }
  
}
