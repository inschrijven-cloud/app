import {Page} from "ionic-angular";
import {ChildService} from "../../providers/child-service/child-service";


@Page({
  templateUrl: "build/pages/page2/page2.html",
  providers: [ChildService],
})
export class Page2 {
  children: any[] = [];
  searchQuery: string = "";
  _childService: ChildService;

  constructor(_childService: ChildService) {
    this._childService = _childService;
    this.getItems();
  }

  getItems() {
    let startTime = new Date();

    this._childService
      .findByName(this.searchQuery)
      .then(res => {
        console.log(`took ${new Date().getTime() - startTime.getTime()}ms to get and filter children`);
        this.children = res;
      })
      .catch(e => console.error(e));
  }

}

