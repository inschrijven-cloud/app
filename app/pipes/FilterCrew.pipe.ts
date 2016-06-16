import {Pipe, PipeTransform} from "@angular/core";
import {Crew} from "../models/crew.model";

@Pipe({
  name: "filterCrew",
})
export class FilterCrewPipe implements PipeTransform {
  transform(input: Array<Crew>, ...args): any {
    const query = args[0] || "";

    return input
      .filter(row => {
        return (row.firstName + " " + row.lastName).toLowerCase().indexOf(query.toLowerCase()) !== -1;
      })
      .sort((row1, row2) => row1.lastName.localeCompare(row2.lastName));
  }
}
