import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Catalog } from '../../models/catalog';
import { MatTabGroup } from '@angular/material/tabs';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CatalogService {
  private formButtonGlossSource = new BehaviorSubject('Create');
  public currentFormButtonGloss = this.formButtonGlossSource.asObservable();

  private catalogSource = new BehaviorSubject(new Catalog({}));
  public selectedCatalog = this.catalogSource.asObservable();

  private catalogsSource = new BehaviorSubject<Catalog[]>([]);
  public catalogs = this.catalogsSource.asObservable();

  constructor(private readonly httpClient: HttpClient) {
  }

  getAll() {
    return this.httpClient.get<Catalog[]>('http://localhost:3000/catalog');
  }

  getById(id: number) {
    return this.httpClient.get('http://localhost:3000/catalog/' + id);
  }

  getByName(name: string) {
    return this.httpClient.post<Catalog>('http://localhost:3000/catalog/search', { name });
  }

  create(catalog: Catalog) {
    return this.httpClient.post<Catalog>('http://localhost:3000/catalog', catalog);
  }

  update(id: number, catalog: Catalog) {
    return this.httpClient.patch('http://localhost:3000/catalog/' + id, catalog);
  }

  delete(id: number) {
    return this.httpClient.delete('http://localhost:3000/catalog/' + id);
  }

  setTabIndex(event: MatTabGroup) {
    event.selectedIndex = 1;
  }

  setSelectedCatalog(catalog: Catalog) {
    this.catalogSource.next(catalog);
  }

  setFormButtonGloss(gloss: 'Create' | 'Update') {
    this.formButtonGlossSource.next(gloss);
  }

  setCatalogs(catalogs: Catalog[]) {
    this.catalogsSource.next(catalogs);
  }

  refreshCatalogs(): void {
    this.httpClient.get<Catalog[]>('http://localhost:3000/catalog').subscribe({
      next: (catalogs) => this.catalogsSource.next(catalogs),
      error: console.error,
      complete: () => console.debug('catalogService.refreshCatalogs finished')
    });
  }
}
