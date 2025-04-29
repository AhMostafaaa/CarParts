import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PartsComponent } from './parts.component';
import { PartDetailsComponent } from './part-details/part-details.component';

const routes: Routes = [
  { path: '', component: PartsComponent },
  { path: ':id', component: PartDetailsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PartsRoutingModule { }
