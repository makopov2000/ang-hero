import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SatPopoverModule } from '@ncstate/sat-popover';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from './material/material.module'
import { SdkModule } from './sdk/sdk.module';
import { DatePipe, JsonPipe, SlicePipe } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppNavComponent } from './app-nav/app-nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MatGridListModule, MatCardModule, MatMenuModule, MatIconModule, MatButtonModule } from '@angular/material';
import { ObservComponent } from './observ/observ.component';
import { TablePopupEditComponent } from './table-popup-edit/table-popup-edit.component';
import { TableInlineEditComponent } from './table-inline-edit/table-inline-edit.component';
import { InlineEditComponent } from './table-popup-edit/inline-edit.component';
import { TableMatEditComponent } from './table-mat-edit/table-mat-edit.component';
import { TableMatEdit2Component } from './table-mat-edit2/table-mat-edit2.component';
import { CTableComponent } from './table-mat-edit2/c-table.component';
import { cTableDataSource } from './table-mat-edit2/cTableDataSource';
import { cHttpDataService} from './table-mat-edit2/httpGet.service';
import { AspDatePipe} from './table-mat-edit2/aspDate.pipe';
import { HighlightTxtPipe} from './table-mat-edit2/highlight.pipe';
import { FormTestComponent } from './form-test/form-test.component';
import { HomeComponent } from './home/home.component';



@NgModule({
  declarations: [
    AppComponent,
    AppNavComponent,
    DashboardComponent,
    ObservComponent,
    TablePopupEditComponent,
    TableInlineEditComponent,
    InlineEditComponent,
    TableMatEditComponent,
    TableMatEdit2Component,
    CTableComponent,
    AspDatePipe,
    HighlightTxtPipe,
    FormTestComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    SatPopoverModule,
    AppRoutingModule,
    FlexLayoutModule,
    MaterialModule,
    LayoutModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    SdkModule,
    HttpClientModule,
    RxReactiveFormsModule
  ],
  providers: [cHttpDataService, JsonPipe, DatePipe, SlicePipe, AspDatePipe, HighlightTxtPipe,
  ],
  entryComponents: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
