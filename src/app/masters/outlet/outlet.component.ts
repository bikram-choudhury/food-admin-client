import { Component, OnInit,AfterContentChecked } from '@angular/core';
import { Router,ActivatedRoute,ActivatedRouteSnapshot } from '@angular/router';
import { NgForm } from '@angular/forms';

import { utilityService } from './../../services/app.utility.service';
import { OutletService } from './service/outlet.service';
import { HubService } from './../hub/service/hub.service';

import * as _ from 'underscore';

declare var $:any;

declare interface modelData {
	name:string,
	approvalList:Array<string>,
	address:string,
	gstStatus:string,
	gstno:string,
	tin:string,
	hub:string,
	outletType:string,
	purchaseType:string,
	rowId?:string
}

@Component({
	moduleId: module.id,
	selector: 'app-outlet',
	templateUrl: './outlet.component.html',
	styleUrls: ['./outlet.component.css']
})
export class OutletComponent implements OnInit,AfterContentChecked {

	approvalList:{
		key:string,
		title:string
	}[];
	dataModel:modelData = {
		name:'',
		approvalList:[],
		address:'',
		gstStatus:'no',
		gstno:'',
		tin:'',
		outletType:'',
		purchaseType:'',
		hub:''
	};
	processType:string='';
	outletData:any={
		headerRow: [ '#', 'Name', 'Assigned Hub', 'Address', 'Approvals', 'GST Info','Action'],
		dataRows:[]
	};
	rowId:string = "";
	hubList:any;
	
	constructor(
		private utils:utilityService,
		private activeRoute:ActivatedRoute,
		private routes:Router,
		private outletServ:OutletService,
		private hubServ:HubService
	) { }

	ngAfterContentChecked(){
		if($(".selectpicker").length != 0){
            $(".selectpicker").selectpicker();
        }
	}

	ngOnInit() {
		this.approvalList = this.utils.outletApprovalList;
		this.processType = this.activeRoute.snapshot.data['type'] || '';

		this.hubServ.gethubList()
		.subscribe(response=>{
			if(response.code==0){
				this.hubList = response.list;
			}
		},this.utils.showErrorResoponse)

		if(this.processType==='view'){
			this.outletServ.getOutletList()
			.subscribe(res=>{
				if(res.code==0){
					// this.utils.showNotification('top','right','success',res.message);
					this.outletData.dataRows = res.list;
				}
			},this.utils.showErrorResoponse)
		}

		if(this.processType==='manage' && typeof(Storage) != 'undefined'){
			let hashString = localStorage.getItem('dataHash'),
				data:any = JSON.parse(hashString);
			if(data){
				this.dataModel = {
						name:data.name || '',
						approvalList:data.approvalList || [],
						address:data.address || '',
						gstStatus: data.gstno?'yes':'no',
						gstno:data.gstno || '',
						tin:data.tin || '',
						outletType:data.outletType || '',
						purchaseType:data.purchaseType || '',
						hub:data.hub || ''
					};

				this.rowId = data._id || '';

				localStorage.removeItem('dataHash');
			}
		}
	}
	saveForm(form:NgForm){
		if(form.valid){
			
			let outletData = this.dataModel;
			outletData.rowId = this.rowId;

			this.outletServ.saveOutlet(outletData)
			.subscribe(response=>{
				if(response.code > 0){
					this.utils.showNotification('top','right','rose',response.message);
				}
				else if(response.code == 0){
					this.utils.showNotification('top','right','success',response.message);
				}
				this.resetModels();
			},this.utils.showErrorResoponse)
		}
	}
	resetInput(){
		this.dataModel.gstno = '';
	}
	resetModels(){
		this.dataModel = {
			name:'',
			approvalList:[],
			address:'',
			gstStatus:'no',
			gstno:'',
			tin:'',
			hub:'',
			outletType:'',
			purchaseType:'',
		};
		this.routes.navigate(['outlet/view']);
	}
	assignedApprovals(approvals:any){
		if(!this.utils.isEmpty(approvals)){
			let list = [];
			_.each(this.approvalList,function(obj){
				if(_.contains(approvals,obj.key)){
					list.push(obj.title);
				}
			});
			return !_.isEmpty(list)?list.join(', '):'No Approval';
		}
		else{
			return 'No Approval';
		}
	}
	assignedHub(hub:any){
		if(!this.utils.isEmpty(hub)){
			let list:any = _.findWhere(this.hubList,{_id:hub});
			return !_.isEmpty(list)?list.name:'No Approval';
		}
		else{
			return 'No Approval';
		}
	}
	editOutlet(outletId:string){
		if(!this.utils.isEmpty(outletId)){
			let transient:any = _.findWhere(this.outletData.dataRows,{_id:outletId});
			if (transient) {
				if(typeof(Storage) != 'undefined'){
					localStorage.setItem('dataHash',JSON.stringify(transient));
				}
				
				this.routes.navigate(['/outlet/manage']);
			}
			
		}
	}
	deleteOutlet(hubId:string){
		if(hubId){
			this.outletServ.deleteOutlet(hubId)
			.subscribe(response=>{
				if(response){
					this.outletData.dataRows = _.without(this.outletData.dataRows,_.findWhere(this.outletData.dataRows,{_id:response}));
				}
			},this.utils.showErrorResoponse)
		}
	}
}
