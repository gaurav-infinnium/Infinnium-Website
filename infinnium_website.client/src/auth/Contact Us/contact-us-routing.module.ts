import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
export { routes as contactUsRoutes } from './contact-us-routing.module';

export const routes: Routes = [
  {
    path: 'contactUs',
    loadComponent: () => import('./contact-us-layout/contact-us-layout.component').then(
      (m) => m.ContactUsLayoutComponent
    ),
    title: 'ContactUs',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ContactUsRoutingModule {}
