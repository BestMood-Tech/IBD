import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as d3 from 'd3';
import 'rxjs/add/operator/mergeMap';
import { Subscription } from 'rxjs/Subscription';
import { WebSocketsService } from '../../../shared/services/web-sockets.service';
import { DataService } from '../data.service';
import { RealTimeChart, RealTimeChartOptions } from './real-time.chart';

@Component({
  selector: 'nga-details',
  templateUrl: 'details.component.html',
  styleUrls: ['details.component.scss'],
})

export class DetailsComponent implements OnInit, OnDestroy {
  @ViewChild('realTime') public realTimeChart: ElementRef;

  public channel: string = '';
  public status = 'offline';

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

  // buttons
  public zoomPeriods: string[];
  public currentPeriod: string;

  private subscription: Subscription;

  constructor(private route: ActivatedRoute,
              private dataService: DataService,
              private webSocketsService: WebSocketsService) {
  }

  public ngOnInit() {
    this.zoomPeriods = this.dataService.zoomPeriods;
    this.currentPeriod = this.zoomPeriods[0];
    this.route.params.mergeMap((params: { channel: string }) => {
      this.channel = params.channel;
      this.channels.push({ name: this.channel, series: [] });
      this.status = 'waiting';
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
        this.status = 'online';
      });

    this.dataService.getTotalItemsData().subscribe((data) => {
      this.pieChannels = data.map((item) => ({ name: item.name, value: item.value }));
    });
    this.webSocketsService.connect();
    const chart = new RealTimeChart(this.realTimeChart.nativeElement, {
      width: 850,
      height: 350,
      duration: 500,
      minutes: 1,
    } as RealTimeChartOptions);
    this.subscription = this.webSocketsService.dataForChart$.subscribe((data) => {
      chart.addPoint({
        x: new Date(data.time),
        y: data.value,
      });
    });
    this.webSocketsService.getDataForChart(this.channel);
  }

  public ngOnDestroy() {
    this.webSocketsService.disconnect(this.channel);
    this.subscription.unsubscribe();
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
      const period = [];
      switch (this.currentPeriod) {
        case this.zoomPeriods[0]:
        case this.zoomPeriods[1]:
          this.currentChannel = [];
          this.currentChannel.push({
            name: this.selectedChannel,
            series: data.map((item, i) => {
              const day = Math.floor(i / 24);
              return ({ name: `${i - day * 24}h ${day + 1 > 0 ? `${day + 1}d` : ''}`, value: item });
            }),
          });
          break;
        case this.zoomPeriods[2]:
        case this.zoomPeriods[3]:
        case this.zoomPeriods[4]:
          this.currentChannel = [];
          for (let i = 0; i < data.length / 24; i++) {
            period.push(this.average(data.slice(i * 24, (i + 1) * 24)));
          }
          this.currentChannel.push({
            name: this.selectedChannel,
            series: period.map((item, i) => {
              return ({ name: i + 1, value: item });
            }),
          });
          break;
        case this.zoomPeriods[5]:
          this.currentChannel = [];
          for (let i = 0; i < data.length / (24 * 31); i++) {
            period.push(this.average(data.slice(i * 24 * 31, (i + 1) * 24 * 31)));
          }
          this.currentChannel.push({
            name: this.selectedChannel,
            series: period.map((item, i) => {
              return ({ name: i + 1, value: item });
            }),
          });
          break;
        case this.zoomPeriods[6]:
        case this.zoomPeriods[7]:
        case this.zoomPeriods[8]:
          this.currentChannel = [];
          for (let i = 0; i < data.length / (24 * 365); i++) {
            period.push(this.average(data.slice(i * 24 * 365, (i + 1) * 24 * 365)));
          }
          this.currentChannel.push({
            name: this.selectedChannel,
            series: period.map((item, i) => {
              return ({ name: i + 1, value: item });
            }),
          });
          break;
      }
    });
  }

  private average(data) {
    let average = 0;
    for (const i of data) {
      average += i;
    }
    return average / data.length;
  }
}
