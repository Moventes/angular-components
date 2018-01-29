import { TemplateRef, ViewContainerRef, Renderer2 } from '@angular/core';
import { ControlContainer } from '@angular/forms';
import { OnInit, OnDestroy } from '@angular/core';
/**
 * This structural directive provides a way to display errors from a control or from the full form.
 * It must be placed on an element inside a form (template or model driven either).
 * this element will be repeaded for each error in the control/form.
 *
 * @example
 * <h2>Template driven</h2>
 * <form name="templateForm">
 *   <label>
 *     Address
 *     <input type="text" [(ngModel)]="address1" name="address1" required mvAddressInput>
 *   </label>
 *   <p>Errors : </p>
 *   <p *mvErrorDisplay="let error">{{ error | translate }}</p>
 * </form>
 * <h2>Model driven driven</h2>
 * <form [formGroup]="form">
 *   <label>
 *     Address
 *     <input formControlName="address2" mvAddressInput>
 *   </label>
 *   <p>model value : {{ form.get('address2').value | json }}</p>
 *   <p>Errors : </p>
 *   <p *mvErrorDisplay="'address2'; let error">{{ error | translate }}</p>
 * </form>
 */
export declare class ErrorDisplayDirective implements OnInit, OnDestroy {
    private templateRef;
    private viewContainer;
    private controlContainer;
    private renderer;
    /**
     * The control which errors are requested
     */
    private target;
    /**
     * True if errors already displayed
     */
    private hasView;
    /**
     * Subscription to the changes in the control or form value
     */
    private subscription;
    /**
     * Sets the target with the string provided to the directive
     */
    mvErrorDisplay: any;
    /**
     * Directive constructor
     * @param templateRef {TemplateRef<any>} Provides the tag containing the directive
     * @param viewContainer {ViewContainerRef} Provides the DOM element that will contain the errors
     * @param controlContainer {ControlContainer} Provides the  form inside of which the directive is provided
     * @param renderer {Renderer2} Angular provider which aims to impact value on the DOM
     */
    constructor(templateRef: TemplateRef<any>, viewContainer: ViewContainerRef, controlContainer: ControlContainer, renderer: Renderer2);
    /**
     * @inheritDoc
     */
    ngOnInit(): void;
    /**
     * @inheritDoc
     */
    ngOnDestroy(): void;
    /**
     * Toggle the visibility of the errors list
     * @param target the control or the form observed
     */
    private toggleVisibility(target);
    /**
     * Creates and updates the DOM with the errors or empties it.
     * @param target the control or the form observed
     */
    private updateErrorList(target);
}
