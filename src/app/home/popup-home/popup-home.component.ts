import { Component, Input, OnInit } from '@angular/core';
import { Cidade } from 'src/app/shared/cidade.model';
import { Estado } from 'src/app/shared/estado.model';

@Component({
  selector: 'app-popup-home',
  templateUrl: './popup-home.component.html',
})
export class PopupHomeComponent implements OnInit {
  @Input() data: Estado | undefined;
  constructor() {}

  ngOnInit(): void {}
}
