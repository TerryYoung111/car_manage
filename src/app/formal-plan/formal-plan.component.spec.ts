import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormalPlanComponent } from './formal-plan.component';

describe('FormalPlanComponent', () => {
  let component: FormalPlanComponent;
  let fixture: ComponentFixture<FormalPlanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormalPlanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormalPlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
