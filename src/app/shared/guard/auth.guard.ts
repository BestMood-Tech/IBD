import { Injectable } from '@angular/core';
import { CanLoad, Router } from '@angular/router';
import { AuthorizationService } from '../services/authorization.service';

@Injectable()
export class AccountGuard implements CanLoad {
  constructor(private router: Router,
              private authorizationService: AuthorizationService) {
  }

  public canLoad() {
    return new Promise<boolean>((resolve) => {
      this.authorizationService.auth.subscribe((data) => {
        if (data) {
          resolve(true);
          this.router.navigateByUrl('dashboard');
        } else {
          resolve(false);
          this.router.navigateByUrl('login');
        }
      });
      this.authorizationService.checkAuth();
    });
  }
}
