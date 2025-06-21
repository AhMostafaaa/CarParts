import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { PartCardComponent } from './components/part-card/part-card.component';
import { FilterSidebarComponent } from './components/filter-sidebar/filter-sidebar.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { CardComponent } from './components/card/card.component';
import { BreadcrumbComponent } from './components/breadcrumb/breadcrumb.component';
import { OfferCardComponent } from './components/offer-card/offer-card.component';
import { NotFoundComponent } from './components/not-found/not-found.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    RouterModule,
    NgxPaginationModule,


  ],
  exports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    RouterModule,
    PartCardComponent,
    FilterSidebarComponent,
    NgxPaginationModule,
    CardComponent,
    OfferCardComponent,
    BreadcrumbComponent,


  ],
  declarations: [
    PartCardComponent,
    FilterSidebarComponent,
    CardComponent,
    BreadcrumbComponent,
    OfferCardComponent,

  ]
})
export class SharedModule { }
