import {Component} from "@angular/core";
import {ChildService} from "../../providers/child-service/child.service";
import {NavController} from "ionic-angular/index";
import {Child} from "../../models/child.model";
import {ChildDetailsPage} from "../child-details/child-details";


@Component({
  templateUrl: "build/pages/child-list/child-list.html",
})
export class ChildListPage {
  children: Child[] = [];
  searchQuery: string = "";
  _childService: ChildService;

  constructor(_childService: ChildService, private navController: NavController) {
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

  childDetails(child: Child) {
    this.navController.push(ChildDetailsPage, { selectedChild: child })
  }

}
