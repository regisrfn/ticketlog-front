import { Component, Input, OnInit } from '@angular/core';
import { Cidade } from 'src/app/shared/cidade.model';
import { CidadeService } from 'src/app/shared/cidade.service';
import { Estado } from 'src/app/shared/estado.model';

@Component({
  selector: 'app-new-cidade',
  templateUrl: './new-cidade.component.html',
})
export class NewCidadeComponent implements OnInit {
  @Input() estado: Estado | undefined;
  formData = new Cidade();
  savingCidade = false;

  constructor(private cidadeService: CidadeService) {}

  ngOnInit(): void {}

  saveCidade() {
    this.cidadeService.savedCidade.emit({
      show: false,
      msg: '',
      type: '',
    });
    this.savingCidade = true;

    this.formData.uf = this.estado?.uf;
    this.cidadeService
      .saveCidade(this.formData)
      .then((response) => {
        this.cidadeService.savedCidade.emit({
          show: true,
          msg: 'Cidade salva com sucesso',
          type: 'successfully',
        });
        this.savingCidade = false;
      })
      .catch((err) => {
        this.cidadeService.savedCidade.emit({
          show: true,
          msg: 'Cidade não pode ser salva',
          type: 'error',
        });
        this.savingCidade = false;
      });
  }
}
