import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CidadeService } from '../shared/cidade.service';
import { Estado } from '../shared/estado.model';
import { EstadoService } from '../shared/estado.service';
import { Notification } from '../shared/notification.model';

@Component({
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  estado = 'SC';
  nomeOfState = 'Santa Catarina';
  url = 'assets/svg/Bandeira_de_Santa_Catarina.svg';
  estadoSelected: Estado | undefined;
  closePopUp = false;

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
    private cidadeService: CidadeService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.cidadeService.savedCidade.subscribe((notification: Notification) => {
      if (notification.msg === 'Cidade salva com sucesso') {
        this.closePopUp = true;
        this.setEstadoSelected(this.estadoSelected?.uf || this.estado);
      }
    });
    this.setEstadoSelected(this.estado);
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

  newCidade() {
    this.closePopUp = false;
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
}
