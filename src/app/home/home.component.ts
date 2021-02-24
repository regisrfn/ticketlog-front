import { Component, OnInit } from '@angular/core';
import { CidadeService } from '../shared/cidade.service';
import { Dolar } from '../shared/dolar';
import { DolarService } from '../shared/dolar.service';
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
  dolarHoje: Dolar | undefined

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
    private dolarService: DolarService
  ) { }

  ngOnInit(): void {
    this.subscribeNotifications();
    this.setEstadoSelected(this.estado);
    this.getDolar()
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

  dolar2Real() {
    if (this.estadoSelected && this.dolarHoje?.USD) {
      return this.estadoSelected.custoEstadoUs * (this.dolarHoje.USD.ask || 1)
    }
    return 0
  }

  private getDolar() {
    this.dolarService.getDolar()
      .then(res => {
        this.dolarHoje = res as Dolar
        console.log(this.dolarHoje);
      })
      .catch(err => console.log(err))
  }

  private setEstadoSelected(uf: string) {
    this.estadoService
      .getEstadoById(uf)
      .then((estado) => {
        this.estadoSelected = estado as Estado;
        this.estadoSelected.urlImage = this.url;
      })
      .catch((err) => { });
  }

  private subscribeNotifications() {
    this.cidadeService.savedCidade.subscribe((notification: Notification) => {
      if (notification.type === "successfully") {
        this.closePopUp = true;
        this.setEstadoSelected(this.estadoSelected?.uf || this.estado);
      }
    });
    this.cidadeService.deletedCidade.subscribe((notification: Notification) => {
      if (notification.type === "successfully")
        this.setEstadoSelected(this.estadoSelected?.uf || this.estado);

    });
  }
}
