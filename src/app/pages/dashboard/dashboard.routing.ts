import { Routes, RouterModule } from '@angular/router';

import { Dashboard } from './dashboard.component';
import { ModuleWithProviders } from '@angular/core';
import { DetailsComponent } from './details/details.component';
import { TotalsComponent } from './totals/totals.component';

// noinspection TypeScriptValidateTypes
export const routes: Routes = [
  { path: 'details', component: DetailsComponent },
  {
    path: '', component: Dashboard, children: [
    { path: '', redirectTo: 'totals', pathMatch: 'full' },
    { path: 'totals', component: TotalsComponent }
  ]
  }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
