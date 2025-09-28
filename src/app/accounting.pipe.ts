import { Pipe, PipeTransform } from '@angular/core';
import { DecimalPipe, formatNumber } from '@angular/common';

@Pipe({
  name: 'accounting'
})
export class AccountingPipe implements PipeTransform {
  transform(value: number): string {
    if (value < 0) {
      return `(${formatNumber(-value, 'en-US', '1.2')})`;
    } else if (value > 0) {
      return formatNumber(value, 'en-US', '1.2');
    } else {
      return '- ';
    }
  }
}
