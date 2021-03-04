import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { Cidade } from '../shared/cidade.model';
import { CidadeService } from '../shared/cidade.service';
import { Dolar } from '../shared/dolar';
import { DolarService } from '../shared/dolar.service';
import { Notification } from '../shared/notification.model';
import { Page } from '../shared/page.model';

@Component({
  selector: 'app-cidades',
  templateUrl: './cidades.component.html',
})
export class CidadesComponent implements OnInit {
  @Input() uf = '';
  dolarHoje = new Dolar
  pageOfCidades = new Page();
  cidadesList: Cidade[] = [];
  open = false
  selectedCidade: Cidade | undefined
  selectedCidades: Cidade[] = []
  modoEdicao = false;
  askDeleteGroup = false
  isDeleting = false

  ascPopulacao = true
  ascNome = true
  asc = true;
  orderBy = "nome"

  constructor(private cidadeService: CidadeService, private dolarService: DolarService) { }

  ngOnInit(): void {
    this.subscribeNotifications();
    this.setCidadePage(this.uf, 0);
    this.setDolar()
  }

  nextPage() {
    this.selectedCidades = []
    this.selectedCidade = new Cidade
    this.setCidadePageOrderBy(this.uf, this.orderBy, this.asc, this.pageOfCidades.pageNumber + 1);
  }

  previousPage() {
    this.selectedCidades = []
    this.selectedCidade = new Cidade
    this.setCidadePageOrderBy(this.uf, this.orderBy, this.asc, this.pageOfCidades.pageNumber - 1);
  }

  goToPage(pageNo: number) {
    this.selectedCidades = []
    this.selectedCidade = new Cidade
    this.setCidadePageOrderBy(this.uf, this.orderBy, this.asc, pageNo);
  }

  trackByFn(index: any, item: Cidade) {
    return item.id;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.uf) {
      this.reset()
      this.setCidadePage(this.uf, 0)
    }
  }

  selectCidade(cidade: Cidade) {
    this.open = true;
    this.selectedCidade = cidade
  }

  selectCidades() {
    this.selectedCidades = this.cidadesList.filter(cidade => cidade.isChecked)
  }

  deleteCidade(event: { isConfirmed: boolean }) {
    this.setDeleteEvenMessage();
    if (event.isConfirmed) {
      this.isDeleting = true
      this.cidadeService.deleteCidade(this.selectedCidade?.id || "")
        .then(res => {
          this.setDeleteEvenMessage(true, 'Cidade removida', 'successfully')
          this.isDeleting = false
        })
        .catch(err => {
          this.setDeleteEvenMessage(true, 'Cidade não pode ser removida', 'error')
          this.isDeleting = false
        })
    }
    else {
      this.isDeleting = false
      this.open = false;
      this.selectedCidade = undefined
    }
  }

  deleteCidadeList(event: { isConfirmed: boolean }) {
    this.setDeleteEvenMessage();
    if (event.isConfirmed) {
      this.isDeleting = true
      this.cidadeService.deleteCidadesList(this.selectedCidades)
        .then(res => {
          this.setDeleteEvenMessage(true, 'Lista de cidades removida', 'successfully')
          this.isDeleting = false
        })
        .catch(err => {
          this.setDeleteEvenMessage(true, 'Lista não removida', 'error')
          this.isDeleting = false
        })
    }
    else {
      this.isDeleting = false
      this.askDeleteGroup = false;
    }
  }

  dolar2Real(cidade: Cidade) {
    if (cidade.custoCidadeUs && this.dolarHoje?.USD) {
      return cidade.custoCidadeUs * (this.dolarHoje.USD.ask || 1)
    }
    return 0
  }

  setPageOrderBY(orderBy: string) {
    if (orderBy === 'populacao') {
      this.orderBy = orderBy
      this.ascNome = true
      this.ascPopulacao = !this.ascPopulacao
      this.asc = this.ascPopulacao
    }
    else if (orderBy === 'nome') {
      this.orderBy = orderBy
      this.ascPopulacao = true
      this.ascNome = !this.ascNome
      this.asc = this.ascNome
    }
    this.setCidadePageOrderBy(this.uf, this.orderBy, this.asc, this.pageOfCidades.pageNumber)
  }

  arrayOne(n: number): any[] {
    return Array(n);
  }

  private setDolar() {
    this.dolarService.getDolar()
      .then(res => {
        this.dolarHoje = res as Dolar
      })
      .catch(err => console.log(err))
  }


  private setDeleteEvenMessage(show = false, msg = '', type = '') {
    this.cidadeService.deletedCidade.emit({
      show: show,
      msg: msg,
      type: type,
    });
  }

  private subscribeNotifications() {
    this.cidadeService.savedCidade.subscribe((notification: Notification) => {
      if (notification.type === "successfully")
        this.setCidadePageOrderBy(this.uf, this.orderBy, this.asc, this.pageOfCidades.pageNumber)
    });
    this.cidadeService.deletedCidade.subscribe((notification: Notification) => {
      if (notification.type === "successfully") {
        this.open = false;
        this.askDeleteGroup = false
        this.modoEdicao = false
        this.setCidadePageOrderBy(this.uf, this.orderBy, this.asc, this.pageOfCidades.pageNumber)
      }
    });
  }

  private reset() {
    this.selectedCidades = []
    this.selectedCidade = new Cidade
    this.modoEdicao = false;
    this.askDeleteGroup = false
    this.ascPopulacao = true
    this.ascNome = true
    this.orderBy = "nome"
  }

  private setCidadePage(uf: string, pageNumber: number) {
    this.cidadeService.getPagePorEstado(uf, pageNumber)
      .then((page) => {
        this.pageOfCidades = page as Page;
        this.cidadesList = this.pageOfCidades.cidadesList;
        console.log(page);

      })
      .catch(err => {
        console.log(err);
      });
  }

  private setCidadePageOrderBy(uf: string, orderBy: string, asc: boolean, pageNumber: number) {
    this.cidadeService.getPagePorEstadoOrderBy(uf, orderBy, asc, pageNumber)
      .then((page) => {
        this.pageOfCidades = page as Page;
        this.cidadesList = this.pageOfCidades.cidadesList;
      })
      .catch(err => {
        console.log(err);
      });
  }

}
