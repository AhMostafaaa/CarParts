import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryRoutingModule } from './category-routing.module';
import { CategoryPartsComponent } from './category-parts/category-parts.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../Shared/shared.module';

@NgModule({
  declarations: [
    CategoryPartsComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    CategoryRoutingModule,
    SharedModule
  ]
})
export class CategoryModule { }
