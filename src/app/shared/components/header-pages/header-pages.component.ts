import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { debounceTime, Subject, takeUntil } from 'rxjs';
import { TranslocoModule } from '@ngneat/transloco';
import { CommonModule } from '@angular/common';
import { IAppState } from '@store';
import { Store } from '@ngrx/store';
import * as actions from '@store';
import { TLayout } from '@utils';

@Component({
  selector: 'header-pages',
  templateUrl: './header-pages.coponent.html',
  encapsulation: ViewEncapsulation.None,
  standalone: true,
  imports: [TranslocoModule, CommonModule, FormsModule, ReactiveFormsModule, MatIconModule, MatInputModule, MatButtonModule],
})
export class HeaderPagesComponent implements OnInit, OnDestroy {
  @Output() setLayoutAction = new EventEmitter<TLayout>();
  @Output() addAction = new EventEmitter<void>();
  @Output() searchAction = new EventEmitter<string>();
  @Output() cleanSearch = new EventEmitter<void>();
  @Output() downloadAction = new EventEmitter<void>();
  @Output() loadMasiveAction = new EventEmitter<void>();
  @Input() minLength = 3;
  @Input() count = 0;
  @Input() titleSingle!: string;
  @Input() titlePlural!: string;
  @Input() showBtnDownload!: boolean;
  @Input() btnDownload!: string;
  @Input() btnAdd!: string;
  form: FormGroup;
  private _unsubscribeAll: Subject<void> = new Subject<void>();
  constructor(
    private formBuilder: FormBuilder,
    private store: Store<IAppState>
  ) {
    this.form = this.formBuilder.group({
      query: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.search();
  }

  search(): void {
    this.form.valueChanges.pipe(debounceTime(600), takeUntil(this._unsubscribeAll)).subscribe(({ query }) => {
      if (query && query.length >= this.minLength) {
        this.searchAction.emit(query);
      }
    });
  }

  add(): void {
    this.addAction.emit();
  }

  setLayout(layout: TLayout): void {
    this.setLayoutAction.emit(layout);
  }

  clean(): void {
    this.store.dispatch(actions.isLoading());
    setTimeout(() => {
      this.store.dispatch(actions.stopLoading());
    }, 3000);
    this.cleanSearch.emit();
  }

  download(): void {
    this.downloadAction.emit();
  }
  ngOnDestroy(): void {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }
}
