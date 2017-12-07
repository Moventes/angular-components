import { Directive, Input, TemplateRef, ViewContainerRef, Renderer2 } from '@angular/core';
import { ControlContainer } from '@angular/forms';
import { OnInit, OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';

@Directive({
  selector: '[mvErrorDisplay]'
})
export class ErrorDisplayDirective implements OnInit, OnDestroy {
  private target;
  private hasView = false;
  private subscription;
  private template;

  @Input()
  set mvErrorDisplay(target) {
    if (target) {
      this.target = target;
      console.log('target : ', this.target);
      // this.subscription = target.valueChanges.subscribe(() => {
      //   this.toggleVisibility(target);
      // });
    }
  }

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private controlContainer: ControlContainer,
    private renderer: Renderer2
  ) {
    console.log('templateRef', templateRef);
    console.log('viewContainer', viewContainer);
    console.log('controlContainer', controlContainer);
  }

  ngOnInit() {
    if (!this.target) {
      this.subscription = this.controlContainer.valueChanges.subscribe(() => {
        console.log('plop');
        this.toggleVisibility(this.controlContainer);
      });
    } else {
      this.subscription = this.controlContainer.control.get(this.target).valueChanges.subscribe(() => {
        this.toggleVisibility(this.controlContainer.control.get(this.target));
      });
    }
  }

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

  updateErrorList(target) {
    console.log('update target : ', target);
    this.viewContainer.clear();
    if (this.target) {
      // tslint:disable-next-line:forin
      for (const error in target.errors) {
        console.log(error);
        const embeddedView = this.viewContainer.createEmbeddedView(
          this.templateRef,
          { $implicit: 'ERROR.' + this.target.toUpperCase() + '.' + error.toUpperCase() }
        );
        console.log(embeddedView);
      }
    } else {
      // tslint:disable-next-line:forin
      for (const control in target.control.controls) {
        console.log('control in controls : ', control);
        // tslint:disable-next-line:forin
        for (const error in target.control.get(control).errors) {
          console.log('error in errors : ', error);
          const embeddedView = this.viewContainer.createEmbeddedView(
            this.templateRef,
            { $implicit: 'ERROR.' + control.toUpperCase() + '.' + error.toUpperCase() }
          );
          console.log(embeddedView);
        }
      }
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
