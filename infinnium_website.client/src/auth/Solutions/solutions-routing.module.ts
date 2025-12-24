import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
export { routes as solutionRoutes } from './solutions-routing.module';

export const routes: Routes = [
  {
    path: 'solutions',
    children: [
      {
        path: 'breach-response',
        loadComponent: () =>
          import('./breachResponse/solution1-layout/solution1-layout.component').then(
            (m) => m.Solution1LayoutComponent
          ),
        title: 'Breach Response',
      },
      {
        path: 'unified-information-governance',
        loadComponent: () =>
          import('./UIG/solution2-layout/solution2-layout.component').then(
            (m) => m.Solution2LayoutComponent
          ),
        title: 'Unified Information Governance',
      },
      {
        path: 'data-protection',
        loadComponent: () =>
          import('./DSAR/solution3-layout/solution3-layout.component').then(
            (m) => m.Solution3LayoutComponent
          ),
        title: 'Data Protection',
      },
      {
        path: 'eDiscovery',
        loadComponent: () =>
          import(
            './eDiscovery/solution4-layout/solution4-layout.component'
          ).then((m) => m.Solution4LayoutComponent),
        title: 'eDiscovery',
      },
      {
        path: 'automated-redaction',
        loadComponent: () =>
          import(
            './AutomatedRedaction/solution5-layout/solution5-layout.component'
          ).then((m) => m.Solution5LayoutComponent),
        title: 'Automated Redaction',
      },
      {
        path: 'data-mapping',
        loadComponent: () =>
          import(
            './DataMapping/solution6-layout/solution6-layout.component'
          ).then((m) => m.Solution6LayoutComponent),
        title: 'Data Mapping',
      },
      {
        path: 'data-retention',
        loadComponent: () =>
          import(
            './DataRetention/solution7-layout/solution7-layout.component'
          ).then((m) => m.Solution7LayoutComponent),
        title: 'Data Retention',
      },
      {
        path: 'unified-archival',
        loadComponent: () =>
          import(
            './UnifiedArchival/solution8-layout/solution8-layout.component'
          ).then((m) => m.Solution8LayoutComponent),
        title: 'Unified Archival',
      },
      {
        path: 'data-disposition',
        loadComponent: () =>
          import(
            './DataDiposition/solution9-layout/solution9-layout.component'
          ).then((m) => m.Solution9LayoutComponent),
        title: 'Data Disposition',
      },
      {
        path: 'legal-hold',
        loadComponent: () =>
          import(
            './LegalHold/solution10-layout/solution10-layout.component'
          ).then((m) => m.Solution10LayoutComponent),
        title: 'Legal Hold',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SolutionsRoutingModule {}
