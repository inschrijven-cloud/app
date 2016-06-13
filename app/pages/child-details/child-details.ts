import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {Child} from "../../models/child.model";

@Component({
  templateUrl: 'build/pages/child-details/child-details.html',
})
export class ChildDetailsPage {
  public child: Child;
  public showDebug: boolean = false;

  constructor(private navController: NavController, private navParams: NavParams) {
  }

  ionViewWillEnter() {
    this.child = this.navParams.get("selectedChild");
    console.log(this.child);
  }

  goBack() {
    this.navController.pop();
  }

  toggleDebug() {
    this.showDebug = !this.showDebug;
  }

}
