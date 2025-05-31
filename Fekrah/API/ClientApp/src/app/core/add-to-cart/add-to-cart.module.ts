import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddToCartRoutingModule } from './add-to-cart-routing.module';
import { AddToCartComponent } from './add-to-cart.component';
import { SharedModule } from '../../Shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [AddToCartComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AddToCartRoutingModule,
    SharedModule
  ]
})
export class AddToCartModule { }
