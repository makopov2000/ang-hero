import { Component, OnInit } from '@angular/core';
import { DataSource } from '@angular/cdk/collections';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs/';
import { of } from 'rxjs';

@Component({
  selector: 'app-table-popup-edit',
  templateUrl: './table-popup-edit.component.html',
  styleUrls: ['./table-popup-edit.component.css']
})
export class TablePopupEditComponent implements OnInit {
  displayedColumns = ['name', 'symbol', 'comment'];
  dataSource = new ExampleDataSource(initialData);

  ngOnInit() { }

  update(el: Element, comment: string) {
    if (comment == null) { return; }
    //for (let i in this.dataSource.data().values) {
    //  console.log('------>>>>> database Initial: ' + this.dataSource.data[i].initialData);
    //}
    // copy and mutate
    const copy = this.dataSource.data().slice()
    //console.log('------>>>>> Copy afte Slice: ' + copy.values);

    //for (let i in this.dataSource.data) {
    //  console.log('------>>>>> database Initial: ' + this.dataSource.data[i].initialData);
    //}

    el.comment = comment;
    this.dataSource.update(copy);

    //for (let i in this.dataSource.data) {
    //  console.log('------>>>>> database after Update with Copy: ' + this.dataSource.data[i].initialData);
    //}
  }


}

export interface Element {
  name: string;
  symbol: string;
  comment?: string;
}

const initialData: Element[] = [
  { name: 'Hydrogen', symbol: 'H' },
  { name: 'Helium', symbol: 'He' },
  { name: 'Lithium', symbol: 'Li' },
  { name: 'Beryllium', symbol: 'Be' },
  { name: 'Boron', symbol: 'B' },
  { name: 'Carbon', symbol: 'C' },
  { name: 'Nitrogen', symbol: 'N' },
  { name: 'Oxygen', symbol: 'O' },
  { name: 'Fluorine', symbol: 'F' },
  { name: 'Neon', symbol: 'Ne' },
  { name: 'Sodium', symbol: 'Na' },
  { name: 'Magnesium', symbol: 'Mg' },
  { name: 'Aluminum', symbol: 'Al' },
  { name: 'Silicon', symbol: 'Si' },
  { name: 'Phosphorus', symbol: 'P' },
  { name: 'Sulfur', symbol: 'S' },
  { name: 'Chlorine', symbol: 'Cl' },
  { name: 'Argon', symbol: 'Ar' },
  { name: 'Potassium', symbol: 'K' },
  { name: 'Calcium', symbol: 'Ca' },
];

/**
 * Data source to provide what data should be rendered in the table. The observable provided
 * in connect should emit exactly the data that should be rendered by the table. If the data is
 * altered, the observable should emit that new set of data on the stream. In our case here,
 * we return a stream that contains only one set of data that doesn't change.
 */
export class ExampleDataSource extends DataSource<any> {

  private dataSubject = new BehaviorSubject<Element[]>([]);

  data() {
    return this.dataSubject.value;
  }

  update(data) {
    this.dataSubject.next(data);
  }

  constructor(data: any[]) {
    super();
    this.dataSubject.next(data);
  }

  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<Element[]> {
    return this.dataSubject;
  }

  disconnect() { }
}
