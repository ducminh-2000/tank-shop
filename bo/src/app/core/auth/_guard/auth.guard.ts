import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { LoopBackAuth } from '../../../api/services/core';
import { Roles } from '../../constant/constant';

// Auth reducers and selectors

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private auth: LoopBackAuth
  ) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const user = this.auth.getCurrentUserData();
    if (user && user.roles && user.roles.some((role:any) => Roles[role.name])) {
      return true;
    }
    this.router.navigate(['/auth']).then();
    return false;
  }

  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return this.canActivate(childRoute, state);
  }
}
