import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MerchantOrdersComponent } from './merchant-orders/merchant-orders.component';

const routes: Routes = [{
  path: '', component: MerchantOrdersComponent
}
  , {
  path: 'merchant-orders', component: MerchantOrdersComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrderManagerRoutingModule { }
