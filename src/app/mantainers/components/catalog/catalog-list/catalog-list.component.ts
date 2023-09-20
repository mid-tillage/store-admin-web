import { Component, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { Catalog } from 'src/app/mantainers/models/catalog';
import { CatalogService } from 'src/app/mantainers/services/catalog/catalog.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmActionComponent } from '../../shared/confirm-action/confirm-action.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-catalog-list',
  templateUrl: './catalog-list.component.html',
  styleUrls: ['./catalog-list.component.css']
})
export class CatalogListComponent implements OnInit, OnDestroy {
  @Output() focusTabEvent = new EventEmitter<any>();

  message: string = '';
  private catalogSubscription!: Subscription;
  private buttonGlossSubscription!: Subscription;

  public catalogs = new MatTableDataSource<Catalog>([]);
  public displayedColumns: string[] = ['id', 'name', 'actions'];

  constructor(
    private readonly catalogService: CatalogService,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.catalogSubscription = this.catalogService.currentFormButtonGloss.subscribe(message => this.message = message);
    this.buttonGlossSubscription = this.catalogService.catalogs.subscribe(catalogs => this.catalogs = new MatTableDataSource(catalogs));
    // An example to retrieve all the catalogs of the table.
    this.catalogService.getAll().subscribe((data) => {
      console.log({ catalogServiceGetAll: data });
      this.catalogs = new MatTableDataSource(data);
    });
  }

  ngOnDestroy(): void {
    this.catalogSubscription.unsubscribe();
    this.buttonGlossSubscription.unsubscribe();
  }

  loadCatalogs(catalogs: Catalog[]) {
    this.catalogs = new MatTableDataSource(catalogs);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.catalogs.filter = filterValue.trim().toLowerCase();
  }

  updateCatalog(catalog: Catalog) {
    this.catalogService.setSelectedCatalog(catalog);
    this.catalogService.setFormButtonGloss('Update');
    this.focusTabEvent.emit(1);
  }

  deleteCatalog(catalog: Catalog) {
    const dialogRef = this.dialog.open(ConfirmActionComponent, { data: { name: catalog.name } });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        console.log('delete catalog: ' + catalog.idProductCatalog);
        this.catalogService.delete(catalog.idProductCatalog).subscribe({
          next: () => {
            this.catalogService.refreshCatalogs();
            this._snackBar.open(`Catalog ${catalog.name} deleted`, 'Ok', {
              horizontalPosition: 'end',
              verticalPosition: 'top',
              duration: 5000
            });
          },
          error: console.error,
          complete: () => console.debug('catalogService.delete finished')
        });
      }
    });
  }
}
