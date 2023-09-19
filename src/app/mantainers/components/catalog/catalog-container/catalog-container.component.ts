import { Component, Input, ViewChild } from '@angular/core';
import { Catalog } from 'src/app/mantainers/models/catalog';
import { CatalogService } from 'src/app/mantainers/services/catalog/catalog.service';

@Component({
  selector: 'app-catalog-container',
  templateUrl: './catalog-container.component.html',
  styleUrls: ['./catalog-container.component.css']
})
export class CatalogContainerComponent {
  public tabIndex: number = 0;

  constructor(private readonly catalogService: CatalogService) { }

  focusTab(index: any) {
    this.tabIndex = index;
  }

  loadCreateForm() {
    this.catalogService.setSelectedCatalog(new Catalog({}));
    this.catalogService.setFormButtonGloss('Create');
    this.focusTab(1);
  }
}
