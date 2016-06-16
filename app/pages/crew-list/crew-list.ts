import {Component} from "@angular/core";
import {NavController} from "ionic-angular";
import {CrewService} from "../../providers/crew/crew.service";
import {CrewDetailsPage} from "../crew-details/crew-details";
import {Crew} from "../../models/crew.model";

@Component({
  templateUrl: "build/pages/crew-list/crew-list.html",
})
export class CrewListPage {
  public crew: Array<Crew> = [];

  constructor(private crewService: CrewService, private navController: NavController) {
    this.getItems();
  }

  getItems() {
    this.crew = this.crewService.getAll().getValue();
    this.crewService
      .getAll()
      .subscribe((res) => this.crew = res, (e) => console.error(e));
  }

  crewDetails(person: Crew) {
    this.navController.push(CrewDetailsPage, { selectedPerson: person });
  }
}
