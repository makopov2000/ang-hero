import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { FormArray } from '@angular/forms';
import { Observable } from 'rxjs';
import { User, Address } from './model'

export class Hero {
  address1: string;
  address2: string;
  city: string;
  state: string;
}

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {

  formGroup: FormGroup;
  titleAlert: string = 'This field is required';
  post: any = '';
  heroes: Hero[]

  ////////////////////////////////////////////
  profileForm = this.formBuilder.group({
    firstName: ['', Validators.required],
    lastName: [''],
    address: this.formBuilder.group({
      street: [''],
      city: [''],
      state: [''],
      zip: ['']
    }),
    aliases: this.formBuilder.array([
      this.formBuilder.control('')
    ])
  });

  form: FormGroup;
  
  orderForm: FormGroup;
  items: FormArray;

  testArray: FormArray;
  userFormGroup: FormGroup;

  /////////////////////////////////////

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.createForm();
    this.setChangeValidate()

    this.form = this.formBuilder.group({
      published: true,
      firstName: ' ',
      lastName: ' ',
      credentials: this.formBuilder.array([]),
    });

    this.orderForm = new FormGroup({
      items: new FormArray([])
    });

    this.testArray = new FormArray([]);

    //let user = new User();
    //user.firstName = "John";
    //user.lastName = "some";
    //user.skills = new Array<Skill>();
    //let skill = new Skill();
    //skill.skillName = "Angular";
    //skill.skillLastName = "some";
    //user.skills.push(skill);
    //this.userFormGroup = this.formBuilder.group(user);

  }

  //reset() {
  //  this.userFormGroup.reset();
  //}

  //addNewArray() {
  //  const skills = this.userFormGroup.get('skills') as FormArray;
  //  let skill = new Skill();
  //  skill.skillName = "Angular1";
  //  skill.skillLastName = "some1";
  //  this.items.push(skills);
  //}
   
  /////////////////////////////////////////


  getTst() {
    //const tst = this.testArray.values;
    //console.table('==>> TST: ' + tst);
    //let resString = JSON.stringify(tst);
    //console.table('==>> TST FY: ' + resString);
    //let resParse = JSON.parse(resString);
    //console.table('==>> TST Parse: ' + resParse);
    //this.heroes = resParse;
    //this.heroes.forEach(h => {
    //  console.table('==>> TST Heroes: ' + h.address1);
    //  console.table('==>> TST Heroes: ' + h.city);
    //  console.table('==>> TST Heroes: ' + h.state);
    //});
  }

  addTst() {
   
    //this.testArray.push(this.formBuilder.group({
    //  address11: '',
    //  address12: '',
    //  city1: '',
    //  state1: '',
    //}));
  }

  createItem(): FormGroup {
    return this.formBuilder.group({
      address1: '',
      address2: '',
      city: '',
      state: ''
    });
  }

  addItem(): void {
    this.items = this.orderForm.get('items') as FormArray;
    this.items.push(this.createItem());
  }

  get aliases() {
    return this.profileForm.get('aliases') as FormArray;
  }

  addAlias() {
    this.aliases.push(this.formBuilder.control(''));
  }

  getCreds() {
    const res = this.form.controls.credentials.value;
    console.table('==>> Creds: ' + res);
    let resString = JSON.stringify(res);
    console.table('==>> StringFY: ' + resString   );
    let resParse = JSON.parse(resString);
    console.table('==>> Parse: ' + resParse);
    
    this.heroes = resParse;
    this.heroes.forEach(h => {
      console.table('==>> Heroes: ' + h.address1);
      console.table('==>> Heroes: ' + h.city);
      console.table('==>> Heroes: ' + h.state);
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

  addCreds() {
    const creds = this.form.controls.credentials as FormArray;
    creds.push(this.formBuilder.group({
      address1: '',
      address2: '',
      city: '',
      state: '',
    }));
  }
  ///////////////////////////////////////////

  createForm() {
    let emailregex: RegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    this.formGroup = this.formBuilder.group({
      'email': [null, [Validators.required, Validators.pattern(emailregex)], this.checkInUseEmail],
      'name': [null, Validators.required],
      'password': [null, [Validators.required, this.checkPassword]],
      'description': [null, [Validators.required, Validators.minLength(5), Validators.maxLength(10)]],
      'validate': ''
    });
  }

  setChangeValidate() {
    this.formGroup.get('validate').valueChanges.subscribe(
      (validate) => {
        if (validate == '1') {
          this.formGroup.get('name').setValidators([Validators.required, Validators.minLength(3)]);
          this.titleAlert = "You need to specify at least 3 characters";
        } else {
          this.formGroup.get('name').setValidators(Validators.required);
        }
        this.formGroup.get('name').updateValueAndValidity();
      }
    )
  }

  get name() {
    return this.formGroup.get('name') as FormControl
  }

  checkPassword(control) {
    let enteredPassword = control.value
    let passwordCheck = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/;
    return (!passwordCheck.test(enteredPassword) && enteredPassword) ? { 'requirements': true } : null;
  }

  checkInUseEmail(control) {
    // mimic http database access
    let db = ['tony@gmail.com'];
    return new Observable(observer => {
      setTimeout(() => {
        let result = (db.indexOf(control.value) !== -1) ? { 'alreadyInUse': true } : null;
        observer.next(result);
        observer.complete();
      }, 4000)
    })
  }

  getErrorEmail() {
    return this.formGroup.get('email').hasError('required') ? 'Field is required' :
      this.formGroup.get('email').hasError('pattern') ? 'Not a valid emailaddress' :
        this.formGroup.get('email').hasError('alreadyInUse') ? 'This emailaddress is already in use' : '';
  }

  getErrorPassword() {
    return this.formGroup.get('password').hasError('required') ? 'Field is required (at least eight characters, one uppercase letter and one number)' :
      this.formGroup.get('password').hasError('requirements') ? 'Password needs to be at least eight characters, one uppercase letter and one number' : '';
  }

  onSubmit(post) {
    this.post = post;
  }

}
