import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PhoneInputDirective } from './directives/phone-input/phone-input.directive';
import { AddressInputDirective } from './directives/address-input/address-input.directive';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    PhoneInputDirective,
    AddressInputDirective
  ],
  exports: [
    PhoneInputDirective,
    AddressInputDirective
  ]
})
export class ComponentesModule { }
