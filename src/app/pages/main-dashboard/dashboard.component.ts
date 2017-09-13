import { Component } from '@angular/core';
import 'rxjs/add/observable/forkJoin';
import { DataService } from './data.service';

@Component({
  selector: 'ngt-dashboard',
  styleUrls: ['./dashboard.component.scss'],
  template: '<router-outlet></router-outlet>',
})
export class DashboardComponent {

}
