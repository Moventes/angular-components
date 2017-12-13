import { Directive, Input, TemplateRef, ViewContainerRef, Renderer2 } from '@angular/core';
import { ControlContainer } from '@angular/forms';
import { OnInit, OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';

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
@Directive({
  selector: '[mvErrorDisplay]'
})
export class ErrorDisplayDirective implements OnInit, OnDestroy {
  /**
   * The control which errors are requested
   */
  private target: string;

  /**
   * True if errors already displayed
   */
  private hasView = false;

  /**
   * Subscription to the changes in the control or form value
   */
  private subscription;

  /**
   * Sets the target with the string provided to the directive
   */
  @Input()
  set mvErrorDisplay(target) {
    if (target) {
      this.target = target;
    }
  }

  /**
   * Directive constructor
   * @param templateRef {TemplateRef<any>} Provides the tag containing the directive
   * @param viewContainer {ViewContainerRef} Provides the DOM element that will contain the errors
   * @param controlContainer {ControlContainer} Provides the  form inside of which the directive is provided
   * @param renderer {Renderer2} Angular provider which aims to impact value on the DOM
   */
  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private controlContainer: ControlContainer,
    private renderer: Renderer2
  ) { }

  /**
   * Called when the directive is initialized.
   * Subscribes to the changes in form/control.
   */
  ngOnInit() {
    if (!this.target) {
      this.subscription = this.controlContainer.valueChanges.subscribe(() => {
        this.toggleVisibility(this.controlContainer);
      });
    } else {
      this.subscription = this.controlContainer.control.get(this.target).valueChanges.subscribe(() => {
        this.toggleVisibility(this.controlContainer.control.get(this.target));
      });
    }
  }

  /**
   * Toggle the visibility of the errors list
   * @param target the control or the form observed
   */
  toggleVisibility(target) {
    if (!target.valid && !this.hasView) {
      this.updateErrorList(target);
      this.hasView = true;
    } else if (!target.valid) {
      this.updateErrorList(target);
    } else if (target.valid && this.hasView) {
      this.viewContainer.clear();
      this.hasView = false;
    }
  }

  /**
   * Creates and updates the DOM with the errors or empties it.
   * @param target the control or the form observed
   */
  updateErrorList(target) {
    this.viewContainer.clear();
    if (this.target) {
      // tslint:disable-next-line:forin
      for (const error in target.errors) {
        const embeddedView = this.viewContainer.createEmbeddedView(
          this.templateRef,
          { $implicit: 'ERROR.' + this.target.toUpperCase() + '.' + error.toUpperCase() }
        );
      }
    } else {
      // tslint:disable-next-line:forin
      for (const control in target.control.controls) {
        // tslint:disable-next-line:forin
        for (const error in target.control.get(control).errors) {
          const embeddedView = this.viewContainer.createEmbeddedView(
            this.templateRef,
            { $implicit: 'ERROR.' + control.toUpperCase() + '.' + error.toUpperCase() }
          );
        }
      }
    }
  }

  /**
   * Called when the directive is destroyed.
   * Unsubscribes to the changes in form/control.
   */
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
