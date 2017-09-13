import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/delay';
import { Total } from '../../shared/models/total.model';

@Injectable()
export class DataService {

  private icons = {
    contacts: 'fa fa-commenting-o',
    responses: 'fa fa-book',
    accepts: 'fa fa-address-card-o',
    declines: 'fa fa-briefcase'
  };

  public getTotalItemsData() {
    const data = [
      {
        name: 'contacts',
        icon: 'fa fa-commenting-o',
        value: this.randomNumber(50, 200)
      },
      {
        name: 'responses',
        icon: 'fa fa-book',
        value: this.randomNumber(30, 100)
      },
      {
        name: 'accepts',
        icon: 'fa fa-address-card-o',
        value: this.randomNumber(60, 80)
      },
      {
        name: 'declines',
        icon: 'fa fa-address-card-o',
        value: this.randomNumber(10, 50)
      }
    ];
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
