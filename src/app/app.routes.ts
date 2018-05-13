import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { ProductsComponent } from './components/products/products.component';
import { ProductComponent } from './components/products/product.component';

const app_routes: Routes = [
  { path: 'products', component: ProductsComponent },
  { path: 'product/:id', component: ProductComponent },
  { path: '**', pathMatch: 'full', redirectTo: 'products' }
];

export const APP_ROUTING = RouterModule.forRoot(app_routes);
