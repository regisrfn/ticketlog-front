import { Component, OnInit } from '@angular/core';
import { CidadeService } from '../shared/cidade.service';
import { Estado } from '../shared/estado.model';
import { EstadoService } from '../shared/estado.service';
import { Page } from '../shared/page.model';

@Component({
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  estado = 'SC';
  nomeOfState = 'Santa Catarina';
  url = 'assets/svg/Bandeira_de_Santa_Catarina.svg';
  cidadesPage = new Page();
  estadoSelected: Estado | undefined;

  options = [
    {
      nome: 'Rio Grande do Sul',
      uf: 'RS',
      url: 'assets/svg/Bandeira_do_Rio_Grande_do_Sul.png',
    },
    {
      nome: 'Santa Catarina',
      uf: 'SC',
      url: 'assets/svg/Bandeira_de_Santa_Catarina.svg',
    },
    {
      nome: 'Parana',
      uf: 'PR',
      url: 'assets/svg/Bandeira_do_Paraná.svg',
    },
  ];

  constructor(
    private estadoService: EstadoService,
    private cidadeService: CidadeService
  ) {}

  ngOnInit(): void {
    this.setEstadoSelected(this.estado);
    this.setCidadesPage(this.estado, 0, 20);
  }

  selectEstado() {
    let value = this.nomeOfState;
    let estadoSelected = this.options.filter(
      (estado) => estado.nome === value
    )[0];
    this.estado = estadoSelected.uf;
    this.url = estadoSelected.url;
    this.setEstadoSelected(this.estado);
  }

  private setEstadoSelected(uf: string) {
    this.estadoService
      .getEstadoById(uf)
      .then((estado) => {
        this.estadoSelected = estado as Estado;
        this.estadoSelected.urlImage = this.url;
      })
      .catch((err) => {});
  }

  private setCidadesPage(uf: string, pageNumber: number, size: number) {
    this.cidadeService
      .getPagePorEstado(uf, pageNumber, size)
      .then((page) => {
        this.cidadesPage = page as Page;
      })
      .catch((err) => {});
  }
}
