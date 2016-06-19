import {Component} from "@angular/core";
import {NavController, Toast} from "ionic-angular";
import {CrewService} from "../../providers/crew/crew.service";
import {NgForm} from "@angular/common";
import {v4} from "node-uuid";
import {Crew} from "../../models/crew.model";
import {CrewDetailsPage} from "../crew-details/crew-details";

@Component({
  templateUrl: "build/pages/crew-create/crew-create.html",
})
export class CrewCreatePage {
  constructor(private crewService: CrewService, private navController: NavController) {}

  onSubmit(form: NgForm) {
    const phoneNumbers = (form.value["phoneNumber"] && form.value["phoneKind"]) ? [{ kind: form.value["phoneKind"], phoneNumber: form.value["phoneNumber"] }] : [];

    const newCrew = new Crew({
      _id: v4(),
      firstName: form.value["firstName"],
      lastName: form.value["lastName"],
      contact: { phone: phoneNumbers, email: [ form.value["email"] ] },
      address: { street: form.value["street"], number: form.value["number"] + form.value["numberSuffix"], city: form.value["city"], zipCode: form.value["zipCode"] },
      yearStarted: form.value["yearStarted"],
      bankAccount: form.value["bankAccount"],
    });

    this.crewService.insert(newCrew)
      .then(res => {
        this.navController.present(Toast.create({ message: "Animator opgeslagen", duration: 2000 }));
        this.navController.pop().then(a => { // pop so we don't have the create child view in our back history
          this.navController.push(CrewDetailsPage, { selectedPerson: this.crewService.getById(newCrew._id) });
        });
      })
      .catch(e => {
        this.navController.present(Toast.create({ message: "Animator kon niet worden opgeslagen" }));
      })
  }
}
