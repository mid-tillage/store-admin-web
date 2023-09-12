import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTableModule } from '@angular/material/table';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { CatalogListComponent } from './components/catalog/catalog-list/catalog-list.component';
import { CatalogFormComponent } from './components/catalog/catalog-form/catalog-form.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { EnterpriseFormComponent } from './components/enterprise/enterprise-form/enterprise-form.component';
import { EnterpriseDashboardComponent } from './components/enterprise/enterprise-dashboard/enterprise-dashboard.component';
import { ProductListComponent } from './components/product/product-list/product-list.component';
import { ProductDashboardComponent } from './components/product/product-dashboard/product-dashboard.component';
import { ProductFormComponent } from './components/product/product-form/product-form.component';
import { ProductOnSaleFormComponent } from './components/product-on-sale/product-on-sale-form/product-on-sale-form.component';
import { CatalogContainerComponent } from './components/catalog/catalog-container/catalog-container.component';
import { MatIconModule } from '@angular/material/icon';
import { CatalogSearchComponent } from './components/catalog/catalog-search/catalog-search.component';
import { MatDividerModule } from '@angular/material/divider';
import { ConfirmActionComponent } from './components/shared/confirm-action/confirm-action.component';



@NgModule({
  declarations: [
    CatalogContainerComponent, CatalogListComponent, CatalogFormComponent,
    EnterpriseFormComponent, EnterpriseDashboardComponent,
    ProductListComponent, ProductDashboardComponent, ProductFormComponent,
    ProductOnSaleFormComponent,
    CatalogSearchComponent,
    ConfirmActionComponent],
  imports: [
    CommonModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatProgressBarModule,
    MatSnackBarModule,
    MatTabsModule,
    MatTableModule,
    ReactiveFormsModule,
    HttpClientModule
  ]
})
export class MantainerModule { }
