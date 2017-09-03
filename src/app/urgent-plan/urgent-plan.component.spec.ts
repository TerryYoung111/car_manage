import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UrgentPlanComponent } from './urgent-plan.component';

describe('UrgentPlanComponent', () => {
  let component: UrgentPlanComponent;
  let fixture: ComponentFixture<UrgentPlanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UrgentPlanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UrgentPlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
