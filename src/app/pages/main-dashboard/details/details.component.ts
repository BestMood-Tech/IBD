import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../data.service';
import * as d3 from 'd3';
import 'rxjs/add/operator/mergeMap';

@Component({
  selector: 'nga-details',
  templateUrl: 'details.component.html',
  styleUrls: ['details.component.scss'],
})

export class DetailsComponent implements OnInit {

  public pieChannels: any[] = [];
  public pieView: any[] = [1000, 200];
  public colorScheme = {
    domain: ['#00abff', '#e7ba08', '#8bd22f', '#f95372'],
  };
  public colorSchemeChart = {
    domain: []
  };

  public channel: string = '';
  public status = 'online';

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
  public timeline = true;
  public curve = d3.curveNatural;
  public xAxisTickFormatting = (x) => x.toLocaleTimeString();

  // line, area
  public autoScale = false;

  constructor(private route: ActivatedRoute,
              private dataService: DataService) {
  }

  public ngOnInit() {
    this.route.params.mergeMap((params: { channel: string }) => {
      this.channel = params.channel;
      this.channels.push({ name: this.channel, series: [] });
      switch (this.channel) {
        case 'contacts':
          this.colorSchemeChart.domain.push(this.colorScheme.domain[0]);
          return this.dataService.getContactsRealtime();
        case 'responses':
          this.colorSchemeChart.domain.push(this.colorScheme.domain[1]);
          return this.dataService.getResponsesRealtime();
        case 'accepts':
          this.colorSchemeChart.domain.push(this.colorScheme.domain[2]);
          return this.dataService.getAcceptsRealtime();
        case 'declines':
          this.colorSchemeChart.domain.push(this.colorScheme.domain[3]);
          return this.dataService.getDeclinesRealtime();
      }
    })
      .subscribe((value) => {
        this.channels[0].series.push(
          { name: new Date(), value });
        if (this.channels[0].series.length > 15) {
          this.channels[0].series.shift();
        }
        this.channels = this.channels.slice();
      });

    this.dataService.getTotalItemsData().subscribe((data) => {
      this.pieChannels = data.map((item) => ({ name: item.name, value: item.value }));
    });
  }

  public onSelect(event) {
    console.log(event);
  }
}
