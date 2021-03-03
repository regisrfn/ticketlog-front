import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiError } from 'src/app/shared/api-error.model';
import { Cidade } from 'src/app/shared/cidade.model';
import { CidadeService } from 'src/app/shared/cidade.service';
import { Estado } from 'src/app/shared/estado.model';
import { ValidateCidadeService } from 'src/app/shared/validate-cidade.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-new-cidade',
  templateUrl: './new-cidade.component.html',
})
export class NewCidadeComponent implements OnInit {
  @Input() estado: Estado | undefined;
  formData = new Cidade();
  isSavingCidade = false;
  errors = new ApiError
  validation = { nome: false, populacao: false }

  constructor(private cidadeService: CidadeService, private router: Router, private validade: ValidateCidadeService) { }

  ngOnInit(): void { }

  saveCidade() {
    this.setEvenMessage()
    this.isSavingCidade = true;

    this.formData.uf = this.estado?.uf;
    this.cidadeService
      .saveCidade(this.formData)
      .then((response) => {
        this.setEvenMessage(true, 'Cidade salva com sucesso', 'successfully')
        this.isSavingCidade = false;
      })
      .then(() => {
        this.router.navigate([`/${this.estado?.uf}`]);
      })
      .catch((err) => {
        if (err.url === `${environment.apiCidade}/save`) {
          this.errors = err.error.errors as ApiError;
        }
        this.setEvenMessage(true, 'Cidade não pode ser salva', 'error')
        this.isSavingCidade = false;
      });
  }

  public validatePopulacao(input: HTMLInputElement) {
    let number = input.value
    if (!this.validade.validateNumber(number)) {
      input.value = ""
      this.validation.populacao = false
    } else {
      this.validation.populacao = true
    }

  }

  public validateNome() {
    if (this.formData.nome && this.formData.nome.length > 0)
      this.validation.nome = true
    else
      this.validation.nome = false
  }

  private setEvenMessage(show = false, msg = '', type = '') {
    this.cidadeService.savedCidade.emit({
      show: show,
      msg: msg,
      type: type,
    });
  }
}
