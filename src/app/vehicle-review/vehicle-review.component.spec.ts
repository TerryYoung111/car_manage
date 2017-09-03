import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicleReviewComponent } from './vehicle-review.component';

describe('VehicleReviewComponent', () => {
  let component: VehicleReviewComponent;
  let fixture: ComponentFixture<VehicleReviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VehicleReviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VehicleReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
