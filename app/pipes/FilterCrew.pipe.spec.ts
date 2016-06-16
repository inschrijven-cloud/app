import {FilterCrewPipe} from "./FilterCrew.pipe";
import {Crew} from "../models/crew.model";

describe("The filter crew pipe", () => {
  it("work for first names", () => {
    const pipe = new FilterCrewPipe();
    let test: Array<Crew> = [
      new Crew({ _id: "aoeu", _rev: "1-aoeu", firstName: "first", lastName: "last" }),
      new Crew({ _id: "snth", _rev: "1-snth", firstName: "other", lastName: "last" }),
    ];

    expect(pipe.transform(test, "first")).toEqual([test[0]]);
  });

  it("work for last names ", () => {
    const pipe = new FilterCrewPipe();
    let test: Array<Crew> = [
      new Crew({ _id: "aoeu", _rev: "1-aoeu", firstName: "first", lastName: "last" }),
      new Crew({ _id: "snth", _rev: "1-snth", firstName: "other", lastName: "last" }),
    ];

    expect(pipe.transform(test, "last")).toEqual(test);
  });

  it("work when specifying both first and last name", () => {
    const pipe = new FilterCrewPipe();
    let test: Array<Crew> = [
      new Crew({ _id: "aoeu", _rev: "1-aoeu", firstName: "first", lastName: "last" }),
      new Crew({ _id: "snth", _rev: "1-snth", firstName: "other", lastName: "last" }),
    ];

    expect(pipe.transform(test, "last")).toEqual(test);
  });

  it("return everything if search query is undefined", () => {
    const pipe = new FilterCrewPipe();
    let test: Array<Crew> = [
      new Crew({ _id: "aoeu", _rev: "1-aoeu", firstName: "first", lastName: "last" }),
      new Crew({ _id: "snth", _rev: "1-snth", firstName: "other", lastName: "last" }),
    ];

    expect(pipe.transform(test)).toEqual(test);
  });

  it("return everything if search query is the empty string", () => {
    const pipe = new FilterCrewPipe();
    let test: Array<Crew> = [
      new Crew({ _id: "aoeu", _rev: "1-aoeu", firstName: "first", lastName: "last" }),
      new Crew({ _id: "snth", _rev: "1-snth", firstName: "other", lastName: "last" }),
    ];

    expect(pipe.transform(test, "")).toEqual(test);
  });
});
