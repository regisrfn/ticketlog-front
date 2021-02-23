import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { InlineSVGModule } from 'ng-inline-svg';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { CidadesComponent } from './cidades/cidades.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { LoaderComponent } from './loader/loader.component';
import { NotificationComponent } from './notification/notification.component';
import { PopupHomeComponent } from './home/popup-home/popup-home.component';
import { NewCidadeComponent } from './home/new-cidade/new-cidade.component';
import { CidadeService } from './shared/cidade.service';
import { EstadoService } from './shared/estado.service';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    NotificationComponent,
    LoaderComponent,
    HomeComponent,
    CidadesComponent,
    PopupHomeComponent,
    NewCidadeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    InlineSVGModule.forRoot()
  ],
  providers: [CidadeService,EstadoService],
  bootstrap: [AppComponent]
})
export class AppModule { }
