import { Component } from '@angular/core';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  filtersOpened = false; // ✅ الحالة الافتراضية مقفول

  latestParts = [
    {
      id: 11,
      name: 'موتور مساحات',
      price: 475,
      oldPrice: 550,
      discount: 15,
      condition: 'New',
      sellerName: 'محل المتانة',
      sellerId: '11',
      description: 'موتور مساحات قوي مناسب للجو المطري.',
      imageUrl: 'assets/images/image100_100.png'
    },
    {
      id: 12,
      name: 'كمبيوتر سيارة مستعمل',
      price: 2200,
      oldPrice: 2900,
      discount: 24,
      condition: 'Used',
      sellerName: 'الإلكترونيات الحديثة',
      sellerId: '12',
      description: 'كمبيوتر سيارة بحالة ممتازة مع ضمان شهر.',
      imageUrl: 'assets/images/image100_100.png'
    }
    // 🔁 أضف المزيد حسب رغبتك
  ];

  toggleFilters() {
    this.filtersOpened = !this.filtersOpened; // ✅ كل ضغطة تغير حالة الفلتر
  }

}
