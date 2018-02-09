import { Component, OnInit, AfterViewInit, AfterContentChecked, AfterContentInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';

import { utilityService } from './../../services/app.utility.service';
import { commonService } from './../../services/common.service';
import { DishService } from './service/dish.service';

import * as _ from 'underscore';
declare var $:any;
declare interface modelData{
	name:string,
	dcat:string,
	price:number,
	scd:string,
	ncd:string
}

@Component({
  moduleId: module.id,
  selector: 'app-dish',
  templateUrl: './dish.component.html',
  styleUrls: ['./dish.component.css']
})

export class DishComponent implements OnInit, AfterViewInit, AfterContentChecked {

	processType:string = "";
	dataModel:modelData = {
		name:'', dcat:'', price:0, scd:'', ncd:''
	};
	dish_category:any[];
	docId:string = "";
	viewData = {
		headerRow:[ '#', 'Name', 'Dish Category', 'Price', 'Short Code', 'Num Code', 'Action'],
		dataRows: []
	};

	constructor(
		private router: Router, 
		private activeRoute: ActivatedRoute, 
		private utils: utilityService, 
		private common: commonService, 
		private dishServ: DishService
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
		this.processType = this.activeRoute.snapshot.data['type'] || '';

		this.common.getDishCat('active')
		.subscribe(response=>{
			if(response.code == 0){
				this.dish_category = response.list;
			}
		},this.utils.showErrorResoponse)

		if(this.processType === 'view'){
			this.common.getDish()
			.subscribe(res=>{
				if(res.code == 0){
					this.viewData.dataRows = res.list;
				}
			},this.utils.showErrorResoponse)
		}

		if(typeof(Storage) != 'undefined'){
			let hashString:any = localStorage.getItem('dataHash') || '';
			if(hashString){
				let volatileData = JSON.parse(hashString);
				this.dataModel = {
					name: volatileData.name || 'no-name',
					dcat: volatileData.dcat || 'default-cat',
					price: volatileData.price || 1,
					scd: volatileData.scd || '',
					ncd: volatileData.ncd || 0,
				};
				this.docId = volatileData._id || '';
				localStorage.removeItem('dataHash');
			}
		}
	}

	saveForm(form:NgForm){
		if(form.valid){
			
			if(!this.dataModel.name){
				this.utils.showNotification('top','right','rose','invalid category name.');
			}
			else if(isNaN(this.dataModel.price)){
				this.utils.showNotification('top','right','rose','invalid price & must be in number.');
			}
			else{
				let formData:any = {
					name: this.dataModel.name || 'no-name',
					dcat: this.dataModel.dcat || 'default-dcat',
					price: this.dataModel.price || 0,
					scd: this.dataModel.scd || '',
					ncd: this.dataModel.ncd || 0,
					rowId: this.docId || ''
				};

				this.dishServ.saveDish(formData)
				.subscribe(res=>{
					if(res.code > 0){
						this.utils.showNotification('top','right','rose',res.message);
					}
					else if(res.code == 0){
						this.utils.showNotification('top','right','success',res.message);
					}
					this.resetModels();
				},this.utils.showErrorResoponse)

			}

		}
	}
	getDishCategoryDetailsById(rowId:string){
		if(rowId && typeof rowId === 'string'){
			return this.utils.titleCase( _.findWhere(this.dish_category,{_id:rowId}).name ) || ' - ';
		}
	}
	resetModels(){
		this.dataModel = {
			name:'', dcat:'', price:0, scd:'', ncd:''
		};
		this.router.navigate(['dish/view']);
	}
	editForm(rowId:string){
		if(rowId && typeof rowId === 'string'){
			let volatileData = _.findWhere(this.viewData.dataRows, {_id: rowId});
			if( volatileData && typeof Storage !='undefined'){
				localStorage.setItem('dataHash',JSON.stringify(volatileData));
			}
			this.router.navigate(['/dish/manage']);
		}
	}
	delete(rowId:string){
		if(rowId && typeof rowId === 'string'){
			this.dishServ.delete(rowId)
			.subscribe(response=>{
				if(response){
					this.viewData.dataRows = _.without(this.viewData.dataRows,_.findWhere(this.viewData.dataRows,{_id:response.resultId}));
					this.utils.showNotification('top','right','success',response.message);
				}
			},this.utils.showErrorResoponse)
		}
	}

}
