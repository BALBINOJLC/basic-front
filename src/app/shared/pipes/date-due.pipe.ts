import { Pipe, PipeTransform } from '@angular/core';

interface Intervals {
  [unit: string]: number;
}

@Pipe({
  name: 'dateDue',
  standalone: true,
})
export class DateDuePipe implements PipeTransform {
  private calculateDueTime(value: string | Date): string {
    const now = new Date();
    const dueDate = new Date(value);
    const seconds = Math.floor((dueDate.getTime() - now.getTime()) / 1000);
    if (seconds < 29 && seconds > 0) {
      return 'Justo ahora';
    }
    if (seconds < 0) {
      return '¡Vencido!';
    }
    const intervals: Intervals = {
      año: 31536000,
      mes: 2592000,
      semana: 604800,
      día: 86400,
      hora: 3600,
      minuto: 60,
      segundo: 1,
    };
    for (const interval in intervals) {
      const count = Math.floor(seconds / intervals[interval]);
      if (count > 0) {
        return `Vence en ${count} ${interval}${count > 1 ? 's' : ''}`;
      }
    }
    return value.toString();
  }

  transform(value: string | Date): string {
    if (!value) return '';
    return this.calculateDueTime(value);
  }
}
