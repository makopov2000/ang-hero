import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../material/material.module';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { By } from "@angular/platform-browser";

import { AdminDashboardComponent } from './admin-dashboard.component';
//import { AdminModule } from '../admin.module';

describe('AdminDashboardComponent', () => {
  let component: AdminDashboardComponent;
  let fixture: ComponentFixture<AdminDashboardComponent>;
  let el: DebugElement;

  // create new instance of FormBuilder
  const formBuilder: FormBuilder = new FormBuilder();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AdminDashboardComponent],
      imports: [
        //AdminModule,
        CommonModule, ReactiveFormsModule, MaterialModule, FormsModule, BrowserAnimationsModule],
      providers: [
        // reference the new instance of formBuilder from above
        { provide: FormBuilder, useValue: formBuilder }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminDashboardComponent);
    component = fixture.componentInstance;

    // pass in the form dynamically
    component.formGroup = formBuilder.group({
      'email': [null],
      'name': [null],
      'password': [null],
      'description': [null],
      'validate': ''
    });

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have titleAlert', () => {
    expect(component.titleAlert).toEqual('This field is required');
  });

  it('should have mat-icon ', () => {
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    el = fixture.debugElement.query(By.css('mat-icon'));
    expect(el.nativeElement.textContent.trim()).toBe('more_vert');
    //expect(compiled.);
  });

  it('should have mat-card-title ', () => {
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    el = fixture.debugElement.query(By.css('mat-card-title'));
    expect(el.nativeElement.textContent.trim()).toBe('Title more_vert');
    //expect(compiled.);
  });

});
