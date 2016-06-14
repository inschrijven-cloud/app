import {Component} from "@angular/core";
import {HomePage} from "../home-page/home-page";
import {AboutPage} from "../about-page/about-page";
import {ChildListPage} from "../child-list/child-list";
import {CrewListPage} from "../crew-list/crew-list";

@Component({
  templateUrl: "build/pages/tabs/tabs.html"
})
export class TabsPage {

  private tab1Root: any;
  private tab2Root: any;
  private tabChildrenRoot: any;
  private tabCrewRoot: any;

  constructor() {
    // this tells the tabs component which Pages
    // should be each tab"s root Page
    this.tab1Root = HomePage;
    this.tab2Root = AboutPage;
    this.tabChildrenRoot = ChildListPage;
    this.tabCrewRoot = CrewListPage;
  }
}
