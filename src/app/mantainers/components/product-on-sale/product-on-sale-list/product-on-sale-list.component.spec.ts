import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductOnSaleListComponent } from './product-on-sale-list.component';

describe('ProductOnSaleListComponent', () => {
  let component: ProductOnSaleListComponent;
  let fixture: ComponentFixture<ProductOnSaleListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProductOnSaleListComponent]
    });
    fixture = TestBed.createComponent(ProductOnSaleListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
