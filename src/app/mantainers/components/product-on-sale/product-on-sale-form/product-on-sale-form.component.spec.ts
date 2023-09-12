import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductOnSaleFormComponent } from './product-on-sale-form.component';

describe('ProductOnSaleFormComponent', () => {
  let component: ProductOnSaleFormComponent;
  let fixture: ComponentFixture<ProductOnSaleFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProductOnSaleFormComponent]
    });
    fixture = TestBed.createComponent(ProductOnSaleFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
