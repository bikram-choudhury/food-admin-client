import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { TaxComponent } from './tax.component';
import { TaxService } from './service/tax.service';

import { taxRoute } from './tax.routing';

@NgModule({
	imports:[
				RouterModule.forChild(taxRoute),
				CommonModule,
				FormsModule,
				ReactiveFormsModule,
				HttpModule
			],
	declarations:[TaxComponent],
	providers:[TaxService]
})

export class taxModule {}