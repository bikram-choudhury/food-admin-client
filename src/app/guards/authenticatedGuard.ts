import { Injectable } from '@angular/core';
import { Router, CanActivate, CanActivateChild, CanLoad } from '@angular/router';

@Injectable()

export class authenticatedGuard implements CanActivate, CanActivateChild, CanLoad {
	
	constructor(private routes:Router) { }
	canActivate():boolean{
		return this.checkLoginAuthentication();
	}
	canActivateChild():boolean{
		return this.checkLoginAuthentication();
	}
	canLoad():boolean{
		return this.checkLoginAuthentication();
	}
	checkLoginAuthentication():boolean{
		if(typeof(Storage) !='undefined'){
			let loginInfo = sessionStorage.getItem('info'),
				info;
			if(loginInfo){
				info = JSON.parse(loginInfo);
			}

			if(!(info && info._id)){
				this.routes.navigate(['/login']);
			}
			return info && info._id;
		}
	}

}