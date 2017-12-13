import { Directive, forwardRef, ElementRef, Renderer2, HostListener, NgZone } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

/**
 * Google declaration provides access to Google maps api
 */
declare var google: any;

/**
 * This directive uses Google maps API to generate a list of propositions based on the value of the parent container.
 * When a proposition is selected, the directive returns an addres object.
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
  autocomplete: any;

  /**
   * Displayed address
   */
  _address;

  /**
   * Gets the displayed _address
   */
  get address() {
    return this._address;
  }

  /**
   * Sets the displayed _address.
   * Propagates the address object to the model.
   */
  set address(value) {
    this._address = value.formattedAddress ? value.formattedAddress : 'no formatted address';
    this.renderer.setProperty(this.element.nativeElement, 'value', this._address);
    this.onChange(value);
  }

  /**
   * Directive constructor
   * @param element {ElementRef} Provides the parent element used to host the autocomplete
   * @param renderer {Renderer2} Angular provider which aims to impact value on the DOM
   * @param ngZone {NgZone} Angular provider which helps running Google's function in Angular zone
   */
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

  /**
   * Called when selecting a proposition.
   * Gets the place details from google autocomplete and format them into an address object.
   * Sets the address with this object.
   */
  selectAddress() {
    const place = this.autocomplete.getPlace();
    console.log('select address : ', place);
    const addressValue: { [k: string]: any } = {};
    const addressDetails: { [key: string]: any } = {};
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
  writeValue(value: any): void {
    console.log('writevalue');
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
    console.log('registerOnChange');
    this.onChange = fn;
  }

  /**
   * This method is part of ControlValueAccessor interface.
   * Not used here
   */
  registerOnTouched(fn: any): void {
    console.log('registerOnTouched');
  }

  /**
   * Container for the propagation function.
   */
  onChange(_: any) { }
}
