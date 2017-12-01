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
  phone = '+33687539748';
  plop = '+33123456789';

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      'phone': new FormControl(this.phone, [Validators.required]),
    });
  }
}
