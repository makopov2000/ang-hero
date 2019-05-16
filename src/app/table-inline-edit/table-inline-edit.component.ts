import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { TableDataSource, ValidatorService } from 'angular4-material-table';

import { PersonValidatorService } from './person-validator.service';
import { Person } from './persons';

@Component({
  selector: 'app-table-inline-edit',
  providers: [
    { provide: ValidatorService, useClass: PersonValidatorService }
  ],
  templateUrl: './table-inline-edit.component.html',
  styleUrls: ['./table-inline-edit.component.css']
})
export class TableInlineEditComponent implements OnInit {
  dt: Person;
  dtList: Person[];
  constructor(private personValidator: ValidatorService) { }

  displayedColumns = ['name', 'age', 'actionsColumn'];

  @Input() personList = [
    { name: 'Mark', age: 15 },
    { name: 'Brad', age: 50 },
  ];
  @Output() personListChange = new EventEmitter<Person[]>();

  dataSource: TableDataSource<Person>;


  ngOnInit() {
    this.dataSource = new TableDataSource<any>(this.personList, Person, this.personValidator);
    this.dataSource.datasourceSubject.subscribe(personList => {
      this.dtList = personList.slice();

      this.personListChange.emit(personList);

      for (let i in this.dtList) {
        console.table('-------->>>>>>>>>> From OnInit fonct - Row After : ' + this.dtList[i].name);
      }
 
    });
  }

  updateData() {
    for (let i in this.dtList) {
      console.table('-------->>>>>>>>>> From Update funct - Row: ' + this.dtList[i].name);
    }
  }
}
