import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SellerRoutingModule } from './seller-routing.module';
import { SellerComponent } from './seller.component';
import { SharedModule } from '../../Shared/shared.module';


@NgModule({
  declarations: [
    SellerComponent
  ],
  imports: [
    SharedModule,
    SellerRoutingModule
  ]
})
export class SellerModule { }
