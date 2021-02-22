import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { InlineSVGModule } from 'ng-inline-svg';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';


import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { NotificationComponent } from './notification/notification.component';
import { LoaderComponent } from './loader/loader.component';
import { HomeComponent } from './home/home.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    NotificationComponent,
    LoaderComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    InlineSVGModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
