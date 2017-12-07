import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { Directive, forwardRef, Input, TemplateRef, ViewContainerRef, Renderer2 } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor, ControlContainer } from '@angular/forms';
import { ISubscription } from 'rxjs/Subscription';

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
export class ForOfDirective implements /*ControlValueAccessor,*/ OnInit {
  private list: any[];
  private subscriber: ISubscription;


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

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private controlContainer: ControlContainer,
    private renderer: Renderer2
  ) { }

  ngOnInit() {
    this.viewContainer.clear();
    console.log('oninit', this.list);
    for (const element of this.list) {
      console.log('element', element);
      console.log('template', this.templateRef);
      const embeddedView = this.viewContainer.createEmbeddedView(
        this.templateRef,
        {
          $implicit: element
        }
      );
      console.log(embeddedView);
    }
  }
}
