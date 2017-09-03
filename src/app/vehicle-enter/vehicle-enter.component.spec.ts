import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicleEnterComponent } from './vehicle-enter.component';

describe('VehicleEnterComponent', () => {
  let component: VehicleEnterComponent;
  let fixture: ComponentFixture<VehicleEnterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VehicleEnterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VehicleEnterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
