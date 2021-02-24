import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { Cidade } from '../shared/cidade.model';
import { CidadeService } from '../shared/cidade.service';
import { Notification } from '../shared/notification.model';
import { Page } from '../shared/page.model';

@Component({
  selector: 'app-cidades',
  templateUrl: './cidades.component.html',
})
export class CidadesComponent implements OnInit {
  @Input() uf = '';
  pageOfCidades = new Page();
  cidadesList: Cidade[] = [];
  open = false
  selectedCidade: Cidade | undefined
  selectedCidades: Cidade[] = []
  modoEdicao = false;
  askDeleteGroup = false

  constructor(private cidadeService: CidadeService) { }

  ngOnInit(): void {
    this.subscribeNotifications();
    this.setCidadePage(this.uf, 0);
  }

  nextPage() {
    this.setCidadePage(this.uf, this.pageOfCidades.pageNumber + 1);
  }

  previousPage() {
    this.setCidadePage(this.uf, this.pageOfCidades.pageNumber - 1);
  }

  trackByFn(index: any, item: any) {
    return index;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.uf) this.setCidadePage(this.uf, 0);
  }

  selectCidade(cidade: Cidade) {
    this.open = true;
    this.selectedCidade = cidade
  }

  selectCidades() {
    this.selectedCidades = this.cidadesList.filter(cidade => cidade.isChecked)
    console.log(this.selectedCidades);

  }

  deleteCidade(event: { isConfirmed: boolean }) {
    this.setDeleteEvenMessage();
    if (event.isConfirmed) {
      this.cidadeService.deleteCidade(this.selectedCidade?.id || "")
        .then(res => {
          this.setDeleteEvenMessage(true, 'Cidade removida', 'successfully')
        })
        .catch(err => {
          this.setDeleteEvenMessage(true, 'Cidade não pode ser removida', 'error')
        })
    }
    else {
      this.open = false;
      this.selectedCidade = undefined
    }
  }

  deleteCidadeList(event: { isConfirmed: boolean }) {
    this.setDeleteEvenMessage();
    if (event.isConfirmed) {
      this.cidadeService.deleteCidadesList(this.selectedCidades)
        .then(res => {
          this.setDeleteEvenMessage(true, 'Lista de cidades removida', 'successfully')
        })
        .catch(err => {
          this.setDeleteEvenMessage(true, 'Lista não removida', 'error')
        })
    }
    else {
      this.askDeleteGroup = false;
      this.selectedCidades = []
    }
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
        this.setCidadePage(this.uf, this.pageOfCidades.pageNumber);
    });
    this.cidadeService.deletedCidade.subscribe((notification: Notification) => {
      if (notification.type === "successfully") {
        this.open = false;
        this.askDeleteGroup = false
        this.modoEdicao = false
        this.setCidadePage(this.uf, this.pageOfCidades.pageNumber);
      }

    });
  }
  private setCidadePage(uf: string, pageNumber: number) {
    this.cidadeService.getPagePorEstado(uf, pageNumber).then((page) => {
      this.pageOfCidades = page as Page;
      this.cidadesList = this.pageOfCidades.cidadesList;
    });
  }
}
