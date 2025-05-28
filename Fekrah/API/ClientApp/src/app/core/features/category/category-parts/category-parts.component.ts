import { Component, OnInit } from '@angular/core';
import { CarPart } from 'src/app/Shared/Models/car-card';



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
  searchText = '';
  categoryName = 'كهرباء';
  suggestions: string[] = [];
  searchFocused = false;

  allParts: CarPart[] = [];
filteredParts: CarPart[] = [];
displayParts: CarPart[] = [];


  constructor() { }

  ngOnInit(): void {
    this.getMockData();
    this.filteredParts = [...this.allParts];
    this.updateDisplayParts();
    this.updateDisplayParts();
  }

  toggleSidebar() {
    this.showSidebar = !this.showSidebar;
  }

  changePageSize(event: any) {
    this.pageSize = +event.target.value;
    this.currentPage = 1;
    this.updateDisplayParts();
  }

  pageChanged(event: number) {
    this.currentPage = event;
    this.updateDisplayParts();
  }

  updateDisplayParts() {
    const start = (this.currentPage - 1) * this.pageSize;
    const end = start + this.pageSize;
    this.displayParts = this.filteredParts.slice(start, end);
  }

  trackByPartId(index: number, part: any): number {
    return part.id;
  }

  onPartClick(part: any) {
    console.log('Part clicked:', part);
    // مثال: فتح مودال أو توجيه لصفحة تفاصيل
  }

  getMockData() {
   
    this.allParts = [
      {
        id: '1000',
        name: 'فلتر مكيف داخلي',
        subtitle: 'فلتر مكيف داخلي أصلي وجديد',
        condition: 'جديد',
        store: { name: 'العفشة العالمية', phone: '01000000007' },
        car: { brand: 'ميتسوبيشي', model: 'كورولا', year: '2016' },
        price: 212,
        priceAfterDiscount: 159,
        discount: 25,
        isFavorite: false,
        hasDelivery: true,
        grade: 'فرز تاني',
        partType: 'كوري',
        origin: 'كوريا'
      },
      {
        id: '1001',
        name: 'بطارية فارتا',
        subtitle: 'بطارية فارتا أصلي وجديد',
        condition: 'جديد',
        store: { name: 'ورشة التبريد العالمية', phone: '01000000002' },
        car: { brand: 'نيسان', model: 'إلنترا', year: '2017' },
        price: 535,
        priceAfterDiscount: 428,
        discount: 20,
        isFavorite: false,
        hasDelivery: true,
        grade: 'فرز أول',
        partType: 'ياباني',
        origin: 'اليابان'
      },
      {
        id: '1002',
        name: 'بطارية فارتا',
        subtitle: 'بطارية فارتا أصلي وجديد',
        condition: 'جديد',
        store: { name: 'تكييف السيارات الحديث', phone: '01000000004' },
        car: { brand: 'تويوتا', model: 'سيراتو', year: '2020' },
        price: 1541,
        priceAfterDiscount: 1232,
        discount: 20,
        isFavorite: false,
        hasDelivery: true,
        grade: 'فرز تاني',
        partType: 'صيني',
        origin: 'الصين'
      },
      {
        id: '1003',
        name: 'طرمبة بنزين',
        subtitle: 'طرمبة بنزين أصلي وجديد',
        condition: 'جديد',
        store: { name: 'قطع الغيار الممتازة', phone: '01000000006' },
        car: { brand: 'نيسان', model: 'سيراتو', year: '2012' },
        price: 1637,
        priceAfterDiscount: 1227,
        discount: 25,
        isFavorite: false,
        hasDelivery: true,
        grade: 'فرز تاني',
        partType: 'صيني',
        origin: 'الصين'
      },
      {
        id: '1004',
        name: 'فلتر هواء',
        subtitle: 'فلتر هواء أصلي وجديد',
        condition: 'جديد',
        store: { name: 'الإلكترونيات الحديثة', phone: '01000000009' },
        car: { brand: 'تويوتا', model: 'سيراتو', year: '2022' },
        price: 407,
        priceAfterDiscount: 386,
        discount: 5,
        isFavorite: false,
        hasDelivery: true,
        grade: 'فرز أول',
        partType: 'صيني',
        origin: 'الصين'
      }
    ];
    

  }

  onSearch(event: any) {
    const text = event.target.value.toLowerCase();
    this.filteredParts = this.allParts.filter(part =>
      part.name.toLowerCase().includes(text)
    );

    this.suggestions = this.allParts
      .map(part => part.name)
      .filter(name => name.toLowerCase().includes(text))
      .slice(0, 5);

    this.currentPage = 1;
    this.updateDisplayParts();
  }

  selectSuggestion(suggestion: string) {
    this.searchText = suggestion;
    this.filteredParts = this.allParts.filter(part =>
      part.name === suggestion
    );
    this.suggestions = [];
    this.currentPage = 1;
    this.updateDisplayParts();
  }
}
