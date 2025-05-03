import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SellerPageComponent } from './seller-page/seller-page.component';

const routes: Routes = [  { path: ':id', component: SellerPageComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SellerRoutingModule { }
