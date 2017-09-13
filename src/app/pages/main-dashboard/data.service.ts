import { Injectable } from '@angular/core';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/delay';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/interval';
import { Total } from '../../shared/models/total.model';

@Injectable()
export class DataService {

  public getTotalItemsData() {
    const data: Total[] = [
      {
        name: 'contacts',
        icon: 'fa fa-commenting-o',
        value: this.randomNumber(50, 200),
      },
      {
        name: 'responses',
        icon: 'fa fa-book',
        value: this.randomNumber(30, 100),
      },
      {
        name: 'accepts',
        icon: 'fa fa-address-card-o',
        value: this.randomNumber(60, 80),
      },
      {
        name: 'declines',
        icon: 'fa fa-address-card-o',
        value: this.randomNumber(10, 50),
      },
    ];
    return Observable.of(data.map((item) => new Total(item))).delay(500);
  }

  private randomNumber(min: number, max: number): number {
    let rand = min - 0.5 + Math.random() * (max - min + 1);
    rand = Math.round(rand);
    return rand;
  }

  public getContacts() {
    return Observable.of(this.getRandomSeriesPerHour(100, 225)).delay(500);
  }

  public getResponses() {
    return Observable.of(this.getRandomSeriesPerHour(40, 70)).delay(500);
  }

  public getAccepts() {
    return Observable.of(this.getRandomSeriesPerHour(120, 150)).delay(500);
  }

  public getDeclines() {
    return Observable.of(this.getRandomSeriesPerHour(65, 90)).delay(500);
  }

  private getRandomSeriesPerHour(min: number, max: number) {
    const arr = [];
    for (let i = 0; i < 24; i++) {
      arr.push(this.randomNumber(min, max));
    }
    return arr;
  }

  public getContactsRealtime() {
    return Observable.interval(1000)
      .map(() => this.randomNumber(100, 220));
  }

  public getResponsesRealtime() {
    return Observable.interval(1000)
      .map(() => this.randomNumber(40, 100));
  }

  public getAcceptsRealtime() {
    return Observable.interval(1000)
      .map(() => this.randomNumber(120, 150));
  }

  public getDeclinesRealtime() {
    return Observable.interval(1000)
      .map(() => this.randomNumber(65, 90));
  }
}
