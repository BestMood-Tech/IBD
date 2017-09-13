import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { Total } from '../models/total.model';

@Injectable()
export class DataService {
  public mockTotals: Total = new Total({
    contacts: this.randomNumber(50, 200),
    responses: this.randomNumber(30, 100),
    accepts: this.randomNumber(60, 80),
    declines: this.randomNumber(10, 50)
  });

  public getTotalsData(): Observable<Total> {
    return Observable.of(this.mockTotals);
  }

  private randomNumber(min: number, max: number): number {
    let rand = min - 0.5 + Math.random() * (max - min + 1);
    rand = Math.round(rand);
    return rand;
  }
}
