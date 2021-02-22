import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Cidade } from './cidade.model';

@Injectable({
  providedIn: 'root'
})
export class CidadeService {

  constructor(private http: HttpClient) { }

  getCidadesList() {
    return this.http.get(environment.apiCidade + "/get").toPromise()
  }

  getCidadesListPorEstado(uf: String) {
    return this.http.get(environment.apiCidade + `/get/${uf}`).toPromise()
  }

  getPagePorEstado(uf: string, pageNumber: number, pageSize = 10) {
    return this.http.get(`${environment.apiCidade}/get/${uf}/page?number=${pageNumber}&size=${pageSize}`).toPromise();
  }

  saveCidade(data: Cidade) {
    return this.http.post(`${environment.apiCidade}/save`, data).toPromise()
  }

  saveCidadeFromFile(data: FormData) {
    return this.http.post(`${environment.apiCidade}/savelist`, data).toPromise()
  }

  deleteCidade(id:string) {
    return this.http.delete(`${environment.apiCidade}/delete/${id}`).toPromise()
  }

  deleteCidadesList(data: Cidade[]) {
    return this.http.post(`${environment.apiCidade}/deletelist`, data).toPromise()
  }
}
