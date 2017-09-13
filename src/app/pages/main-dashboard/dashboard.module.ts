import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { AppTranslationModule } from '../../app.translation.module';
import { NgaModule } from '../../theme/nga.module';

import { DashboardComponent } from './dashboard.component';
import { routing } from './dashboard.routing';
import { DataService } from './data.service';
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
    TotalComponent,
  ],
  providers: [
    DataService,
  ],
})
export class DashboardModule {
}
