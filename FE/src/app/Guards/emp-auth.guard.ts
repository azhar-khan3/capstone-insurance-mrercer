import {Injectable} from '@angular/core';

import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';


import { Observable } from 'rxjs';
import { AuthServiceService } from '../services/auth-service.service';



@Injectable()

export class AuthGuard implements CanActivate {

  constructor(private router: Router, private authService: AuthServiceService) {}
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (this.authService.getUserToken()) {
      return true;
    } else if (this.authService.hasStoredToken()) {

      return true;

    } else {

      this.authService.logout();

      const url = '/login'

    return   this.router.navigate([url]);

    }

  }

}