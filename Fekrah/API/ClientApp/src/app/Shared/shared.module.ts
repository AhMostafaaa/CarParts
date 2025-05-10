import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { PartCardComponent } from './components/part-card/part-card.component';
import { FilterSidebarComponent } from './components/filter-sidebar/filter-sidebar.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { CardComponent } from './components/card/card.component';
// import { FooterComponent } from './layout/footer/footer.component'; // 👈 أضفها هنا كمان

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    RouterModule,
    NgxPaginationModule

  ],
  exports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    RouterModule,
    PartCardComponent,
    FilterSidebarComponent,
    NgxPaginationModule,
    CardComponent

  ],
  declarations: [
    PartCardComponent,
    FilterSidebarComponent,
    CardComponent,

  ]
})
export class SharedModule { }
