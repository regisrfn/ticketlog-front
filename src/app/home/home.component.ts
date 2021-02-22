import { Component, OnInit } from '@angular/core';

@Component({
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {

  estadoInicial = "Santa Catarina"
 
  constructor() { }

  ngOnInit(): void {
  }

}
