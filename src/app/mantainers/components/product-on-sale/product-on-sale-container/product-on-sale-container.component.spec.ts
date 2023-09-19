import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductOnSaleContainerComponent } from './product-on-sale-container.component';

describe('ProductOnSaleDashboardComponent', () => {
  let component: ProductOnSaleContainerComponent;
  let fixture: ComponentFixture<ProductOnSaleContainerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProductOnSaleContainerComponent]
    });
    fixture = TestBed.createComponent(ProductOnSaleContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
