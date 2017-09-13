import { EventEmitter, Injectable } from '@angular/core';
import { User } from '../models/user.model';

@Injectable()
export class AuthorizationService {
  public user: User;
  public auth: EventEmitter<User>;

  public authorization(form) {
    if (!form) {
      return;
    }
    localStorage.setItem('token', '123456789');
    const user = new User({
      firstName: 'QWERTY',
      secondName: 'ZXCVN'
    });
    this.auth.emit(user);
  }
}
