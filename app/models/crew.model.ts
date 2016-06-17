import {Address} from "./address.model";
import {Contact} from "./contact.model";

export class Crew {
  constructor(obj: {
    _id: string,
    _rev: string,
    firstName: string,
    lastName: string,
    address?: { street: string, number: string, city: string, zipCode: number},
    yearStarted?: number,
    bankAccount?: string,
    contact?: { phone: Array<{ kind: string, phoneNumber: string}>, email: Array<string> },
  }) {
    this._id = obj._id;
    this._rev = obj._rev;
    this.firstName = obj.firstName;
    this.lastName = obj.lastName;
    if (obj.address) {
      this.address = new Address(obj.address);
    }
    this.yearStarted = obj.yearStarted;
    this.bankAccount = obj.bankAccount;
    this.contact = new Contact(obj.contact);
  }

  static type: string = "type/crew/v1";

  _id: string;
  _rev: string;

  firstName: string;
  lastName: string;

  address: Address;
  yearStarted: number;
  bankAccount: string;

  contact: Contact;
}
