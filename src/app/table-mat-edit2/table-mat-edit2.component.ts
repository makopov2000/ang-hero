import { Component, OnInit, AfterViewInit, ViewChild, AfterContentInit } from '@angular/core';
import { AspDatePipe } from './aspDate.pipe';
import { cHttpDataService } from './httpGet.service';
import { CTableComponent } from './c-table.component';

@Component({
  selector: 'app-table-mat-edit2',
  templateUrl: './table-mat-edit2.component.html',
  styleUrls: ['./table-mat-edit2.component.css']
})
export class TableMatEdit2Component implements OnInit {
  @ViewChild(CTableComponent) ctable: CTableComponent;
  public name = 'Angular';
  public myDate: string;

  constructor(private adPipe: AspDatePipe, private cfgHttp: cHttpDataService) { };

  ngOnInit(): void {
    this.myDate = this.adPipe.transform('/Date(1479859200000)/', "MM/dd/yy");
  };

  ngAfterViewInit() {

  }

  ngAfterContentInit() { }

  public loaddatatable(): void {
    this.ctable.setDataSource();
  }

}

