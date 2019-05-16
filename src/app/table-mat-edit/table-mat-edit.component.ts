import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-table-mat-edit',
  templateUrl: './table-mat-edit.component.html',
  styleUrls: ['./table-mat-edit.component.css']
})
export class TableMatEditComponent implements OnInit {

  public displayedColumns = ['name', 'dateOfBirth', 'address', 'details', 'update', 'delete'];
  public dataSource = new MatTableDataSource<Owner>();

  constructor() { }

  ngOnInit() {
    this.dataSource.data = initialData;
  }

  public getAllOwners = () => {
    //this.repoService.getData('api/owner')
    //  .subscribe(res => {
    //    this.dataSource.data = res as Owner[];
    //  })
  }

  public redirectToDetails = (id: string) => {

  }

  public redirectToUpdate = (id: string) => {

  }

  public redirectToDelete = (id: string) => {

  }

}

export interface Owner {
  id: string;
  name: string;
  dateOfBirth: Date;
  address: string;
}

const initialData: Owner[] = [
  { id: '10', name: 'Michael', dateOfBirth: new Date('12/30/1953'), address: '425 GFeneva' },
  { id: '20', name: 'Alex', dateOfBirth: new Date('12/30/2009'), address: '527 GFeneva' },
  { id: '30', name: 'Inna', dateOfBirth: new Date('12/30/1979'), address: '427 GFeneva' },
 
];
