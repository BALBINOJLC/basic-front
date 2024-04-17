import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TranslocoModule } from '@ngneat/transloco';
import { IconImageFisrtLetterComponent, NgVarDirective } from '@shared';

export const commonModules = [CommonModule, TranslocoModule, NgVarDirective, IconImageFisrtLetterComponent, RouterModule];
