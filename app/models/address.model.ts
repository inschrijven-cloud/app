export class Address {
  constructor(obj: any) {
    this.street = obj.street;
    this.number = obj.number;
    this.city = obj.city;
    this.zipCode = obj.zipCode;
  }
  
  street: string;
  number: string;
  zipCode: number;
  city: string;
}
