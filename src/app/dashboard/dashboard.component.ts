import { Component, OnInit} from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';

import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { FormArray } from '@angular/forms';
import { RxFormBuilder } from '@rxweb/reactive-form-validators';
import { Observable } from 'rxjs';
import { User, Address } from '../admin/admin-dashboard/model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit{
  /** Based on the screen size, switch from standard to one column per row */
  cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      if (matches) {
        return [
          { title: 'Card 1', cols: 1, rows: 3 },
          //{ title: 'Card 2', cols: 1, rows: 1 },
          //{ title: 'Card 3', cols: 1, rows: 1 },
          //{ title: 'Card 4', cols: 1, rows: 1 }
        ];
      }

      return [
        { title: 'Card 1', cols: 2, rows: 1 },
        //{ title: 'Card 2', cols: 1, rows: 1 },
      //  { title: 'Card 3', cols: 1, rows: 2 },
      //  { title: 'Card 4', cols: 1, rows: 1 }
      ];
    })
  );

  user: User;
  addressTest: Address[];

  form: FormGroup;
  formRx: FormGroup;
  //addresses: FormArray;

  constructor(private breakpointObserver: BreakpointObserver, private formBuilder: FormBuilder, private rxFb: RxFormBuilder) { }



  ngOnInit() {
    //this.form = this.formBuilder.group({
    //  firstName: ' ',
    //  lastName: ' ',
    //  addresses: this.formBuilder.array([]),
    //})

    this.setNew()

    //this.setNewRx();
  }

  setNew() {
    this.form = this.formBuilder.group({
      firstName: ' ',
      lastName: ' ',
      addresses: this.formBuilder.array([]),
    })
  }

    //setNewRx() {
    //  this.user = new User();

    //  this.user.addresses = new Array<Address>();
    //  //let address = new Address();

    //  this.user.addresses.push(new Address());

    //  this.formRx = this.rxFb.formGroup(this.user);
    //  }


  addAddress(): void {
    let addresses = this.form.get('addresses') as FormArray;
    addresses.push(this.createAddress());
  }

  //addAddressRx(): void {
  //  let addresses = <FormArray>this.formRx.controls.addresses;
  //  let address = new Address();
  //  this.user.addresses.push(address);
  //  addresses.push(this.rxFb.formGroup(address)); 
  //}

  createAddress(): FormGroup {
    return this.formBuilder.group({
      address1: '',
      address2: '',
      city: '',
      state: ''
    });
  }

  resetAddress() {
    this.form.reset();
  }

  getAddress() {
    const res = this.form.controls.addresses.value;
    console.table('==>> Creds: ' + res);
    let resString = JSON.stringify(res);
    console.table('==>> StringFY: ' + resString);
    let resParse = JSON.parse(resString);
    console.table('==>> Parse: ' + resParse);

    let us = new User();

    us.addresses = resParse;
    us.addresses.forEach(h => {
      console.table('==>> Address 1: ' + h.address1 + ', Address 2: ' + h.address2 + ', City: ' + h.city+', State: '+h.state);
    });

    console.log('=================Address:' + resParse[0].address1);

    console.log('***************** Object :' + Object.values(res));

    for (let k of Object.keys(resParse)) {
      console.log(`Hey ${resString[k]}!`);
    }

    JSON.parse(resString, (k, v) => {

    }
    );
  }

}
