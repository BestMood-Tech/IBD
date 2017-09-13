import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';
import { DataService } from '../data.service';

@Component({
  selector: 'nga-details',
  templateUrl: 'details.component.html',
  styleUrls: ['details.component.scss'],
})

export class DetailsComponent implements OnInit {

  public channels: any[] = [];
  public pieChannels: any[] = [];


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
  public timeline = true;
  public curve = d3.curveNatural;
  public xAxisTickFormating = (x) => x.toLocaleTimeString();

  public colorScheme = {
    domain: ['#00abff', '#e7ba08', '#8bd22f', '#f95372'],
  };

  // line, area
  public autoScale = false;

  constructor(private dataService: DataService) {
  }

  public ngOnInit() {
    this.channels.push({ name: 'contacts', series: [] });
    this.dataService.getContactsRealtime()
      .subscribe((contacts) => {
      const now = new Date();
        this.channels[0].series.push(
          { name: now, value: contacts });
        if (this.channels[0].series.length > 15) {
          this.channels[0].series.shift();
        }
        this.channels = this.channels.slice();
      })
  }

  public onSelect(event) {
    console.log(event);
  }
}
