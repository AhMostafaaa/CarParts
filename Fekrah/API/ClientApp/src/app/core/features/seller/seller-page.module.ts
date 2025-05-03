import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SellerRoutingModule } from './seller-routing.module';
import { SellerPageComponent } from './seller-page/seller-page.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    SellerPageComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    SellerRoutingModule
  ]
})
export class SellerModule { }
