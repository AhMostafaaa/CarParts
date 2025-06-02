import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { SharedModule } from '../Shared/shared.module';
import { DashboardComponent } from './dashboar-main/dashboard.component';
import { QuickAddFormComponent } from './quick-add-form/quick-add-form.component';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [DashboardComponent,QuickAddFormComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DashboardRoutingModule,
    SharedModule
  ]
})
export class DashboardModule { }
