export class Address {
  constructor(obj: { street: string, number: string, city: string, zipCode: number}) {
    if (obj.street) this.street = obj.street;
    if (obj.number) this.number = obj.number;
    if (obj.city) this.city = obj.city;
    if (obj.zipCode) this.zipCode = obj.zipCode;
  }

  street: string;
  number: string;
  zipCode: number;
  city: string;
}
