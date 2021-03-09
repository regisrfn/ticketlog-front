import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Cidade } from './cidade.model';
import { Estado } from './estado.model';
import { Notification } from './notification.model';

@Injectable({
  providedIn: 'root',
})
export class CidadeService {
  currentEstado: Estado | undefined;
  @Output() savedCidade: EventEmitter<Notification> = new EventEmitter();
  @Output() deletedCidade: EventEmitter<Notification> = new EventEmitter();

  constructor(private http: HttpClient) { }

  getCidadesList() {
    return this.http.get(environment.apiCidade + '/get').toPromise();
  }

  getCidadesListByName(nome: string) {
    return this.http.get(`${environment.apiCidade}/search?nome=${nome}`).toPromise();
  }

  getCidadesListByNameAndUf(uf: string, nome: string) {
    return this.http.get(`${environment.apiCidade}/${uf}/search?nome=${nome}`).toPromise();
  }

  getCidadesListPorEstado(uf: String) {
    return this.http.get(environment.apiCidade + `/${uf}`).toPromise();
  }

  getPagePorEstado(uf: string, pageNumber: number, pageSize = 10) {
    return this.http
      .get(
        `${environment.apiCidade}/${uf}/page?number=${pageNumber}&size=${pageSize}`
      )
      .toPromise();
  }

  getPagePorEstadoOrderBy(uf: string, orderBy: string, asc: boolean, pageNumber: number, pageSize = 10) {
    return this.http
      .get(
        `${environment.apiCidade}/${uf}/page?number=${pageNumber}&size=${pageSize}&sort=${orderBy}&asc=${asc}`
      )
      .toPromise();
  }

  saveCidade(data: Cidade) {
    return this.http.post(`${environment.apiCidade}/save`, data).toPromise();
  }

  saveCidadeFromFile(data: FormData) {
    return this.http
      .post(`${environment.apiCidade}/savelist`, data)
      .toPromise();
  }

  deleteCidade(id: string) {
    return this.http
      .delete(`${environment.apiCidade}/delete/${id}`)
      .toPromise();
  }

  deleteCidadesList(data: Cidade[]) {
    return this.http
      .put(`${environment.apiCidade}/deletelist`, data)
      .toPromise();
  }
}
