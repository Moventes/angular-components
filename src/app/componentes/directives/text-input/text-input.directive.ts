import { Input, Directive, HostListener, forwardRef, ElementRef, Renderer2, Output, EventEmitter } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms/src/directives/control_value_accessor';
import { NG_VALUE_ACCESSOR, NgControl } from '@angular/forms';

@Directive({
  selector: '[appTextInput]',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TextInputDirective),
      multi: true
    }
  ]
})
export class TextInputDirective implements ControlValueAccessor {
  _viewValue;

  get viewValue() {
    return this._viewValue;
  }

  set viewValue(value) {
    this._viewValue = value ? value.toLowerCase() : '';
    this.onChange(this._viewValue.toUpperCase());
  }

  @HostListener('input', ['$event.target.value'])
  input(value) {
    console.log(this);
    console.log('value : ', value);
    console.log('function : ', this.onChange);
    this.viewValue = value;
  }

  constructor(private element: ElementRef, private renderer: Renderer2) { }

  writeValue(obj: any): void {
    if (obj !== undefined) {
      this.renderer.setProperty(this.element.nativeElement, 'value', obj ? obj.toLowerCase() : '');
      this.viewValue = obj;
    }
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
  }

  onChange(_: any) { }
}
