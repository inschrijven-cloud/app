import {Component} from "@angular/core";
import {ChildService} from "../../providers/child-service/child.service";
import {NavController} from "ionic-angular/index";
import {Child} from "../../models/child.model";
import {ChildDetailsPage} from "../child-details/child-details";
import {Control} from "@angular/common";


@Component({
  templateUrl: "build/pages/child-list/child-list.html",
})
export class ChildListPage {
  children: Array<Child> = [];
  searchQuery: Control = new Control();

  constructor(private childService: ChildService, private navController: NavController) {
    this.getItems();
  }

  getItems() {
    this.children = this.childService.getAll().getValue();

    this.searchQuery.valueChanges.subscribe(query => {
      // TODO how to unsubscribe from old childService.findByName subscriptions?
      this.childService.findByName(query).subscribe(res => this.children = res, (e) => console.error(e));
    });
  }

  childDetails(child: Child) {
    this.navController.push(ChildDetailsPage, { selectedChild: child })
  }

}
