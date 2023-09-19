import { Component } from '@angular/core';
import { Product } from 'src/app/mantainers/models/product';
import { ProductService } from 'src/app/mantainers/services/product/product.service';

@Component({
  selector: 'app-product-container',
  templateUrl: './product-container.component.html',
  styleUrls: ['./product-container.component.css']
})
export class ProductContainerComponent {
  constructor(private readonly productService: ProductService) { }
  public tabIndex: number = 0;

  focusTab(index: any) {
    this.tabIndex = index;
  }

  loadCreateForm() {
    this.productService.setSelectedProduct(new Product({}));
    this.productService.setFormButtonGloss('Create');
    this.focusTab(1);
  }
}
