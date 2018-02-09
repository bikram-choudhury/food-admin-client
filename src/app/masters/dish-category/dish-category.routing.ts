import { Routes } from '@angular/router';
import { DishCategoryComponent } from './dish-category.component';

export const dcatRoutes: Routes = [
	{
		path:'',
		children:[{
			path : 'manage',
			component : DishCategoryComponent,
			data : {
				type: 'manage'
			}
		},{
			path : 'view',
			component : DishCategoryComponent,
			data : {
				type: 'view'
			}
		}]
	}
];