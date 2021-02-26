import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatCidadeName'
})
export class FormatCidadeNamePipe implements PipeTransform {

  transform(value: string | undefined,): string | undefined {
    let words = value?.split(" ");
    return words?.map((word) => {
      return word[0].toUpperCase() + word.substring(1);
    }).join(" ");
  }

}
