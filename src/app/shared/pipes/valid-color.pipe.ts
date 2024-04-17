import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'validColor',
  standalone: true,
})
export class ValidColorPipe implements PipeTransform {
  transform(value: string): boolean {
    if (this.isValidHex(value) || this.isColorNameValid(value)) {
      return true;
    }
    return false;
  }

  private isValidHex(color: string): boolean {
    return /^#[0-9A-F]{6}$/i.test(color);
  }

  private isColorNameValid(colorName: string): boolean {
    const style = new Option().style;
    style.color = colorName;
    // If the colorName is valid, it will remain unchanged when applied to the style; if not, it will be an empty string.
    return style.color === colorName;
  }
}
