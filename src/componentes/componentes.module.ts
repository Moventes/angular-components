import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { } from '@types/googlemaps';
import { PhoneInputDirective } from './directives/phone-input/phone-input.directive';
import { AddressInputDirective } from './directives/address-input/address-input.directive';
import { ErrorDisplayDirective } from './directives/error-display/error-display.directive';

export * from 'mv-common-components';

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [
    PhoneInputDirective,
    AddressInputDirective,
    ErrorDisplayDirective,
  ],
  exports: [
    PhoneInputDirective,
    AddressInputDirective,
    ErrorDisplayDirective,
  ]
})
export class ComponentesAngularModule { }
