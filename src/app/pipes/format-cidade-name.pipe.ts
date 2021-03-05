import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatCidadeName'
})
export class FormatCidadeNamePipe implements PipeTransform {

  transform(value: string | undefined): string | undefined {
    let words = value?.split(" ");
    let pattern = /^(dos|da|do)$/g

    return words?.map((word) => {
      if (word.match(pattern))
        return word
      return word[0].toUpperCase() + word.substring(1);
    })
      .join(" ")
  }
}
