import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from './dashboard.component';
import { ModuleWithProviders } from '@angular/core';
import { DetailsComponent } from './details/details.component';
import { TotalComponent } from './total/total.component';

export const routes: Routes = [
  {
    path: '', component: DashboardComponent,
    children: [
      { path: 'total', component: TotalComponent },
      { path: ':channel', component: DetailsComponent },
      { path: '', redirectTo: 'total', pathMatch: 'full' },
    ],
  },
];
export const routing: ModuleWithProviders = RouterModule.forChild(routes);
