//import { required, propArray } from "@rxweb/reactive-form-validators"
import { required, compare, alpha, minLength, propArray } from "@rxweb/reactive-form-validators";

export class Address {
  //@required()
  address1: string;
  address2: string;
  address3: string;
  city: string;
  state: string;
  zip: string;
}

export class User {

  //@required()
  firstName: string;
  lastName: string

  //@propArray(Skill)
  addresses: Address[]

}
