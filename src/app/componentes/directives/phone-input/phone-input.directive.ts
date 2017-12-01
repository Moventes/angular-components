import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Directive, forwardRef, HostListener, ElementRef, Renderer2 } from '@angular/core';

import * as libPhoneNumber from 'google-libphonenumber';
const PhoneNumberUtil = libPhoneNumber.PhoneNumberUtil;
const PhoneNumberFormat = libPhoneNumber.PhoneNumberFormat;

@Directive({
  selector: '[appPhoneInput]',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => PhoneInputDirective),
      multi: true
    }
  ]
})
export class PhoneInputDirective implements ControlValueAccessor {

  private phoneUtil = PhoneNumberUtil.getInstance();
  private number;

  @HostListener('input', ['$event.target.value'])
  input(value) {
    this.formatNumber(value);
  }

  constructor(private element: ElementRef, private renderer: Renderer2) { }

  formatNumber(val: string) {
    const formattedNumber: { [k: string]: any } = {};
    try {
      this.number = this.phoneUtil.parse(val, 'FR');
      formattedNumber.national = this.phoneUtil.format(this.number, PhoneNumberFormat.NATIONAL);
      formattedNumber.international = this.phoneUtil.format(this.number, PhoneNumberFormat.E164);
    } catch (e) {
      formattedNumber.national = val;
      formattedNumber.international = null;
    }
    this.propagateChange(formattedNumber.international);
    this.renderer.setProperty(this.element.nativeElement, 'value', formattedNumber.national);

  }

  writeValue(value: any): void {
    console.log('write');
    this.formatNumber(value);
  }

  registerOnChange(fn) {
    this.propagateChange = fn;
  }

  registerOnTouched(): void { }

  propagateChange = (_: any) => { };
}
