import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

export class FormComponent {
  form: FormGroup;

  constructor(private _fd: FormBuilder) {
    this.form = this._fd.group({
      customer: new FormControl('', [Validators.required]),
    });
  }
}
