import { Component, OnInit } from '@angular/core';
import 'rxjs/add/observable/forkJoin';
import { DataService } from './data.service';

@Component({
  selector: 'nga-dashboard',
  styleUrls: ['./dashboard.component.scss'],
  templateUrl: 'dashboard.component.html',
})
export class DashboardComponent implements OnInit {
  public totals: any[] = [];
  public colorScheme = {
    domain: ['#00abff', '#e7ba08', '#8bd22f', '#f95372'],
  };

  constructor(private dataService: DataService) {
  }

  public ngOnInit() {
    this.dataService.getTotalItemsData()
      .subscribe((data) => {
        this.totals = data;
      });
  }
}
