import { TestBed } from '@angular/core/testing';

import { ProductOnSaleService } from './product-on-sale.service';

describe('ProductOnSaleService', () => {
  let service: ProductOnSaleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductOnSaleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
