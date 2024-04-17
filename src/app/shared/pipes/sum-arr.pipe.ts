/* eslint-disable @typescript-eslint/no-explicit-any */
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sumArr',
  pure: false,
  standalone: true,
})
export class SumArrPipe implements PipeTransform {
  transform(value: any[], param?: string): number {
    if (!value) return 0;
    return value.reduce((total, arg) => {
      if (param && typeof arg === 'object' && arg[param] !== undefined) {
        return total + Number(arg[param]);
      } else if (!param) {
        return total + Number(arg);
      }
      return total;
    }, 0);
  }
}
