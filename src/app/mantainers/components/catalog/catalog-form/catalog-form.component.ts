import { Component, EventEmitter, Input, OnInit, Output, inject } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { Subscription } from 'rxjs';
import { Catalog } from 'src/app/mantainers/models/catalog';
import { CatalogService } from 'src/app/mantainers/services/catalog/catalog.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-catalog-form',
  templateUrl: './catalog-form.component.html',
  styleUrls: ['./catalog-form.component.css']
})
export class CatalogFormComponent implements OnInit {
  private formBuilder = inject(FormBuilder);

  @Output() focusTabEvent = new EventEmitter<any>();
  public catalog: Catalog = new Catalog({});
  public buttonGloss: string = '';
  public catalogForm = this.formBuilder.group({
    idProductCatalog: new FormControl(this.catalog.idProductCatalog),
    name: new FormControl(this.catalog.name, [Validators.required]),
  });

  constructor(
    private catalogService: CatalogService,
    private _location: Location,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.catalogService.currentFormButtonGloss.subscribe(gloss => this.buttonGloss = gloss);
    this.catalogService.selectedCatalog.subscribe((catalog: Catalog) => {
      this.catalog = catalog;
      this.catalogForm = this.formBuilder.group({
        idProductCatalog: new FormControl(this.catalog.idProductCatalog),
        name: new FormControl(this.catalog.name, [Validators.required]),
      });
      console.log('selectedCatalog', this.catalog);
    });
  }

  onBack() {
    this.focusTabEvent.emit({ index: 0, gloss: 'Create' });
  }

  onSubmit(): void {
    console.log('this.catalogForm.valid', this.catalogForm.valid);
    if (!this.catalogForm.valid) return;
    const catalog: Catalog = new Catalog(this.catalogForm.value);
    if (this.buttonGloss === 'Create') {
      this.catalogService.create(catalog).subscribe({
        next: (data) => {
          console.log('catalogService.create response', data);
          this._snackBar.open('Catalog created', 'Ok', {
            horizontalPosition: 'end',
            verticalPosition: 'top',
            duration: 5000
          });
        },
        error: (error) => {
          console.error('catalogService.create response', error);
          this._snackBar.open('Error on catalog creation', 'Ok', {
            horizontalPosition: 'end',
            verticalPosition: 'top',
            duration: 5000
          });
        },
        complete: () => console.log('catalogService.create finished')
      });
    } else if (this.buttonGloss === 'Update') {
      console.log({ toUpdate: catalog });
      this.catalogService.update(catalog.idProductCatalog, catalog).subscribe({
        next: (data) => {
          console.log('catalogService.update response', data);
          this._snackBar.open('Catalog updated', 'Ok', {
            horizontalPosition: 'end',
            verticalPosition: 'top',
            duration: 5000
          });
        },
        error: (error) => {
          console.error('catalogService.update response', error);
          this._snackBar.open('Error on catalog update', 'Ok', {
            horizontalPosition: 'end',
            verticalPosition: 'top',
            duration: 5000
          });
        },
        complete: () => console.log('catalogService.updated finished')
      });
    }
    this.catalogForm.reset();
    this.catalogService.refreshCatalogs();
    this.focusTabEvent.emit({ index: 0, gloss: 'Create' });
  }
}
