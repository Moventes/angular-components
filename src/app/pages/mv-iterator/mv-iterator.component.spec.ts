import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MvIteratorComponent } from './mv-iterator.component';

describe('MvIteratorComponent', () => {
  let component: MvIteratorComponent;
  let fixture: ComponentFixture<MvIteratorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MvIteratorComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MvIteratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
