import { Injectable } from '@angular/core';
import { ProductOnSale } from '../../models/product-on-sale';
import { HttpClient } from '@angular/common/http';
import { MatTabGroup } from '@angular/material/tabs';
import { BehaviorSubject } from 'rxjs';
import { Product } from '../../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductOnSaleService {
  private formButtonGlossSource = new BehaviorSubject('Create');
  public currentFormButtonGloss = this.formButtonGlossSource.asObservable();

  private productOnSaleSource = new BehaviorSubject(new ProductOnSale({}));
  public selectedProductOnSale = this.productOnSaleSource.asObservable();

  private productOnSalesSource = new BehaviorSubject<ProductOnSale[]>([]);
  public productOnSales = this.productOnSalesSource.asObservable();


  constructor(private readonly httpClient: HttpClient) { }

  getAll() {
    return this.httpClient.get<ProductOnSale[]>('http://localhost:3000/product-on-sale');
  }

  getById(id: number) {
    return this.httpClient.get<ProductOnSale>('http://localhost:3000/product-on-sale/' + id);
  }

  create(product: ProductOnSale) {
    return this.httpClient.post<ProductOnSale>('http://localhost:3000/product-on-sale', product);
  }

  update(id: number, product: ProductOnSale) {
    return this.httpClient.patch('http://localhost:3000/product-on-sale/' + id, product);
  }

  delete(id: number) {
    return this.httpClient.delete('http://localhost:3000/product-on-sale/' + id);
  }

  setTabIndex(event: MatTabGroup) {
    event.selectedIndex = 1;
  }

  setSelectedProductOnSale(productOnSale: ProductOnSale) {
    console.log('setSelectedProductOnSale', { productOnSale });
    this.productOnSaleSource.next(productOnSale);
  }

  setFormButtonGloss(gloss: 'Create' | 'Update') {
    this.formButtonGlossSource.next(gloss);
  }

  setProductsOnSale(products: ProductOnSale[]) {
    this.productOnSalesSource.next(products);
  }

  refreshProductOnSales(): void {
    this.httpClient.get<ProductOnSale[]>('http://localhost:3000/product-on-sale').subscribe({
      next: (products) => this.productOnSalesSource.next(products),
      error: console.error,
      complete: () => console.debug('productOnSaleService.refreshProductsOnSale finished')
    });
  }
}