import { Component, OnInit, ViewChild, ViewChildren, ViewContainerRef, AfterViewInit, ElementRef } from '@angular/core';
import { DatePipe, JsonPipe, SlicePipe, } from '@angular/common';
import { FormControl, FormsModule, ReactiveFormsModule, FormGroup, FormBuilder, Validators, NgControl, NgForm, FormArray } from '@angular/forms';
import { Observable, of, fromEvent, Subject, BehaviorSubject } from 'rxjs';
import { FlexLayoutModule } from '@angular/flex-layout';
import { map, startWith, debounceTime } from 'rxjs/operators';
import { DataSource, CollectionViewer } from '@angular/cdk/collections';
import {
  MatAutocompleteModule,
  MatBadgeModule,
  MatBottomSheetModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDatepickerModule,
  MatDialogModule,
  MatDividerModule,
  MatExpansionModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatSortModule,
  MatStepperModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule,
  MatTreeModule,
  MatTableDataSource, MatSort, MatPaginator
} from '@angular/material';
import { cHttpDataService, IopItem, ImatItem } from './httpGet.service';
import { cTableDataSource, cObject, ObjectEditStatus } from './cTableDataSource';
import { HighlightTxtPipe } from './highlight.pipe';

@Component({
  selector: 'app-c-table',
  templateUrl: './c-table.component.html',
  styleUrls: ['./c-table.component.css']
})
export class CTableComponent implements AfterViewInit, OnInit {
  @ViewChild(MatSort) sort: MatSort;
  @ViewChildren('cdkrow', { read: ViewContainerRef }) containers;

  public objStatus = ObjectEditStatus;
  public dataSource: cTableDataSource = new cTableDataSource(this.cfgHttp);

  public NameInputChange$: Subject<string> = new Subject<string>();
  public Opis: IopItem[]; //store all opItem
  public filteredOpis: Observable<IopItem[]>; //fitlered opItem
  public ClickedRowIndex: number = -1;
  public ClickedRow: cObject; currentRow: cObject;

  public mtformgroup: FormGroup;
  public mtformarray: FormArray;

  constructor(private cfgHttp: cHttpDataService, private fb: FormBuilder) {

  };

  ngOnInit() {
    this.mtformarray = this.fb.array([]);
    this.mtformgroup = this.fb.group({ formarray: this.mtformarray });
    this.dataSource.formg = this.mtformgroup;
  }

  ngAfterViewInit() {

    //get option list
    this.cfgHttp.getOptionList().subscribe(d => { this.Opis = d; });
    //console.log(this.containers);

    //prepare async subscribe
    this.filteredOpis = this.NameInputChange$.pipe(
      debounceTime(300),
      map((s: string) => { return this.Opis.filter(opi => opi.name.toLowerCase().includes(s.toLowerCase())); })
    )

  }

  createNewFormContorl(r: cObject, propName: string): FormControl {
    let m = new FormControl(r.Obj[propName], Validators.required);
    m.valueChanges.subscribe(val => { r.Obj[propName] = val; });
    return m;

  }

  createRowFormGroup(r: cObject): FormGroup {
    //formcontrol: state
    let s = new FormControl(r.Obj.address.state);
    s.valueChanges.subscribe(newvalue => {
      if (typeof newvalue === "string") {
        r.Obj.address.state = newvalue;
        r.Obj.address.city = ''; //free text input, not predefined IopItem
      } else {
        if (r && newvalue) {
          r.Obj.address.state = newvalue.name;
          r.Obj.address.city = newvalue.abbreviation;
        }
      }
    });

    //formgroup
    let f = new FormGroup({
      name: this.createNewFormContorl(r, 'name'),
      email: this.createNewFormContorl(r, 'email'),
      state: s
    });
    return f;
  }

  setDataSource(): void {
    //load data
    this.dataSource.loadItems();
  }


  private displayFn(s: any) {
    //console.log(typeof(s));
    //since row.name may not match autocomplete option, we need to check
    if (typeof s === "string") {
      return s;
    } else {
      if (s) { return s.name; } //s is IopItem
      else { return s; } // s is null or undefined
    }
  };

  private addNew(): void {
    let r = this.dataSource.addNewMatItem(null);
    //console.log((this.mtformgroup.get('formarray') as FormArray).controls)
  }


  private deleteItem(row: cObject): void {
    console.log(this.mtformgroup);
    this.dataSource.deleteItem(row);

  };

  private SaveItems() {
    this.dataSource.CommitAllChanges();
  };
  private SaveItem(r: cObject) {
    this.dataSource.CommitItem(r);
  }
}
