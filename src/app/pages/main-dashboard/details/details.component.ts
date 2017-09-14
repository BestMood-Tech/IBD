import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../data.service';
import * as d3 from 'd3';
import 'rxjs/add/operator/mergeMap';
import { Total } from '../../../shared/models/total.model';

@Component({
  selector: 'nga-details',
  templateUrl: 'details.component.html',
  styleUrls: ['details.component.scss'],
})

export class DetailsComponent implements OnInit {
  public channel: string = '';
  public status = 'online';

  public pieChannels = [];
  public pieView = [1000, 200];
  public colorScheme = {
    domain: ['#00abff', '#e7ba08', '#8bd22f', '#f95372'],
  };

  public colorSchemeChartRealtime = {
    domain: [],
  };
  public colorSchemeChart = {
    domain: [],
  };


  public channels = [];

  public selectedChannel;
  public currentChannel = [];

  public view = [1000, 400];
  // options
  public showXAxis = true;
  public showYAxis = true;
  public gradient = false;
  public showLegend = false;
  public showXAxisLabel = true;
  public xAxisLabel = 'Period';
  public showYAxisLabel = true;
  public yAxisLabel = 'Number';
  public timeline = true;
  public curve = d3.curveNatural;
  public xAxisTickFormatting = (x) => x.toLocaleTimeString();

  // line, area
  public autoScale = false;

  // buttons
  public zoomPeriods: string[];
  public currentPeriod: string;

  constructor(private route: ActivatedRoute,
              private dataService: DataService) {
  }

  public ngOnInit() {
    this.zoomPeriods = this.dataService.zoomPeriods;
    this.currentPeriod = this.zoomPeriods[0];
    this.route.params.mergeMap((params: { channel: string }) => {
      this.channel = params.channel;
      this.channels.push({ name: this.channel, series: [] });
      switch (this.channel) {
        case 'contacts':
          this.colorSchemeChartRealtime.domain.push(this.colorScheme.domain[0]);
          return this.dataService.getContactsRealtime();
        case 'responses':
          this.colorSchemeChartRealtime.domain.push(this.colorScheme.domain[1]);
          return this.dataService.getResponsesRealtime();
        case 'accepts':
          this.colorSchemeChartRealtime.domain.push(this.colorScheme.domain[2]);
          return this.dataService.getAcceptsRealtime();
        case 'declines':
          this.colorSchemeChartRealtime.domain.push(this.colorScheme.domain[3]);
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
    this.selectedChannel = event.name;
    this.zoomGraph(this.currentPeriod);
  }

  public zoomGraph(zoomValue: string) {
    this.currentPeriod = zoomValue;
    let getData;
    switch (this.selectedChannel) {
      case 'contacts':
        this.colorSchemeChart.domain = [];
        this.colorSchemeChart.domain.push(this.colorScheme.domain[0]);
        getData = this.dataService.getContactsByPeriod(this.currentPeriod);
        break;
      case 'responses':
        this.colorSchemeChart.domain = [];
        this.colorSchemeChart.domain.push(this.colorScheme.domain[1]);
        getData = this.dataService.getResponsesByPeriod(this.currentPeriod);
        break;
      case 'accepts':
        this.colorSchemeChart.domain = [];
        this.colorSchemeChart.domain.push(this.colorScheme.domain[2]);
        getData = this.dataService.getAcceptsByPeriod(this.currentPeriod);
        break;
      case 'declines':
        this.colorSchemeChart.domain = [];
        this.colorSchemeChart.domain.push(this.colorScheme.domain[3]);
        getData = this.dataService.getDeclinesByPeriod(this.currentPeriod);
        break;
      default:
        return;
    }
    getData.subscribe((data) => {
      if (this.zoomPeriods.indexOf(this.currentPeriod) < 2) {
        this.currentChannel = [];
        this.currentChannel.push({
          name: this.selectedChannel,
          series: data.map((item, i) => {
            const day = Math.floor(i / 24);
            return ({ name: `${i - day * 24}h ${day + 1 > 0 ? `${day + 1}d` : ''}`, value: item })
          }),
        });
      }
    });
  }
}
