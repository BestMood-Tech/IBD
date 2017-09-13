import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppTranslationModule } from '../../app.translation.module';
import { NgaModule } from '../../theme/nga.module';
import { NgxChartsModule } from '@swimlane/ngx-charts';


import { DashboardComponent } from './dashboard.component';
import { routing } from './dashboard.routing';
import { DetailsComponent } from './details/details.component';
import { TotalComponent } from './total/total.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    AppTranslationModule,
    NgaModule,
    NgxChartsModule,
    routing,
  ],
  declarations: [
    DashboardComponent,
    DetailsComponent,
    TotalComponent
  ],
  providers: [],
})
export class DashboardModule {
}
