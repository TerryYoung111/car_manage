import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicleanAlysisComponent } from './vehiclean-alysis.component';

describe('VehicleanAlysisComponent', () => {
  let component: VehicleanAlysisComponent;
  let fixture: ComponentFixture<VehicleanAlysisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VehicleanAlysisComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VehicleanAlysisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
