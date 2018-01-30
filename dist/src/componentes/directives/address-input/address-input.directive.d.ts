import { ElementRef, Renderer2, NgZone } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import { Address } from 'mv-common-components';
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
