import { Component, OnInit, AfterContentChecked, AfterContentInit, AfterViewInit } from '@angular/core';
import { Router, ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { NgForm } from '@angular/forms';

import { utilityService } from './../../services/app.utility.service';
import { DishCategoryService } from './service/dish-category.service';
import { commonService } from './../../services/common.service';
import * as _ from 'underscore';
declare var $:any;

declare interface modelData {
	name: string,
	mcat: string,
	priority: number,
	type: string,
	color: string
}

@Component({
	moduleId: module.id,
	selector: 'app-dish-category',
	templateUrl: './dish-category.component.html',
	styleUrls: ['./dish-category.component.css']
})
export class DishCategoryComponent implements OnInit, AfterContentChecked {

	processType:string = '';
	dataModel:modelData = {
		name: '',
		mcat: '',
		priority: 1,
		type: 'veg',
		color: '#ffffff'
	};
	main_category:any[];
	viewData = {
		headerRow:[ '#', 'Category Name', 'Main Category', 'Priority', 'Type', 'color', 'Action'],
		dataRows: []
	};
	docId:string = "";
	
	constructor(
		private activeRoute: ActivatedRoute,
		private routes: Router,
		private catServ: DishCategoryService,
		private utils: utilityService,
		private common: commonService
	) { }

	ngAfterContentChecked(){
		if($(".selectpicker").length != 0){
            $(".selectpicker").selectpicker();
        }
	}
	
	ngOnInit() {
		this.processType = this.activeRoute.snapshot.data['type'] || '';
		this.common.getMainCategoryList()
		.subscribe(res=>{
			if(res.code == 0){
				this.main_category = res.list;
			}
		},this.utils.showErrorResoponse)

		if(this.processType === 'view'){
			this.common.getDishCat()
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
					name: volatileData.name || '',
					mcat: volatileData.mcat || '',
					priority: volatileData.priority || 1,
					type: volatileData.type || 'veg',
					color: volatileData.color || '#ffffff'
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
			else{
				let formData:any = {
					name: this.dataModel.name || 'no-name',
					mcat: this.dataModel.mcat || 'default-cat',
					priority: this.dataModel.priority || 1,
					type: this.dataModel.type || 'veg',
					color: this.dataModel.color || '#ffffff',
					rowId: this.docId || ''
				};

				this.catServ.saveDishCat(formData)
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
	getMainCategoryDetailsById(rowId:string){
		if(rowId && typeof rowId === 'string'){
			return this.utils.titleCase( _.findWhere(this.main_category,{_id:rowId}).name ) || ' - ';
		}
	}
	resetModels(){
		this.dataModel = {
			name: '',
			mcat: '',
			priority: 1,
			type: 'veg',
			color: '#ffffff'
		};
		this.routes.navigate(['dish-category/view']);
	}
	editForm(rowId:string){
		if(rowId && typeof rowId === 'string'){
			let volatileData = _.findWhere(this.viewData.dataRows, {_id: rowId});
			if( volatileData && typeof Storage !='undefined'){
				localStorage.setItem('dataHash',JSON.stringify(volatileData));
			}
			this.routes.navigate(['/dish-category/manage']);
		}
	}
	delete(rowId:string){
		if(rowId && typeof rowId === 'string'){
			this.catServ.deleteCat(rowId)
			.subscribe(response=>{
				if(response){
					this.viewData.dataRows = _.without(this.viewData.dataRows,_.findWhere(this.viewData.dataRows,{_id:response.resultId}));
					this.utils.showNotification('top','right','success',response.message);
				}
			},this.utils.showErrorResoponse)
		}
	}

}
