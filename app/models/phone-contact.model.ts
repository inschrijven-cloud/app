export class PhoneContact {
  constructor(obj: { kind: string, phoneNumber: string}) {
    this.kind = obj.kind;
    this.phoneNumber = obj.phoneNumber;
  }

  kind: string;
  phoneNumber: string;
}
