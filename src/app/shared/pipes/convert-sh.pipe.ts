import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'convertSH',
  standalone: true,
})
export class ConvertSH implements PipeTransform {
  transform(value: number): string | number {
    const hrs = Math.floor(value / 3600);
    const min = Math.floor((value - hrs * 3600) / 60);
    let seconds = value - hrs * 3600 - min * 60;
    seconds = Math.round(seconds * 100) / 100;
    let result = hrs < 10 ? '0' + hrs : hrs;
    result += ':' + (min < 10 ? '0' + min : min);
    result += ':' + (seconds < 10 ? '0' + seconds : seconds);

    return result;
  }
}
