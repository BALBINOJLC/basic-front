import { Pipe, PipeTransform } from '@angular/core';
import { TFileType } from '../types';

@Pipe({
  name: 'fileType',
  standalone: true,
})
export class FileTypePipe implements PipeTransform {
  private static readonly mimeTypeMap: { [key in TFileType]?: string } = {
    'image/jpeg': 'JPG',
    'image/png': 'PNG',
    'image/gif': 'GIF',
    'image/svg+xml': 'SVG',
    'image/bmp': 'BMP',
    'image/tiff': 'TIFF',
    'image/x-icon': 'ICO',
    'image/webp': 'WEBP',
    'application/pdf': 'PDF',
    'application/msword': 'DOC',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document': 'DOCX',
    'application/vnd.ms-excel': 'XLS',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': 'XLSX',
    'application/vnd.ms-powerpoint': 'PPT',
    'application/vnd.openxmlformats-officedocument.presentationml.presentation': 'PPTX',
    'application/zip': 'ZIP',
    'application/x-rar-compressed': 'RAR',
    'text/csv': 'CSV',
  };

  transform(fileType: TFileType): string {
    return FileTypePipe.mimeTypeMap[fileType] || 'UNKNOWN';
  }
}
