import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TemporaryPlanComponent } from './temporary-plan.component';

describe('TemporaryPlanComponent', () => {
  let component: TemporaryPlanComponent;
  let fixture: ComponentFixture<TemporaryPlanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TemporaryPlanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TemporaryPlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
