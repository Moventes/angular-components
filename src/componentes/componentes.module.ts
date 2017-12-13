import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PhoneInputDirective } from './directives/phone-input/phone-input.directive';
import { AddressInputDirective } from './directives/address-input/address-input.directive';
import { ErrorDisplayDirective } from './directives/error-display/error-display.directive';
import { ForOfDirective } from './directives/for-of/for-of.directive';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    PhoneInputDirective,
    AddressInputDirective,
    ErrorDisplayDirective,
    ForOfDirective
  ],
  exports: [
    PhoneInputDirective,
    AddressInputDirective,
    ErrorDisplayDirective,
    ForOfDirective
  ]
})
export class ComponentesModule { }
