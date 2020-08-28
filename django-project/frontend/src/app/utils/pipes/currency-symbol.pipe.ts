import { Pipe, PipeTransform } from '@angular/core';
import {CurrencyPipe} from '@angular/common';

@Pipe({
  name: 'currencySymbol',
  pure: false
})
export class CurrencySymbolPipe extends CurrencyPipe implements
    PipeTransform {
  transform(value: string): any {
    // @ts-ignore
    value = value || '';
    const currencyValue = super.transform(0, value.toUpperCase(), 'symbol', '1.0-2');
    // @ts-ignore
    return currencyValue.replace(/[0-9]/g, '');
  }
}
