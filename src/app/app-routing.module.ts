import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './authentication/components/login/login.component';
import { LogoutComponent } from './authentication/components/logout/logout.component';
import { RegistrationFormComponent } from './authentication/components/registration-form/registration-form.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { AppComponent } from './app.component';
import { CatalogListComponent } from './mantainers/components/catalog/catalog-list/catalog-list.component';
import { CatalogFormComponent } from './mantainers/components/catalog/catalog-form/catalog-form.component';
import { CatalogContainerComponent } from './mantainers/components/catalog/catalog-container/catalog-container.component';
import { EnterpriseListComponent } from './mantainers/components/enterprise/enterprise-list/enterprise-list.component';
import { EnterpriseFormComponent } from './mantainers/components/enterprise/enterprise-form/enterprise-form.component';
import { EnterpriseContainerComponent } from './mantainers/components/enterprise/enterprise-container/enterprise-container.component';
import { ProductListComponent } from './mantainers/components/product/product-list/product-list.component';
import { ProductFormComponent } from './mantainers/components/product/product-form/product-form.component';
import { ProductContainerComponent } from './mantainers/components/product/product-container/product-container.component';
import { ProductOnSaleListComponent } from './mantainers/components/product-on-sale/product-on-sale-list/product-on-sale-list.component';
import { ProductOnSaleFormComponent } from './mantainers/components/product-on-sale/product-on-sale-form/product-on-sale-form.component';
import { ProductOnSaleContainerComponent } from './mantainers/components/product-on-sale/product-on-sale-container/product-on-sale-container.component';
const routes: Routes = [
  {
    path: 'auth',
    children: [
      {
        path: 'login',
        component: LoginComponent
      },
      {
        path: 'registration-form',
        component: RegistrationFormComponent
      },
      {
        path: 'logout',
        component: LogoutComponent
      }
    ]
  },
  {
    path: 'welcome',
    component: WelcomeComponent
  },
  {
    path: 'mantainers',
    children: [
      {
        path: 'catalog',
        children: [
          {
            path: 'dashboard',
            component: CatalogContainerComponent
          },
          {
            path: 'form',
            component: CatalogFormComponent
          },
          {
            path: 'list',
            component: CatalogListComponent
          },
        ]
      },
      {
        path: 'enterprise',
        children: [
          {
            path: 'dashboard',
            component: EnterpriseContainerComponent
          },
          {
            path: 'form',
            component: EnterpriseFormComponent
          },
          {
            path: 'list',
            component: EnterpriseListComponent
          },
        ]
      },
      {
        path: 'product',
        children: [
          {
            path: 'form',
            component: ProductFormComponent
          },
          {
            path: 'dashboard',
            component: ProductContainerComponent
          },
          {
            path: 'list',
            component: ProductListComponent
          },
        ]
      },
      {
        path: 'product-on-sale',
        children: [
          {
            path: 'dashboard',
            component: ProductOnSaleContainerComponent
          },
          {
            path: 'form',
            component: ProductOnSaleFormComponent
          },
          {
            path: 'list',
            component: ProductOnSaleListComponent
          },
        ]
      },
    ]
  },
  {
    path: '**',
    component: LoginComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
