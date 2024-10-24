/* eslint-disable @typescript-eslint/naming-convention */
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TranslocoModule } from '@ngneat/transloco';
import { IconImageFirstLetterComponent, NgVarDirective } from '@shared';

export const CommonModules = [CommonModule, TranslocoModule, NgVarDirective, IconImageFirstLetterComponent, RouterModule];
