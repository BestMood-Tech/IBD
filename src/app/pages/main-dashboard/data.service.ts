import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/delay';
import { Total } from '../../shared/models/total.model';

@Injectable()
export class DataService {
  public mockTotals: Total = new Total({
    contacts: this.randomNumber(50, 200),
    responses: this.randomNumber(30, 100),
    accepts: this.randomNumber(60, 80),
    declines: this.randomNumber(10, 50),
  });

  public getTotalItemsData(): Observable<Total> {
    return Observable.of(this.mockTotals).delay(100);
  }

  public getTotalData() {
    const data = [];
    for (let i = 0; i < 24; i++) {
      data.push({
        hour: new Date(2017, 9, 12, i),
        total: new Total({
          contacts: this.randomNumber(100, 125),
          responses: this.randomNumber(40, 70),
          accepts: this.randomNumber(120, 150),
          declines: this.randomNumber(65, 90),
        }),
      });
    }
    return Observable.of(data).delay(500);
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
}
