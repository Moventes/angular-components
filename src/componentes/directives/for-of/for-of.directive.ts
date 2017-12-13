import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { Directive, forwardRef, Input, TemplateRef, ViewContainerRef, Renderer2 } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor, ControlContainer } from '@angular/forms';
import { ISubscription } from 'rxjs/Subscription';

/**
 * This structural directive acts in the same way as ngFor but it is able to iterate threw Observable, Array or Enum.
 *
 * @example
 * <select [(ngModel)]="select1Enum" name="select1Enum" required>
 *       <option *mvForOf="enum; let return" [value]="return.key">{{ return.value | translate }}</option>
 *     </select>
 * <select [(ngModel)]="select1Observable" name="select1Observable" required>
 *       <option *mvForOf="observable; let return" [value]="return.key">{{ return.value | translate }}</option>
 *     </select>
 * <select [(ngModel)]="select1Array" name="select1Array" required>
 *       <option *mvForOf="array; let return" [value]="return.key">{{ return.value | translate }}</option>
 *     </select>
 * <select formControlName="select2Enum">
 *       <option *mvForOf="enum; let return" [value]="return.key">{{ return.value | translate }}</option>
 *     </select>
 * <select formControlName="select2Observable">
 *       <option *mvForOf="observable; let return" [value]="return.key">{{ return.value | translate }}</option>
 *     </select>
 * <select formControlName="select2Array">
 *       <option *mvForOf="array; let return" [value]="return.key">{{ return.value | translate }}</option>
 *     </select>
 */
@Directive({
  selector: '[mvForOf]',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ForOfDirective),
      multi: true
    }
  ]
})
export class ForOfDirective implements OnInit {
  /**
   * Array based on the list provided that will be used to construct the list in the DOM
   */
  private list: any[];

  /**
   * subscription to athe observable in case the is one.
   */
  private subscriber: ISubscription;


  /**
   * Creates th array based on the list provided to the directive
   */
  @Input()
  set mvForOf(list) {
    console.log('list', list);
    if (list instanceof Array) {
      this.list = [];
      list.forEach((value) => {
        this.list.push({ key: value, value: value });
      });
    } else if (list instanceof Observable) {
      this.subscriber = list.map((values) => {
        const newList = [];
        values.forEach(value => {
          newList.push({ key: value, value: value });
        });
        return newList;
      }).subscribe((values) => {
        this.list = values;
      });
    } else {
      this.list = [];
      // tslint:disable-next-line:forin
      for (const key in list) {
        this.list.push({ key: key, value: list[key] });
      }
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
   * Repeats the template for each element of the list.
   */
  ngOnInit() {
    this.viewContainer.clear();
    for (const element of this.list) {
      const embeddedView = this.viewContainer.createEmbeddedView(
        this.templateRef,
        {
          $implicit: element
        }
      );
    }
  }
}
