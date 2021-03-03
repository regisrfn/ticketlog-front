import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ValidateCidadeService {

  constructor() { }

  public validateNumber(number: string | undefined): boolean {
    if (!number)
      return false
    var reg = new RegExp('^[0-9]+$');
    return reg.test(number)
  }
}
