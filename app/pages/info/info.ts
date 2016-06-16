import {Component} from "@angular/core";
import {NavController} from "ionic-angular";
import {PouchDBService} from "../../providers/pouchdb/pouchdb.service";
import {BehaviorSubject} from "rxjs/Rx";
import {PouchDBStatus} from "../../providers/pouchdb/pouchdb-status";

@Component({
  templateUrl: "build/pages/info/info.html",
})
export class InfoPage {
  private status: BehaviorSubject<PouchDBStatus>;

  constructor(public nav: NavController, private pouchdbService: PouchDBService) {
    this.status = pouchdbService.getStatusSubject("some-db");
  }
}
