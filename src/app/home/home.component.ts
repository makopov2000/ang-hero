import { Component, OnInit } from '@angular/core';
import { FormGroup, FormArray, FormControl, Validators, FormBuilder, AbstractControl } from '@angular/forms';
import { RxFormBuilder } from '@rxweb/reactive-form-validators';
import { HttpClient } from '@angular/common/http';
import { first } from 'rxjs/operators';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Consultant, Sheet } from './model';
import { Address, User} from './modelUser';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  sheetFormGroup: FormGroup
  sheetData: Sheet;
  userForm: FormGroup;
  userFormData: FormGroup;
  //addresses: FormArray;
  user: User;
  userList: User[];
  addressList: Address[];
  userListSave: User[];
  addressListSave: Address[];

  constructor(private formBuilder: RxFormBuilder, private http: HttpClient, private fb: FormBuilder) {
    this.userFormData = this.fb.group({
      users : this.fb.array([])
    })

  }

  ngOnInit() {
    this.sheetData = new Sheet();
    this.sheetData.rows = new Array<Consultant>();
    this.sheetData.rows.push(new Consultant());
    this.sheetFormGroup = this.formBuilder.formGroup(this.sheetData)

    this.user = new User();
    this.user.addresses = new Array<Address>();
    this.user.addresses.push(new Address());
    this.userForm = this.formBuilder.formGroup(this.user);

    this.getUser();
    
    
  }

  //////////////////////////////////////////////////
  setFormGroup2(): any {
    let control = <FormArray>this.userFormData.controls.users;
    console.log('&&& Users: ', this.userList);
    this.userList.forEach(x => {
      control.push(this.fb.group({
        name: x.name,
        addresses: this.setAddress(x.addresses)
      }))
    })
  }

  setAddress(x: Address[]) {
    console.log('$$$ Addresses: ', x);
    let arr = new FormArray([])
    x.forEach(y => {
      arr.push(this.fb.group({
        address1: y.address1,
        address2: y.address2,
        address3: y.address3,
        city: y.city,
        state: y.state,
        zip: y.zip,
      }))
    })
    return arr;
  }

  addNewUser() {
    let control = <FormArray>this.userFormData.controls.users;
    control.push(
      this.fb.group({
        name: [''],
        addresses: this.fb.array([])
      })
    )
  }

  addNewAddress(control) {
    control.push(
      this.fb.group({
        address1: '',
        address2: '',
        address3: '',
        city: '',
        state:'',
        zip: '',
      }))
  }

  deleteUser(index) {
    let control = <FormArray>this.userFormData.controls.users;
    control.removeAt(index)
  }

  deleteAddress(control, index) {
    control.removeAt(index)
  }

  postNewUser() {
    const users = this.userFormData.controls.users.value;
    this.userListSave = JSON.parse(JSON.stringify(users));
    console.log('%%%%%%%%%%%%% --> Users to Save:', this.userListSave);
  }

  //////////////////////////////////////////////////////////////

  setFormGroup1(): any {
    let user = new User();
    user.name = this.userList[0].name;
    user.addresses = new Array<Address>();
    this.userList[0].addresses.forEach(a => user.addresses.push(a));
    this.userFormData = this.formBuilder.formGroup(user);

    console.log('@@@@@ User: ', user.name);
    console.log('@@@@@ User: ', user.addresses);
  }


  setFormGroup(): any {
    this.userFormData = this.setUpForm(this.addressList);
    this.userFormData.patchValue(this.addressList);
    console.table('++++ Patched User: ',this.addressList[0]);
  }
  setUpForm(addresses: Address[]) {
    addresses.forEach(a => console.log('++++ Set Up Form with Addresses User: ', a));
    return new FormGroup({
      addresses: new FormArray(addresses.map((u) => this.createAddress(u)))
    });
  }
  createAddress(addresses: Address) {
    console.log('++++ From create Addres Form: ', addresses);
    return new FormGroup({
      addresses: new FormGroup({
        address1: new FormControl(addresses.address1),
        address2: new FormControl(""),
        address3: new FormControl(""),
        city: new FormControl(addresses.city),
        state: new FormControl(addresses.state),
        zip: new FormControl(addresses.zip)
      })
    })
   }
///////////////////////////////////////

  getUser() {


    this.callBackend().pipe(first()).subscribe(data => {
      this.userList = data;
      let i = 0;
      this.userList.forEach(r => {
        i = i + 1;
        console.table('********* User data returned: ' + r.name);
        r.addresses.forEach(a => console.table('********* Address data returned: ' + a.address1));
      })

      this.addressList = this.userList[0].addresses;

    });
  }

  callBackend(): Observable<User[]> {
    return this.http.get<User[]>('assets/address.json')
      .pipe(
        tap(data => console.log('************* fetched ' + data.length + " records")),
        //catchError(this.handleError('getPublishing', []))
      );
  }

    getData(): any {
      this.http.get('assets/address.json').subscribe(user => {
        this.userFormData = this.formBuilder.formGroup<User>(User, user);
        console.table('********* Response User: ' + user);

        let stringFy = JSON.stringify(user);
      console.table('********* StringFy User: ' + stringFy);

        let parse = JSON.parse(stringFy);
        console.table('********* Parsed User: ' + parse['name']);


        this.user = <User>parse;
        console.table('********* Model User: ' + this.user.name);

        let addresses = parse.addresses
        this.user.addresses = addresses;
        this.user.addresses.forEach(a => console.log('++++++++++++ Addresses: ' + a.address1));

      })
    }

  addRow() {
    let rows = <FormArray>this.sheetFormGroup.controls.rows;
    let consultant = new Consultant();
    this.sheetData.rows.push(consultant)
    rows.push(this.formBuilder.formGroup(consultant))

    let addresses = <FormArray>this.userForm.controls.addresses;
    let address = new Address();
    this.user.addresses.push(address);
    addresses.push(this.formBuilder.formGroup(address));
  }

  printRow() {
    this.sheetData = this.sheetFormGroup.value;
    this.sheetData.rows.forEach(r => {
      console.table("Sheet data Row:" + r.name);
    })
    
  }

}
