import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboar-main/dashboard.component';
import { StatisticsComponent } from './statistics/statistics.component';

const routes: Routes = [
  { path: '',component: DashboardComponent},
    { path: 'statistics', component: StatisticsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
