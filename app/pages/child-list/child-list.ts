import {Component} from "@angular/core";
import {NavController} from "ionic-angular/index";
import {ChildService} from "../../providers/child-service/child.service";
import {Child} from "../../models/child.model";
import {ChildDetailsPage} from "../child-details/child-details";
import {BehaviorSubject} from "rxjs/Rx";
import {FilterChildrenPipe} from "../../pipes/FilterChildren.pipe";

@Component({
  templateUrl: "build/pages/child-list/child-list.html",
  pipes: [FilterChildrenPipe]
})
export class ChildListPage {
  public children: BehaviorSubject<Array<Child>>;

  constructor(private childService: ChildService, private navController: NavController) {
    this.children = childService.getAll();
  }

  childDetails(child: Child) {
    this.navController.push(ChildDetailsPage, { selectedChild: child });
  }

}
