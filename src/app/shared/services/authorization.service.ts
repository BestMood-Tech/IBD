import { EventEmitter, Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { Router } from '@angular/router';

@Injectable()
export class AuthorizationService {
  public user: User;
  public auth = new EventEmitter<User>();

  constructor(private router: Router) {
  }

  public authorization(form) {
    if (!form) {
      return;
    }
    localStorage.setItem('token', '123456789');
    this.user = new User({
      firstName: 'QWERTY',
      secondName: 'ZXCVN'
    });
    localStorage.setItem('user', JSON.stringify(this.user));
    this.auth.emit(this.user);
    this.router.navigateByUrl('dashboard')
  }

  public checkAuth() {
    let token: string;
    try {
      token = localStorage.getItem('token');
      if (token) {
        this.user = new User(JSON.parse(localStorage.getItem('user')));
        this.auth.emit(this.user);
      } else {
        this.router.navigateByUrl('login')
      }
    } catch (err) {
      console.log(err);
      return;
    }
  }
}
