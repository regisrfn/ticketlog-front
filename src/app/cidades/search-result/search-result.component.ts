import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Cidade } from 'src/app/shared/cidade.model';
import { CidadeService } from 'src/app/shared/cidade.service';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html'
})
export class SearchResultComponent implements OnInit {

  foundListOfCidades: Cidade[] = []
  cidadeNameToSearch: string | undefined
  query: string | undefined
  param: string | undefined

  searchCidade(uf: string | undefined, nome: string | undefined) {
    if (nome && uf) {
      this.cidadeService.getCidadesListByNameAndUf(uf, nome)
        .then(res => {
          this.foundListOfCidades = res as Cidade[]
        })
        .catch(err => console.log(err))
    }
  }

  trackByFn(index: any, item: Cidade) {
    return item.id;
  }

  constructor(private route: ActivatedRoute, private cidadeService: CidadeService) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.param = this.route.snapshot.params["uf"]
      this.cidadeNameToSearch = params.nome
      this.searchCidade(this.param, this.cidadeNameToSearch)
    })
  }

}
