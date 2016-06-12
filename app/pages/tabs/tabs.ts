import {Component} from "@angular/core";
import {HomePage} from "../home-page/home-page";
import {AboutPage} from "../about-page/about-page";
import {ContactPage} from "../contact-page/contact-page";
import {ChildListPage} from "../child-list/child-list";

@Component({
  templateUrl: "build/pages/tabs/tabs.html"
})
export class TabsPage {

  private tab1Root: any;
  private tab2Root: any;
  private tab3Root: any;
  private tabChildrenRoot: any;

  constructor() {
    // this tells the tabs component which Pages
    // should be each tab"s root Page
    this.tab1Root = HomePage;
    this.tab2Root = AboutPage;
    this.tab3Root = ContactPage;
    this.tabChildrenRoot = ChildListPage;
  }
}
