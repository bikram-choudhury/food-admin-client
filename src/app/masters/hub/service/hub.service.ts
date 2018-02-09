import { Injectable } from '@angular/core';
import { Http,Headers,RequestOptions,Response,Request } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import { utilityService } from './../../../services/app.utility.service';

@Injectable()
export class HubService {
	
	host:string = this.utils.getHost();

	constructor(
		private utils:utilityService,
		private http:Http
	) { }
	deleteHub(rowId:string):Observable<string>{
		if(rowId){
			let deleteApi = this.host+'/hub/delete/'+rowId;
			return this.http.delete(deleteApi)
					.map(response=>{
						if(response.status == 200 && response.statusText == 'OK'){
							let data = response.json();
							return data.resultId;
						}
					})
					.catch(res=>{
						let errRes = {
							status: res.status,
							statusText: res.statusText,
							type: res.type,
							url: res.ur
						};
						return Observable.throw(errRes);
					})
		}
		
	}
	saveHub(hubData:any):Observable<any>{
		
		if(!this.utils.isEmpty(hubData)){
			let postApi = this.host+'/hub/save',
				header = new Headers({'content-type' : 'application/json'}),
				options = new RequestOptions({headers:header});

			return this.http.post(postApi,JSON.stringify(hubData),options)
					.map(response=>{
						console.log(response);
						return response.json();
					})
					.catch(res=>{
						let errRes = {
							status: res.status,
							statusText: res.statusText,
							type: res.type,
							url: res.ur
						};
						return Observable.throw(errRes);
					})
			
		}
	}
	gethubList():Observable<any>{
		let getApi = this.host+'/hub';
		return this.http.get(getApi)
				.map(response=>{
					return response.json()
				})
				.catch(res=>{
					let errRes = {
							status: res.status,
							statusText: res.statusText,
							type: res.type,
							url: res.ur
						};
						return Observable.throw(errRes);
				})
	}

}
