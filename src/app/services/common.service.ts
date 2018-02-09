import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import { utilityService } from './app.utility.service';
import * as _ from 'underscore';

declare var $:any;

@Injectable()
export class commonService {
	host:string = this.utils.getHost();
	constructor( private https: Http, private utils: utilityService ) {}

	getMainCategoryList():Observable<any>{
		let hostApi = this.host+"/common/main-category";
		return this.getMethod(hostApi);
	}

	getDishCat(option?:string):Observable<any>{
		let hostApi = this.host+"/dish-category/"+(option?option:'');
		return this.getMethod(hostApi);
	}
	getDish(option?:string):Observable<any>{
		let hostApi = this.host+"/dish/"+(option?option:'');
		return this.getMethod(hostApi);
	}
	getMethod(hostApi:string){
		return this.https.get(hostApi)
				.map(response=>{
					if (response.status == 200) {
						return response.json();
					}
				})
				.catch(res=>{
  					let errRes = {
							status: res.status,
							statusText: res.statusText,
							type: res.type,
							url: res.url
						};
					return Observable.throw(errRes)
				})	
	}

}