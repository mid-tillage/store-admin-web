import { Component } from '@angular/core';
import { ProductOnSale } from 'src/app/mantainers/models/product-on-sale';
import { ProductOnSaleService } from 'src/app/mantainers/services/product-on-sale/product-on-sale.service';

@Component({
  selector: 'app-product-on-sale-container',
  templateUrl: './product-on-sale-container.component.html',
  styleUrls: ['./product-on-sale-container.component.css']
})
export class ProductOnSaleContainerComponent {
  constructor(private readonly productOnSaleService: ProductOnSaleService) { }
  public tabIndex: number = 0;

  focusTab(index: any) {
    this.tabIndex = index;
  }

  loadCreateForm() {
    this.productOnSaleService.setSelectedProductOnSale(new ProductOnSale({}));
    this.productOnSaleService.setFormButtonGloss('Create');
    this.focusTab(1);
  }
}
