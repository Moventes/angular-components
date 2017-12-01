import { Component, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  private form: FormGroup;
  title = 'app';
  phone1 = '+33687539748';
  phone2 = '+33123456789';
  address1: { [k: string]: any };
  address2: { [k: string]: any };

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      'phone2': new FormControl(this.phone2, [Validators.required]),
      'address2': new FormControl(this.address2, [Validators.required]),
    });
  }
}
