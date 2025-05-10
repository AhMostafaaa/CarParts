import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-category-parts',
  templateUrl: './category-parts.component.html',
  styleUrls: ['./category-parts.component.scss']
})
export class CategoryPartsComponent implements OnInit {

  showSidebar = false;
  pageSize = 12;
  currentPage = 1;
  pageSizeOptions = [12, 24, 36];
  filteredParts = this.getMockData();

  constructor() {}

  ngOnInit(): void {}

  toggleSidebar() {
    this.showSidebar = !this.showSidebar;
  }

  changePageSize(event: any) {
    this.pageSize = +event.target.value;
  }

  pageChanged(event: any) {
    this.currentPage = event;
  }

  getMockData() {
  const types = ['كوري', 'ياباني', 'صيني'];
  const categories = ['محرك', 'إطارات', 'بطاريات', 'زيوت'];
  const brands = ['تويوتا', 'هيونداي', 'كيا', 'نيسان'];

  return Array.from({ length: 100 }).map((_, index) => {
    const isOnSale = index % 3 === 0; // ✅ كل ثالث عنصر يكون عليه عرض
    const basePrice = Math.floor(Math.random() * 1000) + 100;
    const quantity = Math.floor(Math.random() * 20); // ✅ توليد عشوائي للكمية بين 0 و 20

    return {
      id: index + 1,
      name: `قطعة غيار ${index + 1}`,
      category: categories[index % categories.length],
      brand: brands[index % brands.length],
      condition: index % 2 === 0 ? 'جديد' : 'استيراد',
      type: types[index % types.length],
      price: basePrice,
      oldPrice: isOnSale ? basePrice + Math.floor(Math.random() * 500) + 100 : null,
      imageUrl: `../../assets/images/image100_100.png`, // ✅ صورة عشوائية من 1 إلى 5
      storeName: `متجر ${index + 1}`,
      sellerId: index + 100, // ✅ إضافة sellerId لربط التاجر
      sellerPhone: `201000000${String(index).padStart(3, '0')}`, // ✅ رقم تليفون واتساب
      isOnSale: isOnSale,
      freeDelivery: index % 5 === 0,
      quantity: quantity,
      availability: quantity > 0 ? 'متوفر' : 'غير متوفر'
    };
  });
}


}
