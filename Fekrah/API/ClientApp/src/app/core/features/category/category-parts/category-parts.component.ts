import { Component, OnInit } from '@angular/core';
import { CarPart } from 'src/app/Shared/Models/car-card';

// مفاتيح الفلاتر المدعومة
type FilterKey = 'brands' | 'models' | 'years' | 'types' | 'categories' | 'condition';

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
    models: string[];
    years: string[];
    types: string[];
    categories: string[];
    condition: string[]; // ✅ الحالة
    priceRange: {
      min: number | null;
      max: number | null;
    };
  } = {
    brands: [],
    models: [],
    years: [],
    types: [],
    categories: [],
    condition: [],
    priceRange: { min: null, max: null }
  };

  availableBrands = ['تويوتا', 'نيسان', 'هيونداي', 'كيا'];
  availableModels = [
    'كورولا',
    'كامري',
    'يارس',
    'راف 4',
    'لاند كروزر',
    'برادو',
    'هايلوكس',
    'فورتشنر',
    'أفانتي',
    'سوناتا',
    'إلنترا',
    'توسان',
    'سانتافي',
    'سيفيك',
    'أكورد',
    'سي آر-في',
    'أوديسي',
    'سنترا',
    'ألتيما',
    'ماكسيما',
    'باترول',
    'إكس تريل',
    'نافارا',
    'سبورتاج',
    'سيراتو',
    'بيكانتو',
    'سورينتو',
    'ريو',
    'CX-5',
    'CX-9',
    'مازدا 3',
    'مازدا 6',
    'تشارجر',
    'تشالنجر',
    'دورانجو',
    'رام 1500',
    'موستنج',
    'إكسبلورر',
    'فيوجن',
    'فوكاس',
    'إف-150',
    'ماليبو',
    'إمبالا',
    'كابتيفا',
    'تاهو',
    'سوبربان',
    'سيلفرادو',
    'كروز',
    'إسكاليد',
    'جي إم سي يوكن',
    'أكاديا',
    'تيرين',
    'رانجلر',
    'جراند شيروكي',
    'كومباس',
    'كليو',
    'ميغان',
    'بيجو 301',
    'بيجو 508',
    'ستروين C5',
    'سكودا أوكتافيا',
    'سكودا سوبيرب',
    'فولكس باسات',
    'جيتا',
    'تيغوان'
  ];

  availableYears = [
    '2024', '2023', '2022', '2021', '2020',
    '2019', '2018', '2017', '2016', '2015',
    '2014', '2013', '2012', '2011', '2010',
    '2009', '2008', '2007', '2006', '2005',
    '2004', '2003', '2002', '2001', '2000'
  ];

  availableTypes = ['أصلي', 'تجاري'];
  availableCategories = ['قطع المحرك', 'قطع كهربائية', 'الفلاتر', 'القطع الداخلية'];
  availableConditions = ['جديد', 'مستعمل', 'مستورد']; // ✅ الحالات المتاحة

  constructor() {}

  ngOnInit(): void {
    this.selectedFilters.priceRange.min = 1000;
    this.selectedFilters.priceRange.max = 30000;
    this.getMockData();
    this.filteredParts = [...this.allParts];
    this.updateDisplayParts();
  }

  activeFilterSection: string | null = null;

  filterSections = [
    { key: 'brands', title: 'الماركة', icon: 'fa-car' },
    { key: 'models', title: 'الموديل', icon: 'fa-car' },
    { key: 'years', title: 'السنة', icon: 'fa-calendar' },
    { key: 'types', title: 'النوع', icon: 'fa-tools' },
    { key: 'price', title: 'نطاق السعر', icon: 'fa-tag' },
    { key: 'categories', title: 'الفئة', icon: 'fa-list' },
    { key: 'condition', title: 'الحالة', icon: 'fa-check-circle' } // ✅ الحالة بدلاً من التوفر
  ];

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
    const { brands, years, types, categories, condition, priceRange } = this.selectedFilters;
    let count = brands.length + years.length + types.length + categories.length + condition.length;
    if (priceRange.min !== null) count++;
    if (priceRange.max !== null) count++;
    return count;
  }

  applyFilters() {
    this.filteredParts = this.allParts.filter(part => {
      const matchesBrand = this.selectedFilters.brands.length === 0 || this.selectedFilters.brands.includes(part.car.brand);
      const matchesModels = this.selectedFilters.models.length === 0 || this.selectedFilters.models.includes(part.car.model);
      const matchesYear = this.selectedFilters.years.length === 0 || this.selectedFilters.years.includes(part.car.year);
      const matchesType = this.selectedFilters.types.length === 0 || this.selectedFilters.types.includes(part.partType);
      const matchesCategory = this.selectedFilters.categories.length === 0 || this.selectedFilters.categories.includes(this.getCategoryForPart(part));
      const matchesCondition = this.selectedFilters.condition.length === 0 || this.selectedFilters.condition.includes(part.condition);
      const matchesMinPrice = this.selectedFilters.priceRange.min == null || part.priceAfterDiscount >= this.selectedFilters.priceRange.min;
      const matchesMaxPrice = this.selectedFilters.priceRange.max == null || part.priceAfterDiscount <= this.selectedFilters.priceRange.max;

      return matchesBrand && matchesModels && matchesYear && matchesType &&
             matchesCategory && matchesCondition && matchesMinPrice && matchesMaxPrice;
    });

    this.currentPage = 1;
    this.updateDisplayParts();
  }

  clearAllFilters() {
    this.selectedFilters = {
      brands: [],
      models: [],
      years: [],
      types: [],
      categories: [],
      condition: [],
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
        name: 'فلتر زيت',
        subtitle: 'فلتر زيت جديد فرز تاني',
        condition: 'جديد',
        store: { name: 'تبريد الخليج', phone: '01000000524' },
        car: { brand: 'كيا', model: 'ريو', year: '2019' },
        price: 1917,
        priceAfterDiscount: 1629,
        discount: 15,
        isFavorite: true,
        hasDelivery: true,
        grade: 'فرز تاني',
        partType: 'ياباني',
        origin: 'اليابان'
      },
      {
        id: '1001',
        name: 'رديتر مياه',
        subtitle: 'رديتر مياه مستعمل فرز أول',
        condition: 'مستعمل',
        store: { name: 'مكيفات الشرق', phone: '01000000518' },
        car: { brand: 'نيسان', model: 'سنترا', year: '2022' },
        price: 1365,
        priceAfterDiscount: 1228,
        discount: 10,
        isFavorite: true,
        hasDelivery: false,
        grade: 'فرز أول',
        partType: 'كوري',
        origin: 'اليابان'
      },
      {
        id: '1002',
        name: 'بطارية',
        subtitle: 'بطارية مستعمل فرز تاني',
        condition: 'مستعمل',
        store: { name: 'وقود بلس', phone: '01000000873' },
        car: { brand: 'شيفروليه', model: 'تاهو', year: '2013' },
        price: 1718,
        priceAfterDiscount: 1546,
        discount: 10,
        isFavorite: false,
        hasDelivery: true,
        grade: 'فرز تاني',
        partType: 'صيني',
        origin: 'كوريا'
      },
      {
        id: '1003',
        name: 'فلتر زيت',
        subtitle: 'فلتر زيت مستعمل فرز أول',
        condition: 'مستعمل',
        store: { name: 'وقود بلس', phone: '01000000119' },
        car: { brand: 'تويوتا', model: 'كامري', year: '2021' },
        price: 1370,
        priceAfterDiscount: 1164,
        discount: 15,
        isFavorite: true,
        hasDelivery: true,
        grade: 'فرز أول',
        partType: 'كوري',
        origin: 'الصين'
      },
      {
        id: '1004',
        name: 'فلتر زيت',
        subtitle: 'فلتر زيت مستعمل فرز أول',
        condition: 'مستعمل',
        store: { name: 'تبريد الخليج', phone: '01000000269' },
        car: { brand: 'شيفروليه', model: 'كابتيفا', year: '2015' },
        price: 1493,
        priceAfterDiscount: 1418,
        discount: 5,
        isFavorite: true,
        hasDelivery: true,
        grade: 'فرز أول',
        partType: 'ياباني',
        origin: 'اليابان'
      }
    ];
  }


}
