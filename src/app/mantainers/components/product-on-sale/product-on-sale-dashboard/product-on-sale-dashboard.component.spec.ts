import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductOnSaleDashboardComponent } from './product-on-sale-dashboard.component';

describe('ProductOnSaleDashboardComponent', () => {
  let component: ProductOnSaleDashboardComponent;
  let fixture: ComponentFixture<ProductOnSaleDashboardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProductOnSaleDashboardComponent]
    });
    fixture = TestBed.createComponent(ProductOnSaleDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
