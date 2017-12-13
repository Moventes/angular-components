import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Directive, forwardRef, HostListener, ElementRef, Renderer2 } from '@angular/core';

import * as libPhoneNumber from 'google-libphonenumber';

/**
 * Provides utils for phone numbers
 */
const PhoneNumberUtil = libPhoneNumber.PhoneNumberUtil;

/**
 * Provides the differents format used by Google's libphonenumber
 */
const PhoneNumberFormat = libPhoneNumber.PhoneNumberFormat;

/**
 * This directive aims to provide a way to display a national phone number while you're typing
 * but will return an international (E164) phone number.
 * It's based on google-libphonenumber.
 *
 * @example
 * // template driven
 * <input type="text" [(ngModel)]="phone1" name="phone1" required minlength="12" maxlength="12" mvPhoneInput>
 * // model driven
 * <input formControlName="phone2" mvPhoneInput>
 */
@Directive({
  selector: '[mvPhoneInput]',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => PhoneInputDirective),
      multi: true
    }
  ]
})
export class PhoneInputDirective implements ControlValueAccessor {
  /**
   * Instance of the Google Phonenumber utils
   */
  private phoneUtil = PhoneNumberUtil.getInstance();

  /**
   * Phone number object in google format
   */
  private number;

  /**
   * Listener that will call format function on each input in the host.
   *
   * @param value the value typed in the host input
   */
  @HostListener('input', ['$event.target.value'])
  input(value) {
    this.formatNumber(value);
  }

  /**
   * Directive constructor
   * @param element {ElementRef} Provides the parent element used to host the autocomplete
   * @param renderer {Renderer2} Angular provider which aims to impact value on the DOM
   */
  constructor(private element: ElementRef, private renderer: Renderer2) { }

  /**
   * Parses the string from the input to a phone number object in google format.
   * Then uses this object to generate national and international numbers.
   * Propagates the international number to the model and displays the national phone number.
   *
   * @param val {string} Value from the input
   */
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

  /**
   * This method is part of ControlValueAccessor interface.
   * Its role is to set value from the model to the DOM
   *
   * @param value Value given from the model
   */
  writeValue(value: any): void {
    console.log('write value : ', value);
    this.formatNumber(value);
    console.log(this.element);
  }

  /**
   * This method is part of ControlValueAccessor interface.
   * Its role is to set the function that will propagate changes from the DOM to the model.
   *
   * @param fn {function} Angular internal function
   */
  registerOnChange(fn) {
    console.log(fn);
    this.propagateChange = fn;
  }

  /**
   * This method is part of ControlValueAccessor interface.
   * Not used here
   */
  registerOnTouched(): void { }

  /**
   * Container for the propagation function.
   */
  propagateChange = (_: any) => { };
}
