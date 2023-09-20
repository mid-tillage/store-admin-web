import { Component, EventEmitter, OnDestroy, OnInit, Output, inject } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { Enterprise } from 'src/app/mantainers/models/enterprise';
import { Product } from 'src/app/mantainers/models/product';
import { EnterpriseService } from 'src/app/mantainers/services/enterprise/enterprise.service';
import { ProductService } from 'src/app/mantainers/services/product/product.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit, OnDestroy {
  @Output() focusTabEvent = new EventEmitter<any>();

  private formBuilder = inject(FormBuilder);
  private productSubscription!: Subscription;
  private buttonGlossSubscription!: Subscription;

  public product: Product = new Product({});
  public enterprises: Enterprise[] = [];
  public buttonGloss: string = '';
  public productForm = this.formBuilder.group({
    idProduct: new FormControl(this.product.idProduct),
    name: new FormControl(this.product.name, [Validators.required]),
    description: new FormControl(this.product.description, [Validators.required]),
    enterprise: new FormControl(this.product.enterprise?.idEnterprise, [Validators.required]),
  });

  constructor(
    private productService: ProductService,
    private readonly enterpriseService: EnterpriseService,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.productService.currentFormButtonGloss.subscribe(gloss => this.buttonGloss = gloss);
    this.enterpriseService.getAll().subscribe((data) => {
      console.log({ enterpriseServiceGetAll: data });
      this.enterprises = data;
    });
    this.productSubscription = this.productService.selectedProduct.subscribe((product: Product) => {
      this.product = product;
      this.productForm = this.formBuilder.group({
        idProduct: new FormControl(this.product.idProduct),
        name: new FormControl(this.product.name, [Validators.required]),
        description: new FormControl(this.product.description, [Validators.required]),
        enterprise: new FormControl(this.product.enterprise?.idEnterprise, [Validators.required]),
      });
    });
  }

  ngOnDestroy(): void {
    this.productSubscription.unsubscribe();
    this.buttonGlossSubscription.unsubscribe();
  }

  onBack() {
    this.focusTabEvent.emit({ index: 0, gloss: 'Create' });
  }

  onSubmit(): void {
    console.log('this.productService.valid', this.productForm.valid);
    if (!this.productForm.valid) return;
    const product: Product = new Product(this.productForm.value);
    if (this.buttonGloss === 'Create') {
      this.productService.create(product).subscribe({
        next: (data) => {
          console.log('productService.create response', data);
          this._snackBar.open('Product created', 'Ok', {
            horizontalPosition: 'end',
            verticalPosition: 'top',
            duration: 5000
          });
        },
        error: (error) => {
          console.error('productService.create response', error);
          this._snackBar.open('Error on product creation', 'Ok', {
            horizontalPosition: 'end',
            verticalPosition: 'top',
            duration: 5000
          });
        },
        complete: () => console.log('productService.create finished')
      });
    } else if (this.buttonGloss === 'Update') {
      console.log({ toUpdate: product });
      this.productService.update(product.idProduct, product).subscribe({
        next: (data) => {
          console.log('productService.update response', data);
          this._snackBar.open('Product updated', 'Ok', {
            horizontalPosition: 'end',
            verticalPosition: 'top',
            duration: 5000
          });
        },
        error: (error) => {
          console.error('productService.update response', error);
          this._snackBar.open('Error on product update', 'Ok', {
            horizontalPosition: 'end',
            verticalPosition: 'top',
            duration: 5000
          });
        },
        complete: () => console.log('productService.updated finished')
      });
    }
    this.productForm.reset();
    this.productService.refreshProducts();
    this.focusTabEvent.emit({ index: 0, gloss: 'Create' });
  }
}