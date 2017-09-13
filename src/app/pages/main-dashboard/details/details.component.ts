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
  public pieChannels = [];
  public pieView = [1000, 200];
  public colorScheme = {
    domain: ['#00abff', '#e7ba08', '#8bd22f', '#f95372'],
  };
  public colorSchemeChart = {
    domain: [],
  };

  public channel: string = '';
  public status = 'online';

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
  public xAxisLabel = 'Hours';
  public showYAxisLabel = true;
  public yAxisLabel = 'Number';
  public timeline = true;
  public curve = d3.curveNatural;
  public xAxisTickFormatting = (x) => x.toLocaleTimeString();

  // line, area
  public autoScale = false;

  // buttons
  public zoomButtons = ['1d', '5d', '1m', '3m', '6m', '1y', '5y', '10y', 'all'];

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
    let getData;
    switch (event.name) {
      case 'contacts':
        getData = this.dataService.getContacts();
        break;
      case 'responses':
        getData = this.dataService.getResponses();
        break;
      case 'declines':
        getData = this.dataService.getDeclines();
        break;
      case 'accepts':
        getData = this.dataService.getAccepts();
        break;
      default:
        return;
    }
    getData.subscribe((data) => {
      this.selectedChannel = {
        name: event.name,
        series: data.map((item, i) => ({ name: i, value: item })),
      };
      console.log(this.selectedChannel);
    });
  }

  public zoomGraph(zoomValue: string) {
    console.log(zoomValue);
  }
}
