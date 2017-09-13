import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppTranslationModule } from '../../app.translation.module';
import { NgaModule } from '../../theme/nga.module';
import { NgxChartsModule } from '@swimlane/ngx-charts';


import { DashboardComponent } from './dashboard.component';
import { routing } from './dashboard.routing';

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
  ],
  providers: [],
})
export class DashboardModule {
}
