import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PartsComponent } from './parts.component';
import { PartDetailsComponent } from './part-details/part-details.component';
import { BrandPartsComponent } from './brand-parts/brand-parts.component';

const routes: Routes = [
  { path: 'brand/:id', component: BrandPartsComponent }, // أولاً
  { path: ':id', component: PartDetailsComponent },       // بعده
  { path: '', component: PartsComponent }                 // في النهاية
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PartsRoutingModule { }
