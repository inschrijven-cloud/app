import {PhoneContact} from "./phone-contact.model";

export class Contact {
  constructor(obj?: any) {
    if(obj && obj.phone) {
      this.phone = obj.phone.map(row => new PhoneContact(row));
    }
  }

  phone: Array<PhoneContact> = [];
}
