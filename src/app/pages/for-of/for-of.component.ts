import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

import { Observable } from 'rxjs/Observable';
import { ISubscription } from 'rxjs/Subscription';

import 'rxjs/add/observable/of';

import { EnumValidator } from '../../validators/enum.validator';

export enum EnumOfChoices {
  DOG = 'ANIMAL.DOG',
  CAT = 'ANIMAL.CAT',
  BIRD = 'ANIMAL.BIRD'
}


@Component({
  selector: 'app-for-of',
  templateUrl: './for-of.component.html',
  styleUrls: ['./for-of.component.scss']
})
export class ForOfComponent implements OnInit {
  form: FormGroup;

  array: string[] = ['Chien', 'Chat', 'Oiseau', 'Chtulu'];
  observable: Observable<string[]>;
  enum = EnumOfChoices;

  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.observable = Observable.of(this.array);
    this.form = this.fb.group({
      select2Enum: new FormControl(null, [Validators.required, EnumValidator.isElementOf(EnumOfChoices)]),
      select2Observable: new FormControl(null, [Validators.required, EnumValidator.isElementOf(EnumOfChoices)]),
      select2Array: new FormControl(null, [Validators.required, EnumValidator.isElementOf(EnumOfChoices)]),
    });
  }
}
