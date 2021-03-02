import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SearchResultComponent } from './cidades/search-result/search-result.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: '', component: HomeComponent },
      {
        path: ':uf',
        children: [
          { path: '', component: HomeComponent},
          { path: 'search', component: SearchResultComponent }
        ]
      },
      { path: '**', redirectTo: "" },
    ],
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
