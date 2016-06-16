import {Component} from "@angular/core";
import {ChildListPage} from "../child-list/child-list";
import {CrewListPage} from "../crew-list/crew-list";
import {InfoPage} from "../info/info";

@Component({
  templateUrl: "build/pages/tabs/tabs.html"
})
export class TabsPage {
  private tabChildrenRoot: any;
  private tabCrewRoot: any;
  private tabInfoRoot: any;

  constructor() {
    // this tells the tabs component which Pages
    // should be each tab"s root Page
    this.tabChildrenRoot = ChildListPage;
    this.tabCrewRoot = CrewListPage;
    this.tabInfoRoot = InfoPage;
  }
}
