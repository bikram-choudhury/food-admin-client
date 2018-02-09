import { Routes } from '@angular/router';

import { TaxComponent } from './tax.component';

export const taxRoute:Routes = [
	{
		path:'',
		children:[{
			path: 'manage',
			component:TaxComponent,
			data:{
				type:'manage'
			}
		},{
			path: 'view',
			component:TaxComponent,
			data:{
				type:'view'
			}
		}]
	}
];