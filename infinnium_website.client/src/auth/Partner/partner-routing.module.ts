import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
export { routes as partnerRoutes } from './partner-routing.module';

export const routes: Routes = [
  {
    path: 'partner',
    loadComponent: () => import('./partner-layout/partner-layout.component').then(
      (m) => m.PartnerLayoutComponent
    ),
    title: 'Partner',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PartnerRoutingModule { }
