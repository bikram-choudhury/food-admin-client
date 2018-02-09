import { Injectable } from '@angular/core';
import { Http, Request, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import { utilityService } from './../services/app.utility.service';

@Injectable()
export class AuthenticationService {

	host:string = this.utils.getHost();
	
	constructor(
		private http: Http,
		private utils: utilityService
	) { }
	
	saveUser(userData:any):Observable<any>{
		if(!this.utils.isEmpty(userData)){
			let authApi = this.host+'/login/save',
				header = new Headers({'content-type':'application/json'}),
				options = new RequestOptions({headers:header});

			return this.http.post(authApi,JSON.stringify(userData),options)
					.map(response=>{
						console.log(response);
						return response.json();
					})
					.catch(res=>{
						console.log(res);
						let errRes = {
							status: res.status,
							statusText: res.statusText,
							type: res.type,
							url: res.url
						}
						return Observable.throw(errRes);
					})

		}
	}

	loginUser(userData:any):Observable<any>{
		if(!this.utils.isEmpty(userData)){
			let authUrl = this.host+'/login',
				header = new Headers({'content-type':'application/json'}),
				option = new RequestOptions({headers: header});
			return this.http.post(authUrl,JSON.stringify(userData),option)
					.map(response=>{
						return response.json();
					})
					.catch(res=>{
						let errRes = {
							status: res.status,
							statusText: res.statusText,
							utl: res.url,
							type:res.type
						};
						return Observable.throw(errRes);
					})
		}
	}


}
