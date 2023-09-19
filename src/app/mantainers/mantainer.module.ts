import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';

import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSelectModule } from '@angular/material/select';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTableModule } from '@angular/material/table';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { CatalogListComponent } from './components/catalog/catalog-list/catalog-list.component';
import { CatalogFormComponent } from './components/catalog/catalog-form/catalog-form.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { EnterpriseFormComponent } from './components/enterprise/enterprise-form/enterprise-form.component';
import { EnterpriseContainerComponent } from './components/enterprise/enterprise-container/enterprise-container.component';
import { ProductListComponent } from './components/product/product-list/product-list.component';
import { ProductContainerComponent } from './components/product/product-container/product-container.component';
import { ProductFormComponent } from './components/product/product-form/product-form.component';
import { ProductOnSaleFormComponent } from './components/product-on-sale/product-on-sale-form/product-on-sale-form.component';
import { CatalogContainerComponent } from './components/catalog/catalog-container/catalog-container.component';
import { MatIconModule } from '@angular/material/icon';
import { CatalogSearchComponent } from './components/catalog/catalog-search/catalog-search.component';
import { MatDividerModule } from '@angular/material/divider';
import { ConfirmActionComponent } from './components/shared/confirm-action/confirm-action.component';
import { EnterpriseListComponent } from './components/enterprise/enterprise-list/enterprise-list.component';
import { ProductOnSaleContainerComponent } from './components/product-on-sale/product-on-sale-container/product-on-sale-container.component';
import { ProductOnSaleListComponent } from './components/product-on-sale/product-on-sale-list/product-on-sale-list.component';



@NgModule({
  declarations: [
    CatalogContainerComponent, CatalogListComponent, CatalogFormComponent,
    EnterpriseContainerComponent, EnterpriseListComponent, EnterpriseFormComponent,
    ProductContainerComponent, ProductListComponent, ProductFormComponent,
    ProductOnSaleContainerComponent, ProductOnSaleListComponent, ProductOnSaleFormComponent,
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
    MatFormFieldModule,
    FormsModule,
    MatProgressBarModule,
    MatSnackBarModule,
    MatSelectModule,
    MatTabsModule,
    MatTableModule,
    MatDatepickerModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    HttpClientModule
  ]
})
export class MantainerModule { }
