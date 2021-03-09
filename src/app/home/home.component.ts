import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  loadingEstado = false

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
    private dolarService: DolarService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.subscribeNotifications();
    this.getDolar()
    this.selectEstado(this.route.snapshot.params['uf'])    
  }

  selectEstado(uf: string | undefined) {
    let newEstadoSelected = undefined
    this.loadingEstado = true
    if (uf)
      newEstadoSelected = this.options.filter(
        (estado) => estado.uf === uf.toUpperCase()
      )[0];
    else
      newEstadoSelected = this.options.filter(
        (estado) => estado.nome === this.nomeOfState
      )[0];

    if (newEstadoSelected) {
      this.estado = uf || newEstadoSelected.uf;
      this.url = newEstadoSelected.url;
      this.setEstadoSelected(this.estado);
      this.router.navigate([`${this.estado.toLowerCase()}`])
    } else {
      this.loadingEstado = false
    }
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
      })
      .catch(err => console.log(err))
  }

  private setEstadoSelected(uf: string) {
    this.estadoService
      .getEstadoById(uf)
      .then((estado) => {
        this.estadoSelected = estado as Estado;
        this.estadoSelected.urlImage = this.url;
        this.estadoService.estado = this.estadoSelected
        this.nomeOfState = this.estadoSelected.nome || ""
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
