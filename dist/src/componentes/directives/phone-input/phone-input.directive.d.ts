import { ControlValueAccessor } from '@angular/forms';
import { ElementRef, Renderer2 } from '@angular/core';
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
export declare class PhoneInputDirective implements ControlValueAccessor {
    private element;
    private renderer;
    /**
     * Instance of the Google Phonenumber utils
     */
    private phoneUtil;
    /**
     * Phone number object in google format
     */
    private number;
    /**
     * Listener that will call format function on each input in the host.
     *
     * @param value the value typed in the host input
     */
    input(value: any): void;
    /**
     * Directive constructor
     * @param element {ElementRef} Provides the parent element used to host the autocomplete
     * @param renderer {Renderer2} Angular provider which aims to impact value on the DOM
     */
    constructor(element: ElementRef, renderer: Renderer2);
    /**
     * Parses the string from the input to a phone number object in google format.
     * Then uses this object to generate national and international numbers.
     * Propagates the international number to the model and displays the national phone number.
     *
     * @param val {string} Value from the input
     */
    private formatNumber(val);
    /**
     * This method is part of ControlValueAccessor interface.
     * Its role is to set value from the model to the DOM
     *
     * @param value Value given from the model
     */
    writeValue(value: any): void;
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
    registerOnTouched(): void;
    /**
     * Container for the propagation function.
     */
    propagateChange: (_: any) => void;
}
