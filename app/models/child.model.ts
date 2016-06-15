import {Contact} from "./contact.model";
import {Address} from "./address.model";
import {Attendance} from "./attendance.model";

export class Child {
  constructor(obj: any) {
    this._id = obj._id;
    this._rev = obj._rev;
    this.firstName = obj.firstName;
    this.lastName = obj.lastName;

    if(obj.contact) {
      this.contact = new Contact(obj.contact);
    } else {
      this.contact = new Contact();
    }

    if(obj.address) {
      this.address = new Address(obj.address);
    } // TODO what if not initialized? Option<...> in TS?

    this.birthDate = obj.birthDate;
    
    //this.attendances = obj.attendances.map(row => new Attendance(<string>row)) // TODO currently not in DB
  }
  
  static type: string = "type/child/v1";

  _id: string;
  _rev: string;
  firstName: string;
  lastName: string;

  contact: Contact;
  address: Address;

  birthDate: string;

  attendances: Array<Attendance>;
}
