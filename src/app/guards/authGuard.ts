import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot,RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { AuthService } from './../services/auth.service';

@Injectable()

export class AuthGuard implements CanActivate {
    constructor(
    	private router: Router,
    	private authService: AuthService
    ) {}
    
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
        Observable<boolean> | Promise<boolean> | boolean {
        if (!this.authService.isLoggedIn()) {
            this.router.navigate(['login'], { queryParams: { returnUrl: state.url } });
        }
        return true;
    }
}
