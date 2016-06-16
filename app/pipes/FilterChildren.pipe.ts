import {Pipe, PipeTransform} from "@angular/core";
import {Child} from "../models/child.model";

@Pipe({
  name: "filterChildren",
})
export class FilterChildrenPipe implements PipeTransform {
  transform(input: Array<Child>, ...args): any {
    const query = args[0] || "";

    return input
      .filter(row => {
      return (row.firstName + " " + row.lastName).toLowerCase().indexOf(query.toLowerCase()) !== -1;
    })
      .sort((row1, row2) => row1.lastName.localeCompare(row2.lastName));
  }
}
