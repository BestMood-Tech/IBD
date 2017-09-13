import { Component, OnInit } from '@angular/core';
import { DataService } from './data.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/forkJoin';

@Component({
  selector: 'ngt-dashboard',
  styleUrls: ['./dashboard.scss'],
  templateUrl: './dashboard.html',
  providers: [DataService],
})
export class DashboardComponent implements OnInit {
  public channels: any[] = [];


  public view: any[] = [1000, 400];

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

  constructor(private dataService: DataService) {
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
    });
  }

  public onSelect(event) {
    console.log(event);
  }

}
