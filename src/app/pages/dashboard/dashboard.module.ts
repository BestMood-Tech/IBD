import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppTranslationModule } from '../../app.translation.module';
import { NgaModule } from '../../theme/nga.module';
import { Calendar } from './calendar';
import { CalendarService } from './calendar/calendar.service';

import { Dashboard } from './dashboard.component';
import { routing } from './dashboard.routing';
import { Feed } from './feed';
import { FeedService } from './feed/feed.service';
import { LineChart } from './lineChart';
import { LineChartService } from './lineChart/lineChart.service';
import { PieChartComponent } from './pieChart';
import { PieChartService } from './pieChart/pieChart.service';

import { PopularApp } from './popularApp';
import { Todo } from './todo';
import { TodoService } from './todo/todo.service';
import { TrafficChart } from './trafficChart';
import { TrafficChartService } from './trafficChart/trafficChart.service';
import { UsersMap } from './usersMap';
import { UsersMapService } from './usersMap/usersMap.service';
import { TotalChartComponent } from './total-chart/total-chart.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    AppTranslationModule,
    NgaModule,
    routing
  ],
  declarations: [
    PopularApp,
    PieChartComponent,
    TotalChartComponent,
    TrafficChart,
    UsersMap,
    LineChart,
    Feed,
    Todo,
    Calendar,
    Dashboard
  ],
  providers: [
    CalendarService,
    FeedService,
    LineChartService,
    PieChartService,
    TodoService,
    TrafficChartService,
    UsersMapService
  ]
})
export class DashboardModule {
}
