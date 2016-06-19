import {Component} from "@angular/core";
import {NavController, NavParams} from "ionic-angular";
import {Child} from "../../models/child.model";
import {Observable} from "rxjs/Rx";

@Component({
  templateUrl: "build/pages/child-details/child-details.html",
})
export class ChildDetailsPage {
  public child: Observable<Child>;
  public showDebug: boolean = false;

  constructor(private navController: NavController, private navParams: NavParams) {
  }

  ionViewWillEnter() {
    this.child = this.navParams.get("selectedChild");
  }

  goBack() {
    this.navController.pop();
  }

  toggleDebug() {
    this.showDebug = !this.showDebug;
  }

}
