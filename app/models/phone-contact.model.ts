export class PhoneContact {
  constructor(obj: any) {
    this.kind = obj.kind;
    this.phoneNumber = obj.phoneNumber;
  }
  
  kind: string;
  phoneNumber: string;
}
