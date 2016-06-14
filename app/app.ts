import {Component} from "@angular/core";
import {Platform, ionicBootstrap} from "ionic-angular";
import {StatusBar} from "ionic-native";
import {TabsPage} from "./pages/tabs/tabs";
import {PouchDBService} from "./providers/pouchdb/pouchdb.service";
import {ChildService} from "./providers/child-service/child.service";
import {ChildPersistenceService} from "./providers/child-service/child-persistence.service";
import {CrewService} from "./providers/crew/crew.service";


@Component({
  template: `<ion-nav [root]="rootPage"></ion-nav>`,
  providers: [PouchDBService, ChildService, ChildPersistenceService, CrewService],
})
export class MyApp {

  private rootPage: any;

  constructor(private platform: Platform) {
    this.rootPage = TabsPage;

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
    });
  }
}

ionicBootstrap(MyApp);
