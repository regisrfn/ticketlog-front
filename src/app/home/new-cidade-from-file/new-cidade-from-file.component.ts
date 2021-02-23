import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CidadeService } from 'src/app/shared/cidade.service';
import { Estado } from 'src/app/shared/estado.model';

@Component({
  selector: 'app-new-cidade-from-file',
  templateUrl: './new-cidade-from-file.component.html',
})
export class NewCidadeFromFileComponent implements OnInit {
  @Input() estado: Estado | undefined;
  formData = new FormData();
  savingCidade = false;

  constructor(private cidadeService: CidadeService, private router: Router) {}

  ngOnInit(): void {}

  selectFiles(input: HTMLInputElement) {
    const files = input.files;
    if (files) this.formData.append('file', files[0], files[0].name);
  }

  saveCidade() {
    this.cidadeService.savedCidadeList.emit({
      show: false,
      msg: '',
      type: '',
    });
    this.savingCidade = true;

    this.cidadeService
      .saveCidadeFromFile(this.formData)
      .then((response) => {
        this.cidadeService.savedCidadeList.emit({
          show: true,
          msg: 'Cidade salva com sucesso',
          type: 'successfully',
        });
        this.savingCidade = false;
      })
      .then(() => {
        this.router.navigate([`/`]);
      })
      .catch((err) => {
        this.cidadeService.savedCidadeList.emit({
          show: true,
          msg: 'Lista de cidades não foi salva',
          type: 'error',
        });
        this.savingCidade = false;
      });
  }
}
