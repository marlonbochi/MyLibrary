
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './/app-routing.module';
import { HomeComponent } from './pages/Home/Home.component';
import { Error404Component } from './pages/error404/error404.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { OpenLibraryService } from './services/openlibrary.service';
import { HttpClientModule } from '@angular/common/http';
import { Config } from './config';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { SearchComponent } from './pages/search/search.component';
import { ReportComponent } from './pages/report/report.component';
import { Ng2Webstorage } from 'ngx-webstorage';

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
    Ng2Webstorage
  ],
  providers: [
    OpenLibraryService,
    Config,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
