import { Component, OnInit } from '@angular/core';
import { CarPart } from 'src/app/Shared/Models/car-card';

// مفاتيح الفلاتر المدعومة
type FilterKey = 'brands' | 'years' | 'types' | 'categories' | 'availability';

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

  selectedFilters: {
    brands: string[];
    years: string[];
    types: string[];
    categories: string[];
    availability: string[];
    priceRange: {
      min: number | null;
      max: number | null;
    };
  } = {
    brands: [],
    years: [],
    types: [],
    categories: [],
    availability: [],
    priceRange: { min: null, max: null }
  };

  availableBrands = ['تويوتا', 'نيسان', 'هيونداي', 'كيا'];
  availableYears = ['2021', '2020', '2019', '2018'];
  availableTypes = ['أصلي', 'تجاري'];
  availableCategories = ['قطع المحرك', 'قطع كهربائية', 'الفلاتر', 'القطع الداخلية'];

  constructor() {}

  ngOnInit(): void {
    this.selectedFilters.priceRange.min = 1000;
    this.selectedFilters.priceRange.max = 30000;
    this.getMockData();
    this.filteredParts = [...this.allParts];
    this.updateDisplayParts();
  }

// متغير لتحديد القسم النشط (المفتوح حاليًا)
activeFilterSection: string | null = null;

// أقسام الفلاتر المعروضة في الـ collapse
filterSections = [
  { key: 'brands', title: 'الماركة', icon: 'fa-car' },
  { key: 'years', title: 'السنة', icon: 'fa-calendar' },
  { key: 'types', title: 'النوع', icon: 'fa-tools' },
  { key: 'price', title: 'نطاق السعر', icon: 'fa-tag' },
  { key: 'categories', title: 'الفئة', icon: 'fa-list' },
  { key: 'availability', title: 'التوفر', icon: 'fa-check-circle' }
];

// دالة تبديل الفتح/الإغلاق لكل قسم
toggleFilterSection(sectionKey: string) {
  this.activeFilterSection = this.activeFilterSection === sectionKey ? null : sectionKey;
}



  toggleSidebar() {
    this.showSidebar = !this.showSidebar;
  }

  closeSidebar() {
    this.showSidebar = false;
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

  toggleFilter(filterType: FilterKey, value: string) {
    const currentFilters = this.selectedFilters[filterType];
    const index = currentFilters.indexOf(value);

    if (index > -1) {
      currentFilters.splice(index, 1);
    } else {
      currentFilters.push(value);
    }

    this.applyFilters();
  }

  getActiveFiltersCount(): number {
    const { brands, years, types, categories, availability, priceRange } = this.selectedFilters;

    let count = brands.length + years.length + types.length + categories.length + availability.length;

    if (priceRange.min !== null && priceRange.min !== undefined) count++;
    if (priceRange.max !== null && priceRange.max !== undefined) count++;

    return count;
  }

  applyFilters() {
    this.filteredParts = this.allParts.filter(part => {
      const matchesBrand = this.selectedFilters.brands.length === 0 || this.selectedFilters.brands.includes(part.car.brand);
      const matchesYear = this.selectedFilters.years.length === 0 || this.selectedFilters.years.includes(part.car.year);
      const matchesType = this.selectedFilters.types.length === 0 || this.selectedFilters.types.includes(part.partType);
      const matchesCategory = this.selectedFilters.categories.length === 0 || this.selectedFilters.categories.includes(this.getCategoryForPart(part));
      const matchesAvailability = this.selectedFilters.availability.length === 0 ||
        (this.selectedFilters.availability.includes('متوفر') && part.hasDelivery) ||
        (this.selectedFilters.availability.includes('غير متوفر') && !part.hasDelivery);

      const matchesMinPrice = this.selectedFilters.priceRange.min == null || part.priceAfterDiscount >= this.selectedFilters.priceRange.min;
      const matchesMaxPrice = this.selectedFilters.priceRange.max == null || part.priceAfterDiscount <= this.selectedFilters.priceRange.max;

      return matchesBrand && matchesYear && matchesType && matchesCategory && matchesAvailability && matchesMinPrice && matchesMaxPrice;
    });

    this.currentPage = 1;
    this.updateDisplayParts();
  }

  clearAllFilters() {
    this.selectedFilters = {
      brands: [],
      years: [],
      types: [],
      categories: [],
      availability: [],
      priceRange: { min: null, max: null }
    };

    this.applyFilters();
  }

  getCategoryForPart(part: CarPart): string {
    if (part.name.includes('فلتر')) return 'الفلاتر';
    if (part.name.includes('بطارية')) return 'قطع كهربائية';
    if (part.name.includes('طرمبة')) return 'قطع المحرك';
    return 'القطع الداخلية';
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
}
