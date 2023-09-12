import { AfterViewInit, Component, ViewChild, Output, EventEmitter, OnInit } from '@angular/core';
import { MatTabGroup } from '@angular/material/tabs';
import { Catalog } from 'src/app/mantainers/models/catalog';
import { CatalogService } from 'src/app/mantainers/services/catalog/catalog.service';
import { CatalogContainerComponent } from '../catalog-container/catalog-container.component';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmActionComponent } from '../../shared/confirm-action/confirm-action.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-catalog-list',
  templateUrl: './catalog-list.component.html',
  styleUrls: ['./catalog-list.component.css']
})
export class CatalogListComponent implements OnInit {
  @Output() focusTabEvent = new EventEmitter<any>();

  message: string = '';

  public catalogs = new MatTableDataSource<Catalog>([]);
  public displayedColumns: string[] = ['id', 'name', 'actions'];

  constructor(
    private readonly catalogService: CatalogService,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.catalogService.currentFormButtonGloss.subscribe(message => this.message = message);
    this.catalogService.catalogs.subscribe(catalogs => this.catalogs = new MatTableDataSource(catalogs));
    // An example to retrieve all the catalogs of the table.
    this.catalogService.getAll().subscribe((data) => {
      console.log({ catalogServiceGetAll: data });
      this.catalogs = new MatTableDataSource(data);
    });
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
