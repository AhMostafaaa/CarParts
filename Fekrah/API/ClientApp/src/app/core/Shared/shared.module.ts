import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
// import { FooterComponent } from './layout/footer/footer.component'; // 👈 أضفها هنا كمان

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    RouterModule,

  ],
  exports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    RouterModule,

  ],
  declarations: [
    ]
})
export class SharedModule { }
