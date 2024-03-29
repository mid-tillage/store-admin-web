import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatalogSearchComponent } from './catalog-search.component';

describe('CatalogSearchComponent', () => {
  let component: CatalogSearchComponent;
  let fixture: ComponentFixture<CatalogSearchComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CatalogSearchComponent]
    });
    fixture = TestBed.createComponent(CatalogSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
