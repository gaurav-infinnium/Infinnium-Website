import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
export { routes as productRoutingModule } from './product-routing.module';

export const routes: Routes = [
  {
    path: 'products',
    children: [
      {
        path: '4ig',
        loadComponent: () =>
          import(
            './4ig-Product/product-layout/product-layout.component'
          ).then((m) => m.ProductLayoutComponent),
        title: 'Products - Infinnium',
      },
      {
        path: 'breach-profiler',
        loadComponent: () =>
          import(
            './Breach Profiler/product2-layout/product2-layout.component'
          ).then((m) => m.Product2LayoutComponent),
        title: 'Products - Infinnium',
      },
      {
        path: 'obscure-pi',
        loadComponent: () =>
          import('./Obscure PI/product3-layout/product3-layout.component').then(
            (m) => m.Product3LayoutComponent
          ),
        title: 'Products - Infinnium',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductRoutingModule {}
