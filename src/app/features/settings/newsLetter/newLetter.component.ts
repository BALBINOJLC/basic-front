/* eslint-disable arrow-parens */
import { ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { IAppState } from '@store';
import { Observable, Subject } from 'rxjs';
import { INewsLetterEntity, IQueryNewsLetters } from './interface';

import * as actions from './store';
import { CommonModules } from '@shared';
import { TranslocoModule } from '@ngneat/transloco';
import { MatIcon } from '@angular/material/icon';
import { MatButton } from '@angular/material/button';
import { MatError, MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';

@Component({
  selector: 'settings-newsLetter',
  templateUrl: './newsLetter.component.html',
  standalone: true,
  imports: [CommonModules, ReactiveFormsModule, TranslocoModule, MatIcon, MatButton, MatInput, MatError, MatLabel, MatFormField],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SettingsNewsLetterComponent implements OnInit {
  form: FormGroup;
  newsLetter$: Observable<INewsLetterEntity[]>;

  private _unsubscribeAll: Subject<void> = new Subject<void>();

  constructor(
    private fb: FormBuilder,
    private store: Store<IAppState>
  ) {
    this.form = this.fb.group({
      name: ['', Validators.required],
    });
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Lifecycle hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On init
   */
  ngOnInit(): void {
    this.get();
  }

  get(): void {
    const params: IQueryNewsLetters = {
      limit: 10,
      offset: 0,
      sort: { field: 'email', order: 1 },
    };
    console.log('get', params);

    // this.store.dispatch(actions.NewsLetterGets({ params }));
    // this.newsLetter$ = this.store.select('newsLetter').pipe(
    //   takeUntil(this._unsubscribeAll),
    //   map((d) => d),
    //   switchMap((d) => of(d.items))
    // );
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------

  addRole(): void {
    if (this.form.valid) {
      this.store.dispatch(actions.NewsLetterAdd({ item: this.form.value }));
      this.form.reset();
    }
  }

  updateRole(newsLetter: INewsLetterEntity, value: string): void {
    const newsLetterUpdated: INewsLetterEntity = {
      email: value,
    };

    console.log('updateRole', newsLetter, newsLetterUpdated);
    this.store.dispatch(actions.NewsLetterUpdate({ filter: { id: newsLetter.id }, item: newsLetterUpdated }));
  }

  deleteNewsLetter(newsLetter: INewsLetterEntity): void {
    this.store.dispatch(actions.NewsLetterDelete({ id: newsLetter.id }));
  }

  /**
   * Track by function for ngFor loops
   *
   * @param index
   * @param item
   */
  trackByFn(index: number, item: INewsLetterEntity): string | number {
    return item.id || index;
  }
}
