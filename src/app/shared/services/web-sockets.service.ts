import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class WebSocketsService {
  public dataForChart$: Observable<any>;

  private url = '/';
  private socket;
  private dataForChart: Subject<any>;

  constructor() {
    this.dataForChart = new Subject();
    this.dataForChart$ = this.dataForChart.asObservable();
  }

  public connect() {
    this.socket = io.connect(this.url);
  }

  public disconnect(type: string) {
    this.socket.disconnect(type);
  }

  public getDataForChart(type: string) {
    this.socket.on(`data-for-chart-${type}`, (data) => {
      this.dataForChart.next(data);
    });
  }

}
