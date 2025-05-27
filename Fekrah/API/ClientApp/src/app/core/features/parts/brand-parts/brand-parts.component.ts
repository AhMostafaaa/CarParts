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
  pagedParts: any[] = [];
  categories: string[] = [];
  modelYears: number[] = [];
  carModels: string[] = [];

  itemsPerPage: number = 6;
  currentPage: number = 1;
  itemsPerPageOptions: number[] = [6, 12, 24];
  private destroy$ = new Subject<void>();
  private filterSubject = new Subject<void>();

  constructor() {
    if (this.parts.length === 0) {
      this.initializeSampleData();
    }
  }

  private initializeSampleData(): void {
    const types = ['كوري', 'ياباني', 'صيني'];
    const carBrands = ['تويوتا', 'هيونداي', 'نيسان', 'كيا', 'شيفروليه'];
    const carModels = ['كورولا', 'النترا', 'صني', 'سبورتاج', 'أفيو'];
    const categories = ['قطع المحرك', 'نظام التعليق', 'نظام الفرامل', 'النظام الكهربائي', 'قطع الهيكل'];
  
    const descriptions = [
      'فلتر زيت أصلي يدعم أداء المحرك ويوفر حماية ممتازة.',
      'ردياتير عالي الجودة مناسب للأجواء الحارة ومصمم لتبريد فعال.',
      'كمبروسر تكييف يعمل بكفاءة ويضمن تبريد ممتاز في الصيف.',
      'مساعد خلفي يوفر ثباتًا إضافيًا للسيارة على الطرق الوعرة.',
      'كارتيرة زيت محكمة الإغلاق لمنع أي تسريب وضمان أداء مستقر.',
      'دينامو كهربائي بقدرة عالية وتشغيل مستقر لجميع الأنظمة.',
      'مراية جانبية كهربائية قابلة للطي مع خاصية التسخين.',
      'سير كاتينة مقاوم للتآكل يدعم توقيت المحرك بدقة.',
      'طقم فرامل أمامي مع بطانة ممتازة لعمر أطول وأداء عالي.',
      'عفشة كاملة للجهة اليمنى مناسبة للسير على الطرق غير الممهدة.'
    ];
  
    this.parts = Array.from({ length: 50 }, (_, index) => {
      const brandIndex = index % carBrands.length;
      const modelIndex = index % carModels.length;
      const categoryIndex = index % categories.length;
      const descriptionIndex = index % descriptions.length;
      const price = 500 + index * 25;
      const discount = index % 4 === 0 ? 10 : index % 5 === 0 ? 20 : 0;
  
      return {
        id: (index + 1).toString(),
        name: `${categories[categoryIndex]} - ${carModels[modelIndex]} - ${carBrands[brandIndex]}`,
        description: descriptions[descriptionIndex],
        imageUrl: 'assets/images/image_100_100.png',
        price: price,
        discount: discount,
        priceAfterDiscount: this.calculatePriceAfterDiscount(price, discount),
        condition: index % 3 === 0 ? 'جديد' : index % 3 === 1 ? 'استيراد' : 'مستعمل',
        carBrand: carBrands[brandIndex],
        carModel: carModels[modelIndex],
        modelYear: (2018 + (index % 6)).toString(),
        storeName: `مركز قطع غيار ${brandIndex + 1}`,
        storeId: `store-${brandIndex + 1}`,
        sellerPhone: `010${Math.floor(10000000 + Math.random() * 89999999)}`,
        type: types[index % types.length],
        freeDelivery: index % 6 === 0,
        isFavorite: false
      };
    });
  }
  

  private calculatePriceAfterDiscount(price: number, discount: number): number {
    if (!discount) return price;
    return price - (price * discount / 100);
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
    this.updatePagedParts();
  }

  private setupFilterDebounce(): void {
    this.filterSubject
      .pipe(
        debounceTime(300),
        takeUntil(this.destroy$)
      )
      .subscribe(() => {
        this.currentPage = 1;
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
      filtered = filtered.filter(part => this.isPriceInRange(part.priceAfterDiscount || part.price));
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
    this.updatePagedParts();
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
    this.currentPage = 1;
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

  formatPrice(price: number, discount?: number, priceAfterDiscount?: number): string {
    const formatter = new Intl.NumberFormat('ar-EG', {
      style: 'currency',
      currency: 'EGP',
      minimumFractionDigits: 0
    });

    if (discount && priceAfterDiscount) {
      return `${formatter.format(priceAfterDiscount)} بدلاً من ${formatter.format(price)} (خصم ${discount}%)`;
    }
    return formatter.format(price);
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

  updatePagedParts(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.pagedParts = this.displayParts.slice(startIndex, endIndex);
  }

  nextPage(): void {
    const totalPages = this.getTotalPages();
    if (this.currentPage < totalPages) {
      this.currentPage++;
      this.updatePagedParts();
    }
  }

  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePagedParts();
    }
  }

  goToPage(pageNumber: number): void {
    const totalPages = this.getTotalPages();
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      this.currentPage = pageNumber;
      this.updatePagedParts();
    }
  }

  getTotalPages(): number {
    return Math.ceil(this.displayParts.length / this.itemsPerPage);
  }

  getPagesArray(): number[] {
    const totalPages = this.getTotalPages();
    const maxPagesToShow = 5;
    const pages: number[] = [];

    if (totalPages <= maxPagesToShow) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      const middle = Math.ceil(maxPagesToShow / 2);
      if (this.currentPage <= middle) {
        for (let i = 1; i <= maxPagesToShow; i++) {
          pages.push(i);
        }
        pages.push(-1);
        pages.push(totalPages);
      } else if (this.currentPage >= totalPages - middle + 1) {
        pages.push(1);
        pages.push(-1);
        for (let i = totalPages - maxPagesToShow + 1; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        pages.push(1);
        pages.push(-1);
        for (let i = this.currentPage - Math.floor(middle / 2); i <= this.currentPage + Math.ceil(middle / 2) - 1; i++) {
          pages.push(i);
        }
        pages.push(-1);
        pages.push(totalPages);
      }
    }
    return pages;
  }

  onAddToCart(part: any): void {
    console.log('تمت الإضافة إلى السلة:', part);
    // تقدر تضيف هنا أي لوجيك حقيقي للسلة
  }
  
  onFavoriteToggled(part: any): void {
    console.log('تغيير حالة المفضلة:', part);
    // تقدر تحفظ حالة المفضلة هنا
  }

  
  onItemsPerPageChange(): void {
    this.currentPage = 1;
    this.updatePagedParts();
  }
}