import { Routes } from '@angular/router';
import { DishComponent } from './dish.component';

export const dishRoute:Routes = [
	{
		path:'',
		children:[{
			path:'manage',
			component: DishComponent,
			data:{
				type:'manage'
			}
		},{
			path:'view',
			component: DishComponent,
			data:{
				type:'view'
			}
		}]
	}
];