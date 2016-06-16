import {Component} from "@angular/core";
import {NavController, NavParams} from "ionic-angular";
import {Crew} from "../../models/crew.model";

@Component({
  templateUrl: "build/pages/crew-details/crew-details.html",
})
export class CrewDetailsPage {
  public person: Crew;
  public showDebug: boolean = false;

  constructor(private navController: NavController, private navParams: NavParams) {
  }

  ionViewWillEnter() {
    this.person = this.navParams.get("selectedPerson");
    console.log("selected person", this.person);
  }

  goBack() {
    this.navController.pop();
  }

  toggleDebug() {
    this.showDebug = !this.showDebug;
  }

}
