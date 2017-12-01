import { Directive, forwardRef, ElementRef, Renderer2 } from '@angular/core';
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

  constructor(private element: ElementRef, private renderer: Renderer2) {
    this.autocomplete = new google.maps.places.Autocomplete(
      (this.element.nativeElement),
      { types: ['geocode'] }
    );
    this.autocomplete.addListener('place_changed', () => {
      this.selectAddress();
    });
  }

  selectAddress() {
    const place = this.autocomplete.getPlace();
    console.log(place);
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
    console.log(addressValue);
    this.propagateChange(addressValue);
    this.renderer.setProperty(this.element.nativeElement, 'value', addressValue.formattedAddress ? addressValue.formattedAddress : '');
  }

  writeValue(value: any): void {
    if (value && value.formattedAddress) {
      this.renderer.setProperty(this.element.nativeElement, 'value', value.formattedAddress);
    } else {
      this.renderer.setProperty(this.element.nativeElement, 'value', '');
    }
  }

  registerOnChange(fn) {
    console.log(fn);
    this.propagateChange = fn;
  }

  registerOnTouched(): void { }

  propagateChange = (_: any) => { };
}
