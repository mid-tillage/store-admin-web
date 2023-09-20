import { Component, EventEmitter, OnDestroy, OnInit, Output, inject } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Subscription } from 'rxjs';
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
export class ProductOnSaleFormComponent implements OnInit, OnDestroy {
  @Output() focusTabEvent = new EventEmitter<any>();

  private formBuilder = inject(FormBuilder);
  private productOnSaleSubscription: Subscription;
  private buttonGlossSubscription!: Subscription;

  public productOnSale: ProductOnSale = new ProductOnSale({});
  public products: Product[] = [];
  public catalogs: Catalog[] = [];
  public buttonGloss: string = '';
  public productOnSaleForm = this.formBuilder.group({
    idProductOnSale: new FormControl(this.productOnSale.idProductOnSale),
    title: new FormControl(this.productOnSale.title, [Validators.required]),
    product: new FormControl(this.productOnSale.product?.idProduct, [Validators.required]),
    catalog: new FormControl(this.productOnSale.catalog?.idProductCatalog, [Validators.required]),
    price: new FormControl(this.productOnSale.price, [Validators.required]),
    saleStartDatetime: new FormControl(this.productOnSale.saleStartDatetime, [Validators.required, this.startDateValidator]),
    saleEndDatetime: new FormControl(this.productOnSale.saleEndDatetime, [Validators.required, this.endDateValidator]),
  });

  constructor(
    private productOnSaleService: ProductOnSaleService,
    private productService: ProductService,
    private catalogService: CatalogService,
    private _snackBar: MatSnackBar
  ) {
    this.productOnSaleSubscription = this.productOnSaleService.selectedProductOnSale.subscribe((productOnSale: ProductOnSale) => {
      this.productOnSale = productOnSale;
      this.productOnSaleForm = this.formBuilder.group({
        idProductOnSale: new FormControl(this.productOnSale.idProductOnSale),
        title: new FormControl(this.productOnSale.title, [Validators.required]),
        product: new FormControl(this.productOnSale.product?.idProduct, [Validators.required]),
        catalog: new FormControl(this.productOnSale.catalog?.idProductCatalog, [Validators.required]),
        price: new FormControl(this.productOnSale.price, [Validators.required]),
        saleStartDatetime: new FormControl(this.productOnSale.saleStartDatetime, [Validators.required, this.startDateValidator]),
        saleEndDatetime: new FormControl(this.productOnSale.saleEndDatetime, [Validators.required, this.endDateValidator]),
      });
    });
  }

  ngOnInit() {
    this.buttonGlossSubscription = this.productOnSaleService.currentFormButtonGloss.subscribe(gloss => this.buttonGloss = gloss );
    this.productService.getAll().subscribe((data) => {
      console.log({ productServiceGetAll: data });
      this.products = data;
    });
    this.catalogService.getAll().subscribe((data) => {
      console.log({ catalogServiceGetAll: data });
      this.catalogs = data;
    });
  }

  ngOnDestroy(): void {
    this.productOnSaleSubscription.unsubscribe();
    this.buttonGlossSubscription.unsubscribe();
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

  private startDateValidator(control: FormControl): { [s: string]: any } | null {
    if (control.value && control.value > new Date()) {
      return { startDateIsFuture: true };
    }
    return null;
  }

  private endDateValidator(control: FormControl): { [s: string]: any } | null {
    if (control.value && control.value < new Date()) {
      return { endDateIsPast: true };
    }
    return null;
  }
}