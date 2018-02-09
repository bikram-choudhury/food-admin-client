import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { DishComponent } from './dish.component';
import { DishService } from './service/dish.service';

import { dishRoute } from './dish.routing';

@NgModule({
  imports: [
  	RouterModule.forChild(dishRoute),
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule
  ],
  declarations: [ DishComponent ],
  providers:[ DishService ]
})

export class dishModule { }
