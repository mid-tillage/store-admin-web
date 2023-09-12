import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatalogContainerComponent } from './catalog-container.component';

describe('CatalogDashboardComponent', () => {
  let component: CatalogContainerComponent;
  let fixture: ComponentFixture<CatalogContainerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CatalogContainerComponent]
    });
    fixture = TestBed.createComponent(CatalogContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
