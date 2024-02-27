import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AddProductComponent } from './add-product/add-product.component';
import { ProductListComponent } from './product-list/product-list.component';

const AdminRoutes: Routes = [
  { path: "", component: ProductListComponent },
  { path: "admin", component: AddProductComponent },
]

export const adminRouting = RouterModule.forChild(AdminRoutes)

