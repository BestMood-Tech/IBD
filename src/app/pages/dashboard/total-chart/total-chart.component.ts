import { Component, OnInit } from '@angular/core';
import { DataService } from '../../../shared/services/data.service';
import { Total } from '../../../shared/models/total.model';

interface TotalItem {
  icon: string;
  description: string;
  value: number;
}

@Component({
  selector: 'nga-total-chart',
  templateUrl: 'total-chart.component.html',
  styleUrls: ['total-chart.component.scss']
})
export class TotalChartComponent implements OnInit {
  public totals: TotalItem[] = [];
  private icons = {
    contacts: 'fa fa-commenting-o',
    responses: 'fa fa-book',
    accepts: 'fa fa-address-card-o',
    declines: 'fa fa-briefcase'
  };

  constructor(private dataService: DataService) {
  }

  public ngOnInit() {
    this.dataService.getTotalsData().subscribe((data: Total) => {
      for (const key in data) {
        this.totals.push({
          icon: this.icons[key],
          description: `total.${key}`,
          value: data[key]
        });
      }
    })
  }
}
