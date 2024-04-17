import { Pipe, PipeTransform } from '@angular/core';
import { TTypeFileFiltered } from '../types';

@Pipe({
  name: 'fileColor',
  standalone: true,
})
export class FileColorPipe implements PipeTransform {
  transform(fileType: TTypeFileFiltered): string {
    const colorMap: { [key in TTypeFileFiltered]?: string } = {
      JPG: 'bg-amber-600',
      PNG: 'bg-blue-600',
      GIF: 'bg-green-600',
      SVG: 'bg-orange-600',
      BMP: 'bg-purple-600',
      TIFF: 'bg-red-600',
      ICO: 'bg-teal-600',
      WEBP: 'bg-yellow-600',
      PDF: 'bg-red-600',
      DOC: 'bg-pink-600',
      DOCX: 'bg-blue-600',
      XLS: 'bg-green-600',
      XLSX: 'bg-green-700',
      CSV: 'bg-green-600',
      PPT: 'bg-orange-600',
      PPTX: 'bg-purple-600',
      ZIP: 'bg-indigo-600',
      RAR: 'bg-pink-600',
    };

    return colorMap[fileType] || 'bg-gray-600';
  }
}
