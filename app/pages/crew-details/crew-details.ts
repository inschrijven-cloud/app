import {Component} from "@angular/core";
import {NavController, NavParams} from "ionic-angular";
import {Crew} from "../../models/crew.model";
import {Observable} from "rxjs/Rx";

@Component({
  templateUrl: "build/pages/crew-details/crew-details.html",
})
export class CrewDetailsPage {
  public person: Observable<Crew>;
  public showDebug: boolean = false;

  constructor(private navController: NavController, private navParams: NavParams) {
  }

  ionViewWillEnter() {
    this.person = this.navParams.get("selectedPerson");
  }

  goBack() {
    this.navController.pop();
  }

  toggleDebug() {
    this.showDebug = !this.showDebug;
  }

}
