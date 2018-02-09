import { Injectable } from '@angular/core';
import { Http,RequestOptions,Response,Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import { utilityService } from './../../../services/app.utility.service';

@Injectable()
export class TaxService {
	host:string = this.utils.getHost();
  constructor(
  		private http:Http,
  		private utils:utilityService
  	) { }
  saveTax(data:any):Observable<any>{
  	if(!this.utils.isEmpty(data)){
  		let postApi = this.host+"/tax/save",
  			header = new Headers({'content-type':'application/json'}),
  			option = new RequestOptions({headers:header});

  		return this.http.post(postApi,JSON.stringify(data),option)
  				.map(response=>{
  					console.log(response);
  					return response.json();
  				})
  				.catch(res=>{
  					let errRes = {
							status: res.status,
							statusText: res.statusText,
							type: res.type,
							url: res.url
						};
					return Observable.throw(errRes);
  				})
  	}
  }
  getTax(query:string):Observable<any>{
  	let getApi = this.host+"/tax/"+query;
  	return this.http.get(getApi)
  			.map(response=>{
  				return response.json();
  			})
  			.catch(res=>{
  				let errRes = {
  						status: res.status,
  						statusText: res.statusText,
  						type: res.type,
  						url: res.url
					};
				return Observable.throw(errRes);
			})
  }

  deleteTax(rowId:string):Observable<any>{
    if(!this.utils.isEmpty(rowId)){
      let deleteApi = this.host+"/tax/delete/"+rowId;
      return this.http.delete(deleteApi)
            .map(response=>{
              if(response.status == 200 && response.statusText=='OK'){
                let data = response.json();
                return data.resultId ? data:'';
              }
            })
            .catch(res=>{
              let errRes = {
                  status: res.status,
                  statusText: res.statusText,
                  type: res.type,
                  url: res.url
                };
              return Observable.throw(errRes);
            })
    }
  }

}
