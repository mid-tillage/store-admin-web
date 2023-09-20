import { Component, EventEmitter, OnInit, Output, inject } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Catalog } from 'src/app/mantainers/models/catalog';
import { Product } from 'src/app/mantainers/models/product';
import { ProductOnSale } from 'src/app/mantainers/models/product-on-sale';
import { CatalogService } from 'src/app/mantainers/services/catalog/catalog.service';
import { ProductOnSaleService } from 'src/app/mantainers/services/product-on-sale/product-on-sale.service';
import { ProductService } from 'src/app/mantainers/services/product/product.service';

@Component({
  selector: 'app-product-on-sale-form',
  templateUrl: './product-on-sale-form.component.html',
  styleUrls: ['./product-on-sale-form.component.css']
})
export class ProductOnSaleFormComponent implements OnInit {
  // public selectedCatalog: number = 1;
  // public selectedProduct: Product = new Product({});
  private formBuilder = inject(FormBuilder);

  @Output() focusTabEvent = new EventEmitter<any>();
  public productOnSale: ProductOnSale = new ProductOnSale({});
  public buttonGloss: string = '';
  public productOnSaleForm = this.formBuilder.group({
    idProductOnSale: new FormControl(this.productOnSale.idProductOnSale),
    title: new FormControl(this.productOnSale.title, [Validators.required]),
    product: new FormControl(this.productOnSale.product?.idProduct, [Validators.required]),
    catalog: new FormControl(this.productOnSale.catalog?.idProductCatalog, [Validators.required]),
    price: new FormControl(this.productOnSale.price, [Validators.required]),
    saleStartDatetime: new FormControl(this.productOnSale.saleStartDatetime, [Validators.required]),
    saleEndDatetime: new FormControl(this.productOnSale.saleEndDatetime, [Validators.required]),
  });

  public products: Product[] = [];
  public catalogs: Catalog[] = [];

  constructor(
    private productOnSaleService: ProductOnSaleService,
    private productService: ProductService,
    private catalogService: CatalogService,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.productOnSaleService.currentFormButtonGloss.subscribe(gloss => this.buttonGloss = gloss);
    this.productService.getAll().subscribe((data) => {
      console.log({ productServiceGetAll: data });
      this.products = data;
    });
    this.catalogService.getAll().subscribe((data) => {
      console.log({ catalogServiceGetAll: data });
      this.catalogs = data;
    });
    // this.productOnSaleForm.controls["product"].valueChanges.subscribe((product) => {
    //   this.selectedProduct = this.products.find((p) => p.idProduct === product?.idProduct) || new Product({});
    // });
    this.productOnSaleService.selectedProductOnSale.subscribe((productOnSale: ProductOnSale) => {
      console.log('this.productOnSaleService.selectedProductOnSale', productOnSale);
      this.productOnSale = productOnSale;
      this.productOnSaleForm = this.formBuilder.group({
        idProductOnSale: new FormControl(this.productOnSale.idProductOnSale),
        title: new FormControl(this.productOnSale.title, [Validators.required]),
        product: new FormControl(this.productOnSale.product?.idProduct, [Validators.required]),
        catalog: new FormControl(this.productOnSale.catalog?.idProductCatalog, [Validators.required]),
        price: new FormControl(this.productOnSale.price, [Validators.required]),
        saleStartDatetime: new FormControl(this.productOnSale.saleStartDatetime, [Validators.required]),
        saleEndDatetime: new FormControl(this.productOnSale.saleEndDatetime, [Validators.required]),
      });
      console.log('selectedProductOnSale', this.productOnSale);
      // this.selectedCatalog = productOnSale.catalog;
      // this.selectedProduct = productOnSale.product;
    });
  }

  onBack() {
    this.focusTabEvent.emit({ index: 0, gloss: 'Create' });
  }

  onSubmit(): void {
    console.log('this.productOnSaleService.valid', this.productOnSaleForm.valid);
    if (!this.productOnSaleForm.valid) return;
    const productOnSale: ProductOnSale = new ProductOnSale(this.productOnSaleForm.value);
    if (this.buttonGloss === 'Create') {
      this.productOnSaleService.create(productOnSale).subscribe({
        next: (data) => {
          console.log('productOnSaleService.create response', data);
          this._snackBar.open('ProductOnSale created', 'Ok', {
            horizontalPosition: 'end',
            verticalPosition: 'top',
            duration: 5000
          });
        },
        error: (error) => {
          console.error('productOnSaleService.create response', error);
          this._snackBar.open('Error on productOnSale creation', 'Ok', {
            horizontalPosition: 'end',
            verticalPosition: 'top',
            duration: 5000
          });
        },
        complete: () => console.log('productOnSaleService.create finished')
      });
    } else if (this.buttonGloss === 'Update') {
      console.log({ toUpdate: productOnSale });
      this.productOnSaleService.update(productOnSale.idProductOnSale, productOnSale).subscribe({
        next: (data) => {
          console.log('productOnSaleService.update response', data);
          this._snackBar.open('ProductOnSale updated', 'Ok', {
            horizontalPosition: 'end',
            verticalPosition: 'top',
            duration: 5000
          });
        },
        error: (error) => {
          console.error('productOnSaleService.update response', error);
          this._snackBar.open('Error on productOnSale update', 'Ok', {
            horizontalPosition: 'end',
            verticalPosition: 'top',
            duration: 5000
          });
        },
        complete: () => console.log('productOnSaleService.updated finished')
      });
    }
    this.productOnSaleForm.reset();
    this.productOnSaleService.refreshProductOnSales();
    this.focusTabEvent.emit({ index: 0, gloss: 'Create' });
  }
}