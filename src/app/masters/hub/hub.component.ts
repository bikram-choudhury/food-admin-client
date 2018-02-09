import { Component, OnInit,AfterContentInit,AfterContentChecked } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute, ActivatedRouteSnapshot} from '@angular/router';

import { utilityService } from './../../services/app.utility.service';
import { HubService } from './service/hub.service';

import * as _ from 'underscore'; 
declare var $:any;

declare interface modelData {
	name:string,
	approvalList:Array<string>,
	address:string,
	gstStatus:string,
	gstno:string,
	rowId?:string
}

@Component({
  moduleId: module.id,
  selector: 'app-hub',
  templateUrl: './hub.component.html',
  styleUrls: ['./hub.component.css']
})
export class HubComponent implements OnInit,AfterContentChecked {
	
	approvalList:{
		key:string,
		title:string
	}[];
	hubData:any={
		headerRow: [ '#', 'Name', 'Address', 'Approvals', 'GST Info','Action'],
		dataRows:[]
	};
	processType:string='';
	hubModel:modelData = {
		name:'',
		approvalList:[],
		address:'',
		gstStatus:'no',
		gstno:''
	};
	rowId:string;

	constructor(
		private utils:utilityService,
		private hubServ:HubService,
		private activeRoute:ActivatedRoute,
		private routes:Router
	) { }

	ngAfterContentChecked(){
		if($(".selectpicker").length != 0){
            $(".selectpicker").selectpicker();
        }
	}
	ngOnInit() {
		this.approvalList = this.utils.hubApprovalList;
		this.processType = this.activeRoute.snapshot.data['type'] || '';

		if(this.processType==='view'){
			this.hubServ.gethubList()
			.subscribe(res=>{
				if(res.code==0){
					// this.utils.showNotification('top','right','success',res.message);
					this.hubData.dataRows = res.list;
				}
			},this.utils.showErrorResoponse)
		}

		if(typeof(Storage) != 'undefined'){
			let hashString = localStorage.getItem('dataHash'),
				data:any = JSON.parse(hashString);
			if(data){
				this.hubModel = {
						name:data.name || '',
						approvalList:data.approvalList || [],
						address:data.address || '',
						gstStatus: data.gstno?'yes':'no',
						gstno:data.gstno
					};
				this.rowId = data._id || '';
				localStorage.removeItem('dataHash');
			}
		}

	}
	resetInput(){
		this.hubModel.gstno = '';
	}
	saveForm(form:NgForm){
		if(form.valid){
			let hubData = this.hubModel;
			hubData.rowId = this.rowId;

			this.hubServ.saveHub(hubData)
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
	resetModels(){
		this.hubModel = {
			name:'',
			approvalList:[],
			address:'',
			gstStatus:'no',
			gstno:''
		};
		this.routes.navigate(['hub/view']);
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
	editHub(hubId:string){
		if(!this.utils.isEmpty(hubId)){
			let transient:any = _.findWhere(this.hubData.dataRows,{_id:hubId});
			if (transient) {
				if(typeof(Storage) != 'undefined'){
					localStorage.setItem('dataHash',JSON.stringify(transient));
				}
				
				this.routes.navigate(['/hub/manage']);
			}
			
		}
	}
	deleteHub(hubId:string){
		if(hubId){
			this.hubServ.deleteHub(hubId)
			.subscribe(response=>{
				if(response){
					this.hubData.dataRows = _.without(this.hubData.dataRows,_.findWhere(this.hubData.dataRows,{_id:response}));
				}
			},this.utils.showErrorResoponse)
		}
	}
}
