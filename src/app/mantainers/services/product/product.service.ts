import { Injectable } from '@angular/core';
import { Product } from '../../models/product';
import { HttpClient } from '@angular/common/http';
import { MatTabGroup } from '@angular/material/tabs';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private formButtonGlossSource = new BehaviorSubject('Create');
  public currentFormButtonGloss = this.formButtonGlossSource.asObservable();

  private productSource = new BehaviorSubject(new Product({}));
  public selectedProduct = this.productSource.asObservable();

  private productsSource = new BehaviorSubject<Product[]>([]);
  public products = this.productsSource.asObservable();


  constructor(private readonly httpClient: HttpClient) { }

  getAll() {
    return this.httpClient.get<Product[]>('http://localhost:3000/product');
  }

  getById(id: number) {
    return this.httpClient.get('http://localhost:3000/product/' + id);
  }

  create(product: Product) {
    return this.httpClient.post<Product>('http://localhost:3000/product', product);
  }

  update(id: number, product: Product) {
    return this.httpClient.patch('http://localhost:3000/product/' + id, product);
  }

  delete(id: number) {
    return this.httpClient.delete('http://localhost:3000/product/' + id);
  }

  setTabIndex(event: MatTabGroup) {
    event.selectedIndex = 1;
  }

  setSelectedProduct(product: Product) {
    this.productSource.next(product);
  }

  setFormButtonGloss(gloss: 'Create' | 'Update') {
    this.formButtonGlossSource.next(gloss);
  }

  setProducts(products: Product[]) {
    this.productsSource.next(products);
  }

  refreshProducts(): void {
    this.httpClient.get<Product[]>('http://localhost:3000/product').subscribe({
      next: (products) => this.productsSource.next(products),
      error: console.error,
      complete: () => console.debug('productService.refreshProducts finished')
    });
  }
}
