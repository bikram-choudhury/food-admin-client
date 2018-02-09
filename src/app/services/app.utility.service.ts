import { Injectable } from '@angular/core';
import * as _ from 'underscore';

declare var $:any;

@Injectable()

export class utilityService {
	
	httpHost:string = '//localhost:4080';
	hubApprovalList:any = [
		{
			key:'1',
			title:'Purchase Order'
		},{
			key:'2',
			title:'Auto Stock Allocation'
		}
	];
	outletApprovalList:any = [
		{
			key:'1',
			title:'Purchase Order'
		},{
			key:'2',
			title:'Load Stock'
		}
	];
	taxTypeList:any = [
		{
			key:'cgst',
			title:'CGST'
		},{
			key:'sgst',
			title:'SGST'
		},{
			key:'gst',
			title:'GST'
		},{
			key:'igst',
			title:'IGST'
		},{
			key:'cess',
			title:'CESS'
		}
	];
	constructor() {}
	
	getHost(){
		return this.httpHost || '';
	}
	titleCase(str) {
		str = str.toLowerCase().split(' ');
		for (var i = 0; i < str.length; i++) {
			str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1); 
		}
		return str.join(' ');
	}
	adjustWindowHeight(container:any){
		let windowHeight = $(window).height();
		let contaierHeight = container.height();

		$('body').height(contaierHeight);

	}
	getCurrentDate(){
		let d = new Date();
		let curr_date = d.getDate();
		let curr_month = d.getMonth() + 1; //Months are zero based
		let curr_year = d.getFullYear();
		let currentDate = curr_year + "-" + ("0" + curr_month).slice(-2) + "-" + ("0" + curr_date).slice(-2);

		return currentDate;
	}
	convertDateFromStringToMoment(params:string):any{
		if(params){
			var actualDate = new Date(params);
		}
		else{
			var actualDate = new Date();
		}

		let moment = {
				year: actualDate.getFullYear(),
				month: actualDate.getMonth() + 1,
				day: actualDate.getDate()
			};
		return moment;
	}
	convertDateFromMomentToString(params:any):string{
		if(!this.isEmpty(params)){
			let momment = params,
				dateString = momment.year + "-" + ("0" + momment.month).slice(-2) + "-" + ("0" + momment.day).slice(-2);
			return dateString;
		}
		return '';
	}
	showErrorResoponse(response:any,message?:string){
        
        if(response.type){
            let thiss = this,
            	errEtatus = response.status.toString(),
            	defaultErrorMsg = "Can't able to handel "+errEtatus+" error code. ";
            switch(errEtatus){
                case '0':
                    // this.showNotification('top','right','danger',"CONNECTION REFUSED");
                    alert("CONNECTION REFUSED");
                    break;
                case '400':
                    // this.showNotification('top','right','danger',"BAD REQUEST");
                    alert("BAD REQUEST");
                    break;
                case '401':
                    // this.showNotification('top','right','danger',"DESTINATION UNAUTHORIZED");
                    alert("DESTINATION UNAUTHORIZED");
                    break;
                case '403':
                    // this.showNotification('top','right','danger',"FORBIDDEN");
                    alert("FORBIDDEN");
                    break;
                case '404':
                    // this.showNotification('top','right','danger',"404 NOT FOUND");
                    alert("404 NOT FOUND");
                    break;
                case '408':
                    // this.showNotification('top','right','danger',"REQUEST TIMEOUT");
                    alert("REQUEST TIMEOUT");
                    break;
                case '500':
                    // this.showNotification('top','right','danger',"INTERNAL SERVER ERROR");
                    alert("INTERNAL SERVER ERROR");
                    break;
                case '502':
                    // this.showNotification('top','right','danger',"BAD GATEWAY ERROR");
                    alert("BAD GATEWAY ERROR");
                    break;
                case '503':
                    // this.showNotification('top','right','danger',"SERVICE UNAVAILABLE ERROR");
                    alert("SERVICE UNAVAILABLE ERROR");
                    break;
                case '505':
                    // this.showNotification('top','right','danger'," HTTP VERSION NOT SUPPORTED");
                    alert(" HTTP VERSION NOT SUPPORTED");
                    break;
                default:
                    // this.showNotification('top','right','danger',defaultErrorMsg);
                    alert(defaultErrorMsg);
            }
        }
        
    }
    showNotification(from:string, align:string,type:string,message:string){
        $.notify({
            icon: "notifications",
            message: message

        },{
            type: type,
            timer: 300,
            placement: {
                from: from,
                align: align
            }
        });
    }
    ternary(param1:any,param2:any){
    	return param1 || param2;
    }
    ifInArray(param1:string, param2:Array<string>){
    	console.log(param2,param1);
    	if(param2 instanceof Array && $.inArray(param1,param2) >-1){
    		return true;
    	}
    	else{
    		return false;
    	}
    	// return (param2 instanceof Array && $.inArray(param1,param2) >-1)? true:false; 
    }
	/*showErrorResoponse(response:any,message?:string){
		
		if(response.type){
			let errEtatus = response.status.toString(),
			defaultErrorMsg = "Can't able to handel "+errEtatus+" error code. ";
			switch(errEtatus){
				case '0':
					swal("woops...","CONNECTION REFUSED","error");
					break;
				case '400':
					swal("woops...","BAD REQUEST","error");
					break;
				case '401':
					swal("woops...","DESTINATION UNAUTHORIZED","error");
					break;
				case '403':
					swal("woops...","FORBIDDEN","error");
					break;
				case '404':
					swal("woops...","404 NOT FOUND","error");
					break;
				case '408':
					swal("woops...","REQUEST TIMEOUT","error");
					break;
				case '500':
					swal("woops...","INTERNAL SERVER ERROR","error");
					break;
				case '502':
					swal("woops...","BAD GATEWAY ERROR","error");
					break;
				case '503':
					swal("woops...","SERVICE UNAVAILABLE ERROR","error");
					break;
				case '505':
					swal("woops..."," HTTP VERSION NOT SUPPORTED","error");
					break;
				default:
					swal("woops...",defaultErrorMsg,"error");
			}
		}
		
	}*/

	isEmpty(params:any){
		if(params){
			if(_.isObject(params)){
				return _.isEmpty(params);
			}
			if(_.isArray(params)){
				return params.length?false:true;
			}
			if(_.isString(params)){
				return false;
			}
			return true;
		}
		return true;
	}
}