import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { TablePopupEditComponent } from './table-popup-edit/table-popup-edit.component';
import { TableInlineEditComponent } from './table-inline-edit/table-inline-edit.component';
import { TableMatEditComponent } from './table-mat-edit/table-mat-edit.component';
import { TableMatEdit2Component } from './table-mat-edit2/table-mat-edit2.component';
import { FormTestComponent } from './form-test/form-test.component';
import { HomeComponent } from './home/home.component'

const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent
  },
  {
    path: 'admin',
    loadChildren: './admin/admin.module#AdminModule'
  },
  {
    path: 'staff',
    loadChildren: './staff/staff.module#StaffModule'
  },
  {
    path: 'popup',
    component: TablePopupEditComponent
  },
  {
    path: 'inline',
    component: TableInlineEditComponent
  },
  {
    path: 'matedit',
    component: TableMatEditComponent
  },
  {
    path: 'matedit2',
    component: TableMatEdit2Component
  },
  {
    path: 'form',
    component: FormTestComponent
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: '',
    redirectTo: '',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
