import { registerLocaleData } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import ptBr from '@angular/common/locales/pt';
import { LOCALE_ID, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { InlineSVGModule } from 'ng-inline-svg';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CidadesComponent } from './cidades/cidades.component';
import { DeleteWarningComponent } from './delete-warning/delete-warning.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { NewCidadeFromFileComponent } from './home/new-cidade-from-file/new-cidade-from-file.component';
import { PopupFileComponent } from './home/new-cidade-from-file/popup-file/popup-file.component';
import { NewCidadeComponent } from './home/new-cidade/new-cidade.component';
import { PopupHomeComponent } from './home/popup-home/popup-home.component';
import { LoaderComponent } from './loader/loader.component';
import { NotificationComponent } from './notification/notification.component';
import { CidadeService } from './shared/cidade.service';
import { EstadoService } from './shared/estado.service';
import { FormatCidadeNamePipe } from './pipes/format-cidade-name.pipe';
import { SearchResultComponent } from './cidades/search-result/search-result.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

registerLocaleData(ptBr)

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    NotificationComponent,
    LoaderComponent,
    HomeComponent,
    CidadesComponent,
    PopupHomeComponent,
    NewCidadeComponent,
    NewCidadeFromFileComponent,
    PopupFileComponent,
    DeleteWarningComponent,
    FormatCidadeNamePipe,
    SearchResultComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    InlineSVGModule.forRoot()
  ],
  providers: [CidadeService, EstadoService, { provide: LOCALE_ID, useValue: 'pt-BR' }],
  bootstrap: [AppComponent]
})
export class AppModule { }
