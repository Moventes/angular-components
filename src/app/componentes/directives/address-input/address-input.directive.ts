import { Directive, forwardRef, ElementRef, Renderer2, HostListener, NgZone } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
declare var google: any;

@Directive({
  selector: '[appAddressInput]',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AddressInputDirective),
      multi: true
    }
  ]
})
export class AddressInputDirective implements ControlValueAccessor {
  autocomplete: any;

  _address;

  get address() {
    console.log('get address');
    return this._address;
  }

  set address(value) {
    console.log('set address : ', value);
    this._address = value.formattedAddress ? value.formattedAddress : 'no formatted address';
    this.renderer.setProperty(this.element.nativeElement, 'value', this._address);
    console.log('this address', this._address);

    this.onChange(value);
  }

  constructor(private element: ElementRef, private renderer: Renderer2, private ngZone: NgZone) {
    console.log('constructor');
    this.autocomplete = new google.maps.places.Autocomplete(
      (this.element.nativeElement),
      { types: ['geocode'] }
    );
    this.autocomplete.addListener('place_changed', () => {
      this.ngZone.run(() => {
        this.selectAddress();
      });
    });
  }

  selectAddress() {
    const place = this.autocomplete.getPlace();
    console.log('select address : ', place);
    const addressValue: { [k: string]: any } = {};
    const addressDetails: { [key: string]: any } = {};
    for (const component of place.address_components) {
      if (component.types[0] === 'street_number') {
        addressDetails.streetNumber = component.long_name;
      }
      if (component.types[0] === 'route') {
        addressDetails.route = component.long_name;
      }
      if (component.types[0] === 'postal_code') {
        addressDetails.postalCode = component.long_name;
      }
      if (component.types[0] === 'locality') {
        addressDetails.city = component.long_name;
      }
      if (component.types[0] === 'country') {
        addressDetails.country = component.long_name;
      }
    }
    addressValue.latitude = place.geometry.location.lat();
    addressValue.longitude = place.geometry.location.lng();
    addressValue.formattedAddress = place.formatted_address;
    addressValue.googlePlaceId = place.place_id;
    addressValue.addressDetails = addressDetails;
    this.address = addressValue;
  }

  writeValue(obj: any): void {
    console.log('writevalue');
    if (obj) {
      this.renderer.setProperty(this.element.nativeElement, 'value', obj.formattedAddress ? obj.formattedAddress : '');
      this.address = obj;
    } else {
      this.renderer.setProperty(this.element.nativeElement, 'value', '');
    }
  }
  registerOnChange(fn: any): void {
    console.log('registerOnChange');
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    console.log('registerOnTouched');
  }

  onChange(_: any) { }
}
