
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { DpDatePickerModule } from 'ng2-date-picker';

//services
import { IdbService } from './services/idb.service';
import { BaseService } from './services/base.service';
import { LibraryService } from './services/library.service';

//Components
import { AppComponent } from './app.component';
import { AppRoutingModule } from './/app-routing.module';
import { HomeComponent } from './pages/Home/Home.component';
import { Error404Component } from './pages/error404/error404.component';
import { Config } from './config';
import { SearchComponent } from './pages/search/search.component';
import { ReportComponent } from './pages/report/report.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    Error404Component,
    SearchComponent,
    ReportComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    FormsModule,
    HttpModule,
    NgbModule.forRoot(),
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    DpDatePickerModule
  ],
  providers: [
    LibraryService,
    Config,
    IdbService,
    BaseService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
