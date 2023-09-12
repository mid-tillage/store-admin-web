import { Component, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { CatalogService } from 'src/app/mantainers/services/catalog/catalog.service';
import { LoadingService } from 'src/app/shared/services/loading/loading.service';

@Component({
  selector: 'app-catalog-search',
  templateUrl: './catalog-search.component.html',
  styleUrls: ['./catalog-search.component.css']
})
export class CatalogSearchComponent {
  private formBuilder = inject(FormBuilder);
  
  public progressBar = false;
  public searchForm = this.formBuilder.group({
    name: [null, Validators.nullValidator]
  });

  constructor(
    private readonly catalogService: CatalogService
  ) { }

  onSubmit(): void {
    this.progressBar = true;
    this.catalogService.getByName(this.searchForm.value.name!).subscribe({
      next: (catalog) => this.catalogService.setCatalogs([catalog]),
      error: console.error,
      complete: () =>{
        console.debug('catalogService.getByName process completed');
        this.progressBar = false;
      }
    });
  }
}
