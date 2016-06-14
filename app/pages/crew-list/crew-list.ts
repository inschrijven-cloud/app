import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {CrewService} from "../../providers/crew/crew.service";
import {CrewDetailsPage} from "../crew-details/crew-details"
import {Crew} from "../../models/crew.model";

@Component({
  templateUrl: 'build/pages/crew-list/crew-list.html',
})
export class CrewListPage {
  public crew: Crew[] = [];

  constructor(private crewService: CrewService, private navController: NavController) {
    this.getItems();
  }

  getItems() {
    const startTime = new Date();

    this.crewService
      .getAll()
      .then(res => {
        console.log(`took ${new Date().getTime() - startTime.getTime()}ms to get crew`);
        this.crew = res;
      })
      .catch(e => console.error(e));
  }

  crewDetails(person: Crew) {
    this.navController.push(CrewDetailsPage, { selectedPerson: person })
  }
}
