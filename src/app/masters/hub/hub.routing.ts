import { Routes } from '@angular/router';

import { HubComponent } from './hub.component';

export const hubRoute:Routes = [
	{
		path:'',
		children:[{
			path: 'manage',
			component:HubComponent,
			data:{
				type:'manage'
			}
		},{
			path: 'view',
			component:HubComponent,
			data:{
				type:'view'
			}
		}]
	}
];