import {Component} from "@angular/core";
import {NavController, Toast} from "ionic-angular";
import {Child} from "../../models/child.model";
import {NgForm} from "@angular/common";
import {v4} from "node-uuid";
import {ChildService} from "../../providers/child-service/child.service";
import {ChildDetailsPage} from "../child-details/child-details";

@Component({
  templateUrl: "build/pages/child-create/child-create.html",
})
export class ChildCreatePage {
  constructor(private childService: ChildService, private navController: NavController) {}

  onSubmit(form: NgForm) {
    const phoneNumbers = (form.value["phoneNumber"] && form.value["phoneKind"]) ? [{ kind: form.value["phoneKind"], phoneNumber: form.value["phoneNumber"] }] : [];

    const newChild = new Child({
      _id: v4(),
      firstName: form.value["firstName"],
      lastName: form.value["lastName"],
      birthDate: form.value["birthDate"],
      contact: { phone: phoneNumbers, email: [] },
      address: { street: form.value["street"], number: form.value["number"] + form.value["numberSuffix"], city: form.value["city"], zipCode: form.value["zipCode"] },
    });

    this.childService.insert(newChild)
      .then(res => {
        this.navController.present(Toast.create({ message: "Kind opgeslagen", duration: 2000 }));
        this.navController.pop().then(a => { // pop so we don't have the create child view in our back history
          this.navController.push(ChildDetailsPage, { selectedChild: this.childService.getById(newChild._id) });
        });
      })
      .catch(e => {
        this.navController.present(Toast.create({ message: "Kind kon niet worden opgeslagen" }));
      })
  }
}
