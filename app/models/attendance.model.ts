export class Attendance {
  constructor(obj: string) {
    this.date = obj.split("/")[0];
    this.dagdeel = obj.split("/")[1];
  }

  date: string;
  dagdeel: string; // TODO idiomatic translation
}
