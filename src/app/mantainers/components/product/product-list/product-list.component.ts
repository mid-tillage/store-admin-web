import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Product } from 'src/app/mantainers/models/product';
import { ProductService } from 'src/app/mantainers/services/product/product.service';
import { ConfirmActionComponent } from '../../shared/confirm-action/confirm-action.component';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  @Output() focusTabEvent = new EventEmitter<any>();

  message: string = '';

  public products = new MatTableDataSource<Product>([]);
  public displayedColumns: string[] = ['id', 'name', 'actions'];

  constructor(
    private readonly productService: ProductService,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.productService.currentFormButtonGloss.subscribe(message => this.message = message);
    this.productService.products.subscribe(products => this.products = new MatTableDataSource(products));
    // An example to retrieve all the products of the table.
    this.productService.getAll().subscribe((data) => {
      console.log({ productServiceGetAll: data });
      this.products = new MatTableDataSource(data);
    });
  }

  loadEnterprises(products: Product[]) {
    this.products = new MatTableDataSource(products);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.products.filter = filterValue.trim().toLowerCase();
  }

  updateProduct(enteprises: Product) {
    this.productService.setSelectedProduct(enteprises);
    this.productService.setFormButtonGloss('Update');
    this.focusTabEvent.emit(1);
  }

  deleteProduct(product: Product) {
    const dialogRef = this.dialog.open(ConfirmActionComponent, { data: { name: product.name } });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.productService.delete(product.idProduct).subscribe({
          next: () => {
            this.productService.refreshProducts();
            this._snackBar.open(`Product ${product.name} deleted`, 'Ok', {
              horizontalPosition: 'end',
              verticalPosition: 'top',
              duration: 5000
            });
          },
          error: console.error,
          complete: () => console.debug('productService.delete finished')
        });
      }
    });
  }
}
