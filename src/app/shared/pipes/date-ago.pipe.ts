import { Pipe, PipeTransform } from '@angular/core';

interface TimeIntervals {
  [unit: string]: number;
}

@Pipe({
  name: 'dateAgo',
  standalone: true,
})
export class DateAgoPipe implements PipeTransform {
  private calculateTimeDiff(value: string | Date): string {
    const now = new Date();
    const date = new Date(value);
    const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);
    if (seconds < 29) {
      return 'Justo ahora';
    }
    const intervals: TimeIntervals = {
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
        return `Hace ${count} ${interval}${count > 1 ? 's' : ''}`;
      }
    }
    return value.toString();
  }

  transform(value: string | Date): string {
    if (!value) return '';
    return this.calculateTimeDiff(value);
  }
}
