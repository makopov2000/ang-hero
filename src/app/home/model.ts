import { propArray, prop } from "@rxweb/reactive-form-validators"
import { required, numeric } from "@rxweb/reactive-form-validators"

export class Consultant {
  _quantity: number;
  _purchasePrice: number;

  @required()
  name: string;

  @numeric()
  set quantity(value: number) {
    this._quantity = value;
    this.calculateCost();
  }

  get quantity() {
    return this._quantity
  }

  @numeric()
  set purchasePrice(value: number) {
    this._purchasePrice = value;
    this.calculateCost();
  }

  get purchasePrice() {
    return this._purchasePrice;
  }

  @prop()
  cost: number = 0;

  calculateCost() {
    if (this.quantity && this.purchasePrice)
      this.cost = this.quantity * this.purchasePrice;
  }
}

export class Sheet {

  @propArray(Consultant)
  rows: Consultant[]

  @prop()
  get totalCost() {
    let totalMargin = 0;
    if (this.rows && this.rows.length > 0) {
      this.rows.forEach(t => totalMargin += t.cost);
    }
    return totalMargin;
  }

}

