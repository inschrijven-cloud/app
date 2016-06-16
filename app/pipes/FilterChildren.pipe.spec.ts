import {FilterChildrenPipe} from "./FilterChildren.pipe";
import {Child} from "../models/child.model";

describe("The filter children pipe", () => {
  it("work for first names", () => {
    const pipe = new FilterChildrenPipe();
    let test: Array<Child> = [
      new Child({ _id: "aoeu", _rev: "1-aoeu", firstName: "first", lastName: "last", birthDate: "test" }),
      new Child({ _id: "snth", _rev: "1-snth", firstName: "other", lastName: "last", birthDate: "test" }),
    ];

    expect(pipe.transform(test, "first")).toEqual([test[0]]);
  });

  it("work for last names ", () => {
    const pipe = new FilterChildrenPipe();
    let test: Array<Child> = [
      new Child({ _id: "aoeu", _rev: "1-aoeu", firstName: "first", lastName: "last", birthDate: "test" }),
      new Child({ _id: "snth", _rev: "1-snth", firstName: "other", lastName: "last", birthDate: "test" }),
    ];

    expect(pipe.transform(test, "last")).toEqual(test);
  });

  it("work when specifying both first and last name", () => {
    const pipe = new FilterChildrenPipe();
    let test: Array<Child> = [
      new Child({ _id: "aoeu", _rev: "1-aoeu", firstName: "first", lastName: "last", birthDate: "test" }),
      new Child({ _id: "snth", _rev: "1-snth", firstName: "other", lastName: "last", birthDate: "test" }),
    ];

    expect(pipe.transform(test, "last")).toEqual(test);
  });

  it("return everything if search query is undefined", () => {
    const pipe = new FilterChildrenPipe();
    let test: Array<Child> = [
      new Child({ _id: "aoeu", _rev: "1-aoeu", firstName: "first", lastName: "last", birthDate: "test" }),
      new Child({ _id: "snth", _rev: "1-snth", firstName: "other", lastName: "last", birthDate: "test" }),
    ];

    expect(pipe.transform(test)).toEqual(test);
  });

  it("return everything if search query is the empty string", () => {
    const pipe = new FilterChildrenPipe();
    let test: Array<Child> = [
      new Child({ _id: "aoeu", _rev: "1-aoeu", firstName: "first", lastName: "last", birthDate: "test" }),
      new Child({ _id: "snth", _rev: "1-snth", firstName: "other", lastName: "last", birthDate: "test" }),
    ];

    expect(pipe.transform(test, "")).toEqual(test);
  });
});
