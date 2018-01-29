import { Directive, forwardRef, ElementRef, Renderer2, HostListener, NgZone } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

import { Address, AddressDetails } from 'mv-common-components';

/**
 * Google declaration provides access to Google maps api
 */
declare var google: any;

/**
 * This directive uses Google Maps to get a list of places matching the value of the parent container.
 * When a proposition is selected, the directive returns an object of type {@link Address}.
 *
 * @example
 * <h2>Template driven</h2>
 *   <form name="templateForm">
 *     <label>
 *       Address
 *       <input type="text" [(ngModel)]="address1" name="address1" required mvAddressInput>
 *     </label>
 *   </form>
 * <h2>Model driven driven</h2>
 * <form [formGroup]="form">
 *   <label>
 *     Address
 *     <input formControlName="address2" mvAddressInput>
 *   </label>
 * </form>
 */
@Directive({
  selector: '[mvAddressInput]',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AddressInputDirective),
      multi: true
    }
  ]
})
export class AddressInputDirective implements ControlValueAccessor {
  /**
   * Google provided autocomplete service
   */
  private autocomplete: any;

  /**
   * Displayed address
   */
  private _address: string;

  /**
   * Sets the displayed address.
   * Propagates the address object to the model.
   */
  set address(newAddress: Address) {
    this._address = newAddress.formattedAddress ? newAddress.formattedAddress : 'no formatted address';
    this.renderer.setProperty(this.element.nativeElement, 'value', this._address);
    this.onChange(newAddress);
  }

  /**
   * Directive constructor
   * @param element {ElementRef} Provides the parent element used to host the autocomplete
   * @param renderer {Renderer2} Angular provider which aims to impact value on the DOM
   * @param ngZone {NgZone} Angular provider which helps running Google's function in Angular zone
   */
  constructor(private element: ElementRef, private renderer: Renderer2, private ngZone: NgZone) {
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

  /**
   * Called when selecting a proposition.
   * Gets the place details from google autocomplete and format them into an address object.
   * Sets the address with this object.
   */
  private selectAddress() {
    const place: google.maps.GeocoderResult = this.autocomplete.getPlace();
    const addressValue: any = {};
    const addressDetails: any = {};

    for (const component of place.address_components) {
      if (component.types[0] === 'street_number') {
        addressDetails.streetNumber = component.long_name;
      } else if (component.types[0] === 'route') {
        addressDetails.route = component.long_name;
      } else if (component.types[0] === 'postal_code') {
        addressDetails.postalCode = component.long_name;
      } else if (component.types[0] === 'locality') {
        addressDetails.city = component.long_name;
      } else if (component.types[0] === 'country') {
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

  /**
   * This method is part of ControlValueAccessor interface.
   * Its role is to set value from the model to the DOM
   *
   * @param value Value given from the model
   */
  writeValue(value: Address): void {
    if (value) {
      this.renderer.setProperty(this.element.nativeElement, 'value', value.formattedAddress ? value.formattedAddress : '');
      this.address = value;
    } else {
      this.renderer.setProperty(this.element.nativeElement, 'value', '');
    }
  }

  /**
   * This method is part of ControlValueAccessor interface.
   * Its role is to set the function that will propagate changes from the DOM to the model.
   *
   * @param fn {function} Angular internal function
   */
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  /**
   * This method is part of ControlValueAccessor interface.
   * Not used here
   */
  registerOnTouched(fn: any): void { }

  /**
   * Container for the propagation function.
   */
  onChange(_: any) { }
}
