import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import {Router} from '@angular/router';
import {AuthService} from './auth.service';

@Injectable()
export class PublicPageGuard implements CanActivate {

  constructor(private router: Router, private authService: AuthService) {
  }
  canActivate() {
    if (this.authService.isSignedIn()) {
      //this.router.navigate(['/home']);
    }
    return !this.authService.isSignedIn();
  }
}
