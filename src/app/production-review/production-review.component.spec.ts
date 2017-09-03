import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductionReviewComponent } from './production-review.component';

describe('ProductionReviewComponent', () => {
  let component: ProductionReviewComponent;
  let fixture: ComponentFixture<ProductionReviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductionReviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductionReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
