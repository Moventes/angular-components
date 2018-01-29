import { ElementRef, Renderer2, NgZone } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import { Address } from 'mv-common-components';
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
export declare class AddressInputDirective implements ControlValueAccessor {
    private element;
    private renderer;
    private ngZone;
    /**
     * Google provided autocomplete service
     */
    private autocomplete;
    /**
     * Displayed address
     */
    private _address;
    /**
     * Sets the displayed address.
     * Propagates the address object to the model.
     */
    address: Address;
    /**
     * Directive constructor
     * @param element {ElementRef} Provides the parent element used to host the autocomplete
     * @param renderer {Renderer2} Angular provider which aims to impact value on the DOM
     * @param ngZone {NgZone} Angular provider which helps running Google's function in Angular zone
     */
    constructor(element: ElementRef, renderer: Renderer2, ngZone: NgZone);
    /**
     * Called when selecting a proposition.
     * Gets the place details from google autocomplete and format them into an address object.
     * Sets the address with this object.
     */
    private selectAddress();
    /**
     * This method is part of ControlValueAccessor interface.
     * Its role is to set value from the model to the DOM
     *
     * @param value Value given from the model
     */
    writeValue(value: Address): void;
    /**
     * This method is part of ControlValueAccessor interface.
     * Its role is to set the function that will propagate changes from the DOM to the model.
     *
     * @param fn {function} Angular internal function
     */
    registerOnChange(fn: any): void;
    /**
     * This method is part of ControlValueAccessor interface.
     * Not used here
     */
    registerOnTouched(fn: any): void;
    /**
     * Container for the propagation function.
     */
    onChange(_: any): void;
}
