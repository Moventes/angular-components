import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-phone-input',
  templateUrl: './phone-input.component.html',
  styleUrls: ['./phone-input.component.scss']
})
export class PhoneInputComponent implements OnInit {
  form: FormGroup;
  phone1 = '+33687539748';
  phone2 = '+33123456789';

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.form = this.fb.group({
      'phone2': new FormControl(this.phone2, [Validators.required, Validators.minLength(12), Validators.maxLength(12)]),
    });
  }
}
