import {Component} from "@angular/core";
import {ChildService} from "../../providers/child-service/child.service";


@Component({
  templateUrl: "build/pages/child-list/child-list.html",
})
export class ChildListPage {
  children: any[] = [];
  searchQuery: string = "";
  _childService: ChildService;

  constructor(_childService: ChildService) {
    this._childService = _childService;
    this.getItems();
  }

  getItems() {
    let startTime = new Date();

    this._childService
      .findByName(this.searchQuery)
      .then(res => {
        console.log(`took ${new Date().getTime() - startTime.getTime()}ms to get and filter children`);
        this.children = res;
      })
      .catch(e => console.error(e));
  }


}
