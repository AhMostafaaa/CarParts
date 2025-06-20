import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SellerRoutingModule } from './seller-routing.module';
import { SellerPageComponent } from './seller-page/seller-page.component';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../../../Shared/shared.module';


@NgModule({
  declarations: [
    SellerPageComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    SellerRoutingModule,
    SharedModule
  ]
})
export class SellerModule { }
