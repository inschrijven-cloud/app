import {PhoneContact} from "./phone-contact.model";

export class Contact {
  constructor(obj?: { phone: Array<{ kind: string, phoneNumber: string}>, email: Array<string> }) {
    if (obj && obj.phone) {
      this.phone = obj.phone.map(row => new PhoneContact(row));
    }

    if (obj && obj.email) {
      this.email = obj.email.filter(x => x !== null && x !== undefined);
    }
  }

  phone: Array<PhoneContact> = [];
  email: Array<string> = [];
}
