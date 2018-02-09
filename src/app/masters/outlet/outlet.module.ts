import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { OutletComponent } from './outlet.component';
import { outletRoute } from './outlet.routing';
import { OutletService } from './service/outlet.service';
import { HubService } from './../hub/service/hub.service';

@NgModule({
	imports:[
		RouterModule.forChild(outletRoute),
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		HttpModule
	],
	declarations:[
		OutletComponent
	],
	providers:[
		OutletService,
		HubService
	]
})

export class outletModule {
	
}