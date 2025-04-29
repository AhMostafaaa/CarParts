import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  filtersOpened = false; // ✅ الحالة الافتراضية مقفول

  toggleFilters() {
    this.filtersOpened = !this.filtersOpened; // ✅ كل ضغطة تغير حالة الفلتر
  }

}
