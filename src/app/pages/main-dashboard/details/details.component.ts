import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../data.service';

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
  public channel: string = '';
  public status = 'online';

  constructor(private route: ActivatedRoute,
              private dataService: DataService) {
  }

  public ngOnInit() {
    this.route.params.subscribe((params: { channel: string }) => {
      this.channel = params.channel;
    });
    this.dataService.getTotalItemsData().subscribe((data) => {
      this.pieChannels = data.map((item) => ({ name: item.name, value: item.value }));
    });
  }
}
