/* eslint-disable @typescript-eslint/no-explicit-any */
import { Pipe, PipeTransform } from '@angular/core';

type Args = 'number' | 'month' | 'year';

@Pipe({
  name: 'orderArray',
  standalone: true,
})
export class OrderArrayPipe implements PipeTransform {
  transform(value: any[], arg: Args, order: 'ASC' | 'DESC'): any[] {
    if (!Array.isArray(value)) {
      return value;
    }

    switch (arg) {
      case 'number':
        return this.orderByNumber(value, order);
      case 'month':
        return this.orderByMonth(value, order);
      case 'year':
        return this.orderByYear(value, order);
      default:
        return value;
    }
  }

  private orderByNumber(value: any[], order: 'ASC' | 'DESC'): any[] {
    return value.sort((a, b) => {
      if (order === 'ASC') {
        return a - b;
      } else {
        return b - a;
      }
    });
  }

  private orderByMonth(value: any[], order: 'ASC' | 'DESC'): any[] {
    const monthNames = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];
    return value.sort((a, b) => {
      const monthA = monthNames.indexOf(a);
      const monthB = monthNames.indexOf(b);
      return order === 'ASC' ? monthA - monthB : monthB - monthA;
    });
  }

  private orderByYear(value: any[], order: 'ASC' | 'DESC'): any[] {
    return value.sort((a, b) => {
      if (order === 'ASC') {
        return a - b;
      } else {
        return b - a;
      }
    });
  }
}
