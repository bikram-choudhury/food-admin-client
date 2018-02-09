import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { HubComponent } from './hub.component';
import { HubService } from './service/hub.service';

import { hubRoute } from './hub.routing';

@NgModule({
	imports:[
				RouterModule.forChild(hubRoute),
				CommonModule,
				FormsModule,
				ReactiveFormsModule,
				HttpModule
			],
	declarations:[HubComponent],
	providers:[HubService]
})

export class hubModule {}