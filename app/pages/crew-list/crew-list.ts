import {Component} from "@angular/core";
import {NavController} from "ionic-angular";
import {CrewService} from "../../providers/crew/crew.service";
import {CrewDetailsPage} from "../crew-details/crew-details";
import {Crew} from "../../models/crew.model";
import {BehaviorSubject} from "rxjs/Rx";
import {FilterCrewPipe} from "../../pipes/FilterCrew.pipe";

@Component({
  templateUrl: "build/pages/crew-list/crew-list.html",
  pipes: [FilterCrewPipe],
})
export class CrewListPage {
  public crew: BehaviorSubject<Array<Crew>>;

  constructor(private crewService: CrewService, private navController: NavController) {
    this.crew = crewService.getAll();
  }

  crewDetails(person: Crew) {
    this.navController.push(CrewDetailsPage, { selectedPerson: person });
  }
}
