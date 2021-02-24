import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiError } from 'src/app/shared/api-error.model';
import { Cidade } from 'src/app/shared/cidade.model';
import { CidadeService } from 'src/app/shared/cidade.service';
import { Estado } from 'src/app/shared/estado.model';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-new-cidade',
  templateUrl: './new-cidade.component.html',
})
export class NewCidadeComponent implements OnInit {
  @Input() estado: Estado | undefined;
  formData = new Cidade();
  savingCidade = false;
  errors = new ApiError

  constructor(private cidadeService: CidadeService, private router: Router) { }

  ngOnInit(): void { }

  saveCidade() {
    this.setEvenMessage()
    this.savingCidade = true;

    this.formData.uf = this.estado?.uf;
    this.cidadeService
      .saveCidade(this.formData)
      .then((response) => {
        this.setEvenMessage(true, 'Cidade salva com sucesso', 'successfully')
        this.savingCidade = false;
      })
      .then(() => {
        this.router.navigate([`/`]);
      })
      .catch((err) => {
        if (err.url === `${environment.apiCidade}/save`){
          this.errors = err.error.errors as ApiError;          
        }          
        this.setEvenMessage(true, 'Cidade não pode ser salva', 'error')
        this.savingCidade = false;
      });
  }

  private setEvenMessage(show = false, msg = '', type = '') {
    this.cidadeService.savedCidade.emit({
      show: show,
      msg: msg,
      type: type,
    });
  }
}
