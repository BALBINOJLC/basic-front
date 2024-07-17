import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

export class FormComponent {
  form: FormGroup;

  constructor(private _fd: FormBuilder) {
    this.form = this._fd.group({
      first_name: new FormControl('', [Validators.required]),
      last_name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      is_active: new FormControl(false),
    });
  }
}
