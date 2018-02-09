import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';

import { dcatRoutes } from './dish-category.routing';

import { DishCategoryComponent } from './dish-category.component';
import { DishCategoryService } from './service/dish-category.service';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(dcatRoutes),
    ReactiveFormsModule,
    FormsModule,
    HttpModule
  ],
  declarations: [ DishCategoryComponent ],
  providers : [ DishCategoryService ]
})

export class DishCategoryModule { }
