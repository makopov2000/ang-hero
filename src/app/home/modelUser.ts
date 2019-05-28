import { required, compare, alpha, minLength, propArray, prop } from "@rxweb/reactive-form-validators";

export class Address {
  @prop()
  address1: string;
  @prop()
  address2: string;
  @prop()
  address3: string;
  @prop()
  city: string;
  @prop()
  state: string;
  @prop()
  zip: string;
}

export class User {
  @prop()
    name: string

  @propArray(Address)
  addresses: Address[]

}
