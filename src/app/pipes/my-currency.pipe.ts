import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'MyCurrencyPipe'
})
export class MyCurrencyPipe implements PipeTransform {

  transform(value: string, args: string): unknown {
    value = (Math.round(+value * 100) / 100).toFixed(2);
    let data = '';
    if (args === 'tl') {
      data = value + ' TL';
    } else if (args === 'dolar') {
      data = '$' + value ;
    } else if (args === 'euro') {
      data = '€' + value ;
    } else if (args === 'gold') {
      data = value + ' Altın';
    }

    return data;
  }

}
