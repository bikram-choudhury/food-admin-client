import { Routes } from '@angular/router';
import { OutletComponent } from './outlet.component';

export const outletRoute:Routes = [
	{
		path:'',
		children:[{
			path:'manage',
			component: OutletComponent,
			data:{
				type:'manage'
			}
		},{
			path:'view',
			component: OutletComponent,
			data:{
				type:'view'
			}
		}]
	}
];