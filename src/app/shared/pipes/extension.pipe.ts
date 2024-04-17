import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'extension',
  standalone: true,
})
export class ExtensionPipe implements PipeTransform {
  transform(value: string): string {
    if (value.includes('sheet')) {
      return 'xls';
    } else if (value.includes('document')) {
      return 'doc';
    }
    return value.split('.').pop() || value;
  }
}
