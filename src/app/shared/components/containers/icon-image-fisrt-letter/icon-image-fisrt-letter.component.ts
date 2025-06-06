/* eslint-disable @typescript-eslint/no-explicit-any */
import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { IconItemType, IconLayoutType } from './icon-item-type.types';
import { CommonModules, MaterialToolsModules } from 'app/shared/imports';

import { ImgProfilePipe, TypeofPipe } from '@pipes';

@Component({
  selector: 'app-icon-image-first-letter[itemType]',
  templateUrl: './icon-image-first-letter.component.html',
  standalone: true,
  imports: [...CommonModules, ...MaterialToolsModules, TypeofPipe, ImgProfilePipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IconImageFirstLetterComponent implements OnInit {
  @Input() items: any[] = [];
  @Input() item: any;
  @Input({ required: true }) itemType: IconItemType;
  @Input({ required: true }) layoutType: IconLayoutType = 'ROUND';
  @Input() fontSize: number;
  @Input() fontColor: string;
  @Input() width: number;
  @Input() height: number;

  constructor() {
    this.fontSize = 2;
    this.fontColor = '#fff';
    this.width = 3;
    this.height = 3;
    this.itemType = 'USER';
  }

  ngOnInit(): void {}
}
