import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MaterialModule } from '../material/material.module';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Pipe, PipeTransform } from '@angular/core'
import { SlicePipe, DatePipe } from '@angular/common'
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TableMatEdit2Component } from './table-mat-edit2.component';
import { CTableComponent } from './c-table.component';
import { cHttpDataService } from './httpGet.service';
import { AspDatePipe } from './aspDate.pipe';
import { HighlightTxtPipe } from './highlight.pipe';

describe('TableMatEdit2Component', () => {
  let component: TableMatEdit2Component;
  let fixture: ComponentFixture<TableMatEdit2Component>;
  let pipeSpy: jasmine.Spy;
  let pipe: AspDatePipe;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TableMatEdit2Component, CTableComponent, AspDatePipe, HighlightTxtPipe],
      imports: [MaterialModule, FormsModule, ReactiveFormsModule, BrowserAnimationsModule, HttpClientTestingModule],
      providers: [cHttpDataService, AspDatePipe, HighlightTxtPipe,
        { provide: DatePipe, useValue: AspDatePipe },
        //{ provide: HttpClient, useValue: cHttpDataService },
      ]
    })
      .compileComponents();

    //pipeSpy = spyOn(MockPipe.prototype, 'transform');
    //pipe = new AspDatePipe(DatePipe);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableMatEdit2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call load', () => {
    spyOn(component.ctable, 'setDataSource');
    component.loaddatatable();
    expect(component.ctable.setDataSource).toHaveBeenCalled();
  });

});


