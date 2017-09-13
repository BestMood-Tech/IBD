import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from './dashboard.component';
import { ModuleWithProviders } from '@angular/core';
import { DetailsComponent } from './details/details.component';

// noinspection TypeScriptValidateTypes
export const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      // { path: 'details/:id', component: DetailsComponent }
    ],
  },
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
