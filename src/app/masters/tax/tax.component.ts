import { Component, OnInit,AfterContentInit,AfterContentChecked, AfterViewInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute, ActivatedRouteSnapshot} from '@angular/router';

import { utilityService } from './../../services/app.utility.service';
import { TaxService } from './service/tax.service';

import * as _ from 'underscore';
declare var $:any;

declare interface modelData {
	name:string,
	masterType:string,
	taxgroupStatus:boolean,
	prcnt:string
	rowId?:string
}

@Component({
  moduleId: module.id,
  selector: 'app-tax',
  templateUrl: './tax.component.html',
  styleUrls: ['./tax.component.css']
})
export class TaxComponent implements OnInit,AfterContentChecked,AfterViewInit {

	typeMasterList:{
		key:string,
		title:string
	}[];
	taxData:any={
		headerRow: [ '#', 'Name', 'Master Type', 'Associate Tax', 'Action'],
		dataRows:[]
	};
	processType:string='';
	taxModel:modelData = {
		name:'',
		prcnt:'',
		masterType:'',
		taxgroupStatus:false
	};
	rowId:string;
	modalHeader:string = "Tax list";
	associativeTax:Array<string> = [];
	saveAssoctvLst:boolean = false;

	constructor(
		private utils:utilityService,
		private taxServ:TaxService,
		private activeRoute:ActivatedRoute,
		private routes:Router
	) { }

	ngAfterContentChecked(){
		if($(".selectpicker").length != 0){
            $(".selectpicker").selectpicker();
        }
	}
	ngAfterViewInit(){
		$('[rel="tooltip"]').tooltip();
	}
	ngOnInit() {
		this.typeMasterList = this.utils.taxTypeList;
		this.processType = this.activeRoute.snapshot.data['type'] || '';

		let query = 'not-grp';
		if(this.processType==='view'){
			query = 'all';
		}
		// if(this.processType==='view'){
			this.taxServ.getTax(query)
			.subscribe(res=>{
				if(res.code==0){
					// this.utils.showNotification('top','right','success',res.message);
					this.taxData.dataRows = res.list;
				}
			},this.utils.showErrorResoponse)
		// }

		if(typeof(Storage) != 'undefined'){
			let hashString = localStorage.getItem('dataHash'),
				data:any = JSON.parse(hashString);
			if(data){
				this.taxModel = {
						name:data.name || '',
						prcnt:data.prcnt || '',
						masterType: data.mstrTyp || '',
						taxgroupStatus: data.grp || false
					};
				this.rowId = data._id || '';
				this.associativeTax = data.grpTaxLst || [];
				localStorage.removeItem('dataHash');
			}
		}

	}
	resetInput(){

	}
	saveForm(form:NgForm){
		if(form.valid){
			if(this.taxModel.taxgroupStatus && !this.saveAssoctvLst){
				if(this.associativeTax.length < 2){
					this.utils.showNotification('top','right','rose','invalid number of tax selected for the group.');
				}
				else{
					this.utils.showNotification('top','right','rose','Please click save button after selecting the corresponding lists.');
				}
			}
			else{

				let grpTaxPrcnt = _.reduce(
										_.pluck(
											_.filter(
												this.taxData.dataRows,
												function(col:any){
													return $.inArray(col._id,this.associativeTax) > -1;
												}.bind(this)
											),
											'prcnt'
										), function(sum, num){ return sum + parseFloat(num); }, 0),
				formData:any = {
					name : this.taxModel.name || '',
					prcnt : this.taxModel.taxgroupStatus?grpTaxPrcnt:(this.taxModel.prcnt || ''),
					mstrTyp : this.taxModel.masterType || '',
					grp: this.taxModel.taxgroupStatus,
					rowId : this.rowId || ''
				};
				if(formData.grp){
					formData.grpTaxLst = this.associativeTax;
				}

				this.taxServ.saveTax(formData)
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
	}
	resetModels(){
		this.taxModel = {
			name:'',
			prcnt:'',
			masterType:'',
			taxgroupStatus:false
		};
		this.routes.navigate(['tax/view']);
	}
	editTax(rowId:string){
		if(!this.utils.isEmpty(rowId)){
			let transient:any = _.findWhere(this.taxData.dataRows,{_id:rowId});
			if (transient) {
				if(typeof(Storage) != 'undefined'){
					localStorage.setItem('dataHash',JSON.stringify(transient));
				}

				this.routes.navigate(['/tax/manage']);
			}

		}
	}
	deleteTax(rowId:string){
		if(rowId){
			this.taxServ.deleteTax(rowId)
			.subscribe(response=>{
				if(response){
					this.taxData.dataRows = _.without(this.taxData.dataRows,_.findWhere(this.taxData.dataRows,{_id:response.resultId}));
					this.utils.showNotification('top','right','success',response.message);
				}
			},this.utils.showErrorResoponse)
		}
	}
	openTaxModal(){
		let currentList = this.associativeTax;
		$(".taxId-checkbox").each(function(){
			if($.inArray($(this).val(),currentList) >-1 ){
				$(this).prop('checked', true);
			}
			else{
				$(this).prop('checked', false);
			}
		});
	}
	saveAssociativeTax(){
		this.saveAssoctvLst = true;
	}
	onChangeForTaxList(taxId:string,checked:boolean){
		if(taxId){
			checked?this.associativeTax.push(taxId):this.associativeTax = _.without(this.associativeTax,taxId);
		}
	}
	getTaxname(taxIds:Array<string>,key:string){
		if(taxIds instanceof Array){
			return _.pluck(
					_.filter(this.taxData.dataRows,function(col:any){
							return $.inArray(col._id,taxIds) > -1;
						}.bind(this)
					),'name');
		}
	}

}
