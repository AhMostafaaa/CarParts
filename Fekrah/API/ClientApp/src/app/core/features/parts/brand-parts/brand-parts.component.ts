import { Component, Input, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { Subject, debounceTime, takeUntil } from 'rxjs';


@Component({
  selector: 'app-brand-parts',
  templateUrl: './brand-parts.component.html',
  styleUrls: ['./brand-parts.component.scss']
})
export class BrandPartsComponent implements OnInit, OnDestroy {
  @Input() brandName: string = 'تويوتا';
  @Input() brandDescription: string = 'أفضل قطع الغيار الأصلية والمستوردة';
  @Input() parts: any[] = [];
  @Input() isLoading: boolean = false;

  @Output() partClick = new EventEmitter<any>();
  @Output() filtersChange = new EventEmitter<any>();

  selectedCondition: string = 'all';
  selectedPrice: string = 'all';
  selectedCategory: string = 'all';
  selectedYear: string = 'all';
  selectedCarModel: string = 'all';

  displayParts: any[] = [];
  categories: string[] = [];
  modelYears: number[] = [];
  carModels: string[] = [];

  private destroy$ = new Subject<void>();
  private filterSubject = new Subject<void>();


  constructor() {
    if (this.parts.length === 0) {
      this.initializeSampleData();
    }
  }

  private initializeSampleData(): void {
    const types = ['كوري', 'ياباني', 'صيني'];
    this.parts = Array.from({ length: 20 }, (_, index) => ({
      id: (index + 1).toString(),
      name: `قطعة ${index + 1}`,
      category: index % 2 === 0 ? 'قطع المحرك' : 'نظام الفرامل',
      condition: index % 3 === 0 ? 'جديد' : index % 3 === 1 ? 'استيراد' : 'مستعمل',
      price: 200 + index * 50,
      modelYear: 2021 + (index % 4),
      availability: index % 4 !== 0,
      description: 'قطعة اختبارية',
      imageUrl: 'assets/images/image_100_100.png',
      storeName: `متجر ${index % 3 + 1}`,
      type: types[index % types.length],
      carModel: ['ريو', 'بيكانتو', 'سيراتو'][index % 3]
    }));
  }

  ngOnInit(): void {
    this.initializeComponent();
    this.setupFilterDebounce();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private initializeComponent(): void {
    this.extractCategories();
    this.extractModelYears();
    this.extractCarModels();
    this.displayParts = [...this.parts];
  }

  private setupFilterDebounce(): void {
    this.filterSubject
      .pipe(
        debounceTime(300),
        takeUntil(this.destroy$)
      )
      .subscribe(() => {
        this.performFilter();
      });
  }

  private extractCategories(): void {
    const uniqueCategories = [...new Set(this.parts.map(part => part.category))];
    this.categories = uniqueCategories.sort();
  }

  private extractModelYears(): void {
    const uniqueYears = [...new Set(this.parts.map(part => part.modelYear))];
    this.modelYears = uniqueYears.sort((a, b) => b - a);
  }

  private extractCarModels(): void {
    const uniqueModels = [...new Set(this.parts.map(part => part.carModel).filter(Boolean))];
    this.carModels = (uniqueModels.filter((model): model is string => model !== undefined)).sort();
  }

  applyFilters(): void {
    this.filterSubject.next();
  }

  private performFilter(): void {
    let filtered = [...this.parts];

    if (this.selectedCondition !== 'all') {
      filtered = filtered.filter(part => part.condition === this.selectedCondition);
    }

    if (this.selectedPrice !== 'all') {
      filtered = filtered.filter(part => this.isPriceInRange(part.price));
    }

    if (this.selectedCategory !== 'all') {
      filtered = filtered.filter(part => part.category === this.selectedCategory);
    }

    if (this.selectedYear !== 'all') {
      filtered = filtered.filter(part => part.modelYear.toString() === this.selectedYear);
    }

    if (this.selectedCarModel !== 'all') {
      filtered = filtered.filter(part => part.carModel === this.selectedCarModel);
    }

    this.displayParts = filtered;
    this.emitFiltersChange();
  }

  private isPriceInRange(price: number): boolean {
    switch (this.selectedPrice) {
      case 'lt500': return price < 500;
      case '500-1000': return price >= 500 && price <= 1000;
      case '1000-2000': return price >= 1000 && price <= 2000;
      case 'gt2000': return price > 2000;
      default: return true;
    }
  }

  resetFilters(): void {
    this.selectedCondition = 'all';
    this.selectedPrice = 'all';
    this.selectedCategory = 'all';
    this.selectedYear = 'all';
    this.selectedCarModel = 'all';
    this.applyFilters();
  }

  private emitFiltersChange(): void {
    const filterData = {
      condition: this.selectedCondition,
      price: this.selectedPrice,
      category: this.selectedCategory,
      year: this.selectedYear,
      carModel: this.selectedCarModel,
      resultCount: this.displayParts.length
    };
    this.filtersChange.emit(filterData);
  }

  onPartClick(part: any): void {
    this.partClick.emit(part);
  }

  onSelectFocus(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    const filterGroup = selectElement.closest('.filter-group') as HTMLElement;
    if (filterGroup) {
      filterGroup.style.transform = 'scale(1.02)';
    }
  }

  onSelectBlur(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    const filterGroup = selectElement.closest('.filter-group') as HTMLElement;
    if (filterGroup) {
      filterGroup.style.transform = 'scale(1)';
    }
  }

  getAvailableCount(): number {
    return this.displayParts.filter(part => part.availability).length;
  }

  getUniqueCategories(): number {
    const uniqueCategories = new Set(this.displayParts.map(part => part.category));
    return uniqueCategories.size;
  }

  trackByPartId(index: number, part: any): string {
    return part.id;
  }

  get hasResults(): boolean {
    return this.displayParts.length > 0;
  }

  get isFilterActive(): boolean {
    return this.selectedCondition !== 'all' ||
      this.selectedPrice !== 'all' ||
      this.selectedCategory !== 'all' ||
      this.selectedYear !== 'all' ||
      this.selectedCarModel !== 'all';
  }

  formatPrice(price: number): string {
    return new Intl.NumberFormat('ar-EG', {
      style: 'currency',
      currency: 'EGP',
      minimumFractionDigits: 0
    }).format(price);
  }

  getCategoryIcon(category: string): string {
    const iconMap: { [key: string]: string } = {
      'قطع المحرك': '🔧',
      'نظام الفرامل': '🛑',
      'نظام التعليق': '🏗️',
      'النظام الكهربائي': '⚡',
      'قطع الهيكل': '🚗'
    };
    return iconMap[category] || '🔧';
  }

  getConditionClass(condition: string): string {
    const classMap: { [key: string]: string } = {
      'جديد': 'new-condition',
      'استيراد': 'imported-condition',
      'مستعمل': 'used-condition'
    };
    return classMap[condition] || '';
  }
}
