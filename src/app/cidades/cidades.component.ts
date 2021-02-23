import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { Cidade } from '../shared/cidade.model';
import { CidadeService } from '../shared/cidade.service';
import { Page } from '../shared/page.model';

@Component({
  selector: 'app-cidades',
  templateUrl: './cidades.component.html',
})
export class CidadesComponent implements OnInit {
  @Input() uf = '';
  pageOfCidades = new Page();
  cidadesList: Cidade[] = [];

  constructor(private cidadeService: CidadeService) {}

  ngOnInit(): void {
    this.cidadeService.savedCidade.subscribe((notification: Notification) => {
      this.setCidadePage(this.uf, this.pageOfCidades.pageNumber);
    });
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

  private setCidadePage(uf: string, pageNumber: number) {
    this.cidadeService.getPagePorEstado(uf, pageNumber).then((page) => {
      this.pageOfCidades = page as Page;
      this.cidadesList = this.pageOfCidades.cidadesList;
    });
  }
}
