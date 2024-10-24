import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
export class FormComponent {
  form: FormGroup;

  constructor(private _fd: FormBuilder) {
    this.form = this._fd.group({
      amount: new FormControl('', [Validators.required, Validators.min(999.9)]),
      description: new FormControl('', [Validators.required]),
    });
  }
}
