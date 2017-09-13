import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/forkJoin';
import { Router } from '@angular/router';

@Component({
  selector: 'nga-total',
  templateUrl: 'total.component.html',
  styleUrls: ['total.component.scss'],
})

export class TotalComponent implements OnInit {
  public channels: any[] = [];
  public pieChannels: any[] = [];
  public totals: any[] = [];

  public view: any[] = [1000, 400];
  public pieView: any[] = [1000, 200];
  // options
  public showXAxis = true;
  public showYAxis = true;
  public gradient = false;
  public showLegend = true;
  public showXAxisLabel = true;
  public xAxisLabel = 'Hours';
  public showYAxisLabel = true;
  public yAxisLabel = 'Number';

  public colorScheme = {
    domain: ['#00abff', '#e7ba08', '#8bd22f', '#f95372'],
  };

  // line, area
  public autoScale = true;

  constructor(private dataService: DataService,
              private router: Router) {
  }

  public ngOnInit() {
    Observable.forkJoin(
      this.dataService.getContacts(),
      this.dataService.getResponses(),
      this.dataService.getAccepts(),
      this.dataService.getDeclines(),
    ).subscribe(response => {
      this.channels = response.map((series, i) => {
        let name: string;
        switch (i) {
          case 0:
            name = 'Contacts';
            break;
          case 1:
            name = 'Responses';
            break;
          case 2:
            name = 'Accepts';
            break;
          case 3:
            name = 'Declines';
            break;
          default:
            name = '';
        }
        return {
          name,
          series: series.map((val, index) => ({ name: index, value: val })),
        };
      });
      this.pieChannels = this.channels
        .map((channel) => ({ name: channel.name, value: channel.series[0].value }));
    });

    this.dataService.getTotalItemsData()
      .subscribe((data) => this.totals = data);
  }

  public onSelect(event) {
    console.log(event);
  }

  public goToDetails(channel) {
    this.router.navigate(['pages/dashboard/', channel]);
  }

}
