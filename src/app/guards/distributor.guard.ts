import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../services/ApiService.service';

@Injectable({
  providedIn: 'root'
})
export class DistributorGuard implements CanActivate {
  privileges: any = ['DS'];
  constructor(
    public commonService: ApiService,
    public router: Router,
    public activatedRoute: ActivatedRoute
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.commonService.userPram && this.privileges.indexOf(this.commonService.userPram.memberType) > -1) {
      return true;
    } else {
      this.commonService.logout();
      return false;
    }
  }
}
