import { Component, OnInit } from '@angular/core';
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

  constructor(private dataService: DataService) {
  }

  public ngOnInit() {
    this.dataService.getTotalItemsData().subscribe((data) => {
      this.pieChannels = data.map((item) => ({ name: item.name, value: item.value }));
    });
  }
}
