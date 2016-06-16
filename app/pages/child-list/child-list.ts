import {Component} from "@angular/core";
import {ChildService} from "../../providers/child-service/child.service";
import {NavController} from "ionic-angular/index";
import {Child} from "../../models/child.model";
import {ChildDetailsPage} from "../child-details/child-details";
import {Control} from "@angular/common";
import {BehaviorSubject} from "rxjs/Rx";
import {FilterChildrenPipe} from "../../pipes/FilterChildren.pipe";


@Component({
  templateUrl: "build/pages/child-list/child-list.html",
  pipes: [FilterChildrenPipe]
})
export class ChildListPage {
  subject: BehaviorSubject<Array<Child>>;

  constructor(private childService: ChildService, private navController: NavController) {
    this.subject = this.childService.getAll();
  }

  childDetails(child: Child) {
    this.navController.push(ChildDetailsPage, { selectedChild: child });
  }

}
