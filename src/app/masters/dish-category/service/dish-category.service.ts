import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import { utilityService } from './../../../services/app.utility.service';

@Injectable()
export class DishCategoryService {
	host:string = this.utils.getHost();
	constructor(
		private utils:utilityService,
		private https: Http
	) { }
	
	saveDishCat(data:any):Observable<any>{
		let hostApi = this.host+"/dish-category/save",
			header = new Headers({'content-type':'application/json'}),
			options = new RequestOptions({headers: header});

		return this.https.post(hostApi,JSON.stringify(data),options)
				.map(response=>{
					if(response.status == 200){
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
	
	deleteCat(rowId:string):Observable<any>{
		if (rowId) {
			let hostApi = this.host+"/dish-category/"+rowId;
			return this.https.delete(hostApi)
					.map(res=>{
						if(res.status == 200){
							return res.json();
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

}
