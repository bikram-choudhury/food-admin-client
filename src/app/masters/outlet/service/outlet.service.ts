import { Injectable } from '@angular/core';
import { Http, Headers, Request, RequestOptions,Response} from '@angular/http';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import { utilityService } from './../../../services/app.utility.service';

@Injectable()
export class OutletService {
	host:string = this.utils.getHost();

	constructor(
		private utils:utilityService,
		private http:Http
	) { }

	deleteOutlet(rowId:string):Observable<string>{
		if(rowId){
			let deleteApi = this.host+'/outlet/delete/'+rowId;
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
	saveOutlet(outletData:any):Observable<any>{
		
		if(!this.utils.isEmpty(outletData)){
			let postApi = this.host+'/outlet/save',
				header = new Headers({'content-type' : 'application/json'}),
				options = new RequestOptions({headers:header});

			return this.http.post(postApi,JSON.stringify(outletData),options)
					.map(response=>{
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
	getOutletList():Observable<any>{
		let getApi = this.host+'/outlet';
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
