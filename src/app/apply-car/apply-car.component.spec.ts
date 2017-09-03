import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplyCarComponent } from './apply-car.component';

describe('ApplyCarComponent', () => {
  let component: ApplyCarComponent;
  let fixture: ComponentFixture<ApplyCarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApplyCarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplyCarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
