import { Injectable } from '@angular/core';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/delay';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/interval';
import { Total } from '../../shared/models/total.model';

@Injectable()
export class DataService {
  public zoomPeriods = ['1d', '5d', '1m', '3m', '6m', '1y', '5y', '10y', 'all'];

  private savedData = [];
  private savedPeriod = '';
  private currentItem: string;

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

  private getRandomSeriesPerHour(min: number, max: number, days: number = 1) {
    const arr = [];
    for (let i = 0; i < 24 * days; i++) {
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

  public getContactsByPeriod(period: string) {
    /*if (this.currentItem !== 'contacts') {
      this.savedPeriod = '';
      this.savedData = [];
      this.currentItem = 'contacts';
    }
    if (this.zoomPeriods.indexOf(period) === -1) {
      return;
    }

    if (this.zoomPeriods.indexOf(period) < 2) {
      if (this.zoomPeriods.indexOf(period) > this.zoomPeriods.indexOf(this.savedPeriod)) {
        console.log(period, this.savedPeriod);
        return Observable.of(this.getRandomSeriesPerHour(100, 225, parseInt(period, 10))).delay(500)
          .map((data) => {
            this.savedData = data;
            this.savedPeriod = period;
            return data;
          });
      } else {
        return Observable.of(this.savedData.slice(0, 24)).delay(500);
      }
    }*/
    switch (period) {
      case this.zoomPeriods[0]:
      case this.zoomPeriods[1]:
        return Observable.of(this.getRandomSeriesPerHour(20, 220, parseInt(period, 10))).delay(500);
      case this.zoomPeriods[2]:
      case this.zoomPeriods[3]:
      case this.zoomPeriods[4]:
        return Observable.of(this.getRandomSeriesPerHour(20, 220, parseInt(period, 10) * 30)).delay(500);
      case this.zoomPeriods[5]:
      case this.zoomPeriods[6]:
      case this.zoomPeriods[7]:
        return Observable.of(this.getRandomSeriesPerHour(20, 220, parseInt(period, 10) * 365)).delay(500);
      case this.zoomPeriods[8]:
        return Observable.of(this.getRandomSeriesPerHour(20, 220, 20 * 365)).delay(500);
    }
  }

  public getResponsesByPeriod(period: string) {
    /*if (this.currentItem !== 'responses') {
      this.savedPeriod = '';
      this.savedData = [];
      this.currentItem = 'responses';
    }
    if (this.zoomPeriods.indexOf(period) === -1) {
      return;
    }

    if (this.zoomPeriods.indexOf(period) < 2) {
      if (this.zoomPeriods.indexOf(period) > this.zoomPeriods.indexOf(this.savedPeriod)) {
        console.log(period, this.savedPeriod);
        return Observable.of(this.getRandomSeriesPerHour(40, 70, parseInt(period, 10))).delay(500)
          .map((data) => {
            this.savedData = data;
            this.savedPeriod = period;
            return data;
          });
      } else {
        return Observable.of(this.savedData.slice(0, 24)).delay(500);
      }
    }*/
    switch (period) {
      case this.zoomPeriods[0]:
      case this.zoomPeriods[1]:
        return Observable.of(this.getRandomSeriesPerHour(20, 220, parseInt(period, 10))).delay(500);
      case this.zoomPeriods[2]:
      case this.zoomPeriods[3]:
      case this.zoomPeriods[4]:
        return Observable.of(this.getRandomSeriesPerHour(20, 220, parseInt(period, 10) * 30)).delay(500);
      case this.zoomPeriods[5]:
      case this.zoomPeriods[6]:
      case this.zoomPeriods[7]:
        return Observable.of(this.getRandomSeriesPerHour(20, 220, parseInt(period, 10) * 365)).delay(500);
      case this.zoomPeriods[8]:
        return Observable.of(this.getRandomSeriesPerHour(20, 220, 20 * 365)).delay(500);
    }
  }

  public getAcceptsByPeriod(period: string) {
    /*if (this.currentItem !== 'accepts') {
      this.savedPeriod = '';
      this.savedData = [];
      this.currentItem = 'accepts';
    }
    if (this.zoomPeriods.indexOf(period) === -1) {
      return;
    }

    if (this.zoomPeriods.indexOf(period) < 2) {
      if (this.zoomPeriods.indexOf(period) > this.zoomPeriods.indexOf(this.savedPeriod)) {
        console.log(period, this.savedPeriod);
        return Observable.of(this.getRandomSeriesPerHour(120, 150, parseInt(period, 10))).delay(500)
          .map((data) => {
            this.savedData = data;
            this.savedPeriod = period;
            return data;
          });
      } else {
        return Observable.of(this.savedData.slice(0, 24)).delay(500);
      }
    }*/
    switch (period) {
      case this.zoomPeriods[0]:
      case this.zoomPeriods[1]:
        return Observable.of(this.getRandomSeriesPerHour(20, 220, parseInt(period, 10))).delay(500);
      case this.zoomPeriods[2]:
      case this.zoomPeriods[3]:
      case this.zoomPeriods[4]:
        return Observable.of(this.getRandomSeriesPerHour(20, 220, parseInt(period, 10) * 30)).delay(500);
      case this.zoomPeriods[5]:
      case this.zoomPeriods[6]:
      case this.zoomPeriods[7]:
        return Observable.of(this.getRandomSeriesPerHour(20, 220, parseInt(period, 10) * 365)).delay(500);
      case this.zoomPeriods[8]:
        return Observable.of(this.getRandomSeriesPerHour(20, 220, 20 * 365)).delay(500);
    }
  }

  public getDeclinesByPeriod(period: string) {
    /*if (this.currentItem !== 'declines') {
      this.savedPeriod = '';
      this.savedData = [];
      this.currentItem = 'declines';
    }
    if (this.zoomPeriods.indexOf(period) === -1) {
      return;
    }

    if (this.zoomPeriods.indexOf(period) < 2) {
      if (this.zoomPeriods.indexOf(period) > this.zoomPeriods.indexOf(this.savedPeriod)) {
        console.log(period, this.savedPeriod);
        return Observable.of(this.getRandomSeriesPerHour(65, 90, parseInt(period, 10))).delay(500)
          .map((data) => {
            this.savedData = data;
            this.savedPeriod = period;
            return data;
          });
      } else {
        return Observable.of(this.savedData.slice(0, 24)).delay(500);
      }
    }*/
    switch (period) {
      case this.zoomPeriods[0]:
      case this.zoomPeriods[1]:
        return Observable.of(this.getRandomSeriesPerHour(20, 220, parseInt(period, 10))).delay(500);
      case this.zoomPeriods[2]:
      case this.zoomPeriods[3]:
      case this.zoomPeriods[4]:
        return Observable.of(this.getRandomSeriesPerHour(20, 220, parseInt(period, 10) * 30)).delay(500);
      case this.zoomPeriods[5]:
      case this.zoomPeriods[6]:
      case this.zoomPeriods[7]:
        return Observable.of(this.getRandomSeriesPerHour(20, 220, parseInt(period, 10) * 365)).delay(500);
      case this.zoomPeriods[8]:
        return Observable.of(this.getRandomSeriesPerHour(20, 220, 20  * 365)).delay(500);
    }
  }
}
