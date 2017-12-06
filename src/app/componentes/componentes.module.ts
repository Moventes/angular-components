import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PhoneInputDirective } from './directives/phone-input/phone-input.directive';
import { AddressInputDirective } from './directives/address-input/address-input.directive';
import { TextInputDirective } from './directives/text-input/text-input.directive';
import { ErrorDisplayDirective } from './directives/error-display/error-display.directive';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    PhoneInputDirective,
    AddressInputDirective,
    TextInputDirective,
    ErrorDisplayDirective
  ],
  exports: [
    PhoneInputDirective,
    AddressInputDirective,
    TextInputDirective,
    ErrorDisplayDirective
  ]
})
export class ComponentesModule { }