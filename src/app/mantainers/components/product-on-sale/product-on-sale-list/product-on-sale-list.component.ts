import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { ProductOnSale } from 'src/app/mantainers/models/product-on-sale';
import { ProductOnSaleService } from 'src/app/mantainers/services/product-on-sale/product-on-sale.service';
import { ConfirmActionComponent } from '../../shared/confirm-action/confirm-action.component';

@Component({
  selector: 'app-product-on-sale-list',
  templateUrl: './product-on-sale-list.component.html',
  styleUrls: ['./product-on-sale-list.component.css']
})
export class ProductOnSaleListComponent implements OnInit {
  @Output() focusTabEvent = new EventEmitter<any>();

  message: string = '';

  public productsOnSale = new MatTableDataSource<ProductOnSale>([]);
  public displayedColumns: string[] = ['id', 'title', 'name', 'price', 'saleStartDatetime', 'saleEndDatetime', 'actions'];

  constructor(
    private readonly productOnSaleService: ProductOnSaleService,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.productOnSaleService.currentFormButtonGloss.subscribe(message => this.message = message);
    this.productOnSaleService.productOnSales.subscribe(productsOnSale => this.productsOnSale = new MatTableDataSource(productsOnSale));
    // An example to retrieve all the products on sale to the table.
    this.productOnSaleService.getAll().subscribe((data) => {
      console.log({ productOnSaleServiceGetAll: data });
      this.productsOnSale = new MatTableDataSource(data);
    });
  }

  loadEnterprises(productsOnSale: ProductOnSale[]) {
    this.productsOnSale = new MatTableDataSource(productsOnSale);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.productsOnSale.filter = filterValue.trim().toLowerCase();
  }

  updateProductOnSale(productOnSale: ProductOnSale) {
    this.productOnSaleService.getById(productOnSale.idProductOnSale).subscribe({
      next: (data) => this.productOnSaleService.setSelectedProductOnSale(data),
      error: console.error,
      complete: () => console.debug('updateProductOnSale completed')
    });
    this.productOnSaleService.setFormButtonGloss('Update');
    this.focusTabEvent.emit(1);
  }

  deleteProductOnSale(productOnSale: ProductOnSale) {
    const dialogRef = this.dialog.open(ConfirmActionComponent, { data: { name: productOnSale.title } });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.productOnSaleService.delete(productOnSale.idProductOnSale).subscribe({
          next: () => {
            this.productOnSaleService.refreshProductOnSales();
            this._snackBar.open(`Product on sale ${productOnSale.title} deleted`, 'Ok', {
              horizontalPosition: 'end',
              verticalPosition: 'top',
              duration: 5000
            });
          },
          error: console.error,
          complete: () => console.debug('productOnSaleService.delete finished')
        });
      }
    });
  }
}
