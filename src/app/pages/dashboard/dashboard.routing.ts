import { Routes, RouterModule } from '@angular/router';

import { Dashboard } from './dashboard.component';
import { ModuleWithProviders } from '@angular/core';
import { DetailsComponent } from './details/details.component';

// noinspection TypeScriptValidateTypes
export const routes: Routes = [
  {
    path: '', component: Dashboard, children: [
    { path: 'details', component: DetailsComponent }
  ]
  }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
