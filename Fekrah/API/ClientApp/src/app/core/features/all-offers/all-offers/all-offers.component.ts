// all-offers.component.ts
import { Component, OnInit, OnDestroy, ChangeDetectionStrategy, ChangeDetectorRef, TrackByFunction } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subject, BehaviorSubject, Observable, combineLatest } from 'rxjs';
import { takeUntil, debounceTime, distinctUntilChanged, startWith, map } from 'rxjs/operators';

export interface FilterOptions {
  categories: Category[];
  conditions: string[];
  priceRanges: PriceRange[];
  brands: string[];
}

export interface Category {
  id: number;
  name: string;
  count: number;
}

export interface PriceRange {
  label: string;
  min: number;
  max: number;
}

export interface Offer {
  id: number;
  name: string;
  price: number;
  oldPrice?: number;
  discount?: number;
  condition: 'New' | 'Used' | 'Refurbished';
  sellerName: string;
  sellerId: number;
  description: string;
  imageUrl: string;
  category: string;
  categoryId: number;
  brand?: string;
  rating?: number;
  reviewsCount?: number;
  inStock: boolean;
  fastDelivery?: boolean;
  location?: string;
  featured?: boolean;
  createdAt: Date;
}

export interface OffersResponse {
  offers: Offer[];
  totalCount: number;
  totalPages: number;
  currentPage: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

@Component({
  selector: 'app-all-offers',
  templateUrl: './all-offers.component.html',
  styleUrls: ['./all-offers.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AllOffersComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();

  // Data observables
  offers$ = new BehaviorSubject<Offer[]>([]);
  totalCount$ = new BehaviorSubject<number>(0);
  isLoading$ = new BehaviorSubject<boolean>(true);

  // Filter and search
  filterForm: FormGroup;
  searchTerm$ = new BehaviorSubject<string>('');
  filterOptions: FilterOptions = {
    categories: [],
    conditions: ['جديد', 'مستعمل', 'مجدد'],
    priceRanges: [
      { label: 'أقل من 500 ج.م', min: 0, max: 500 },
      { label: '500 - 1000 ج.م', min: 500, max: 1000 },
      { label: '1000 - 2000 ج.م', min: 1000, max: 2000 },
      { label: '2000 - 5000 ج.م', min: 2000, max: 5000 },
      { label: 'أكثر من 5000 ج.م', min: 5000, max: 999999 }
    ],
    brands: []
  };

  // Pagination
  currentPage = 1;
  pageSize = 12;
  totalPages = 0;

  // View options
  viewMode: 'grid' | 'list' = 'grid';
  sortBy: 'latest' | 'price-low' | 'price-high' | 'discount' | 'rating' = 'latest';

  // UI state
  showFilters = false;
  selectedFilters: any = {};

  // Add Math reference for template
  Math = Math;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef
  ) {
    this.filterForm = this.createFilterForm();
  }

  ngOnInit(): void {
    this.setupFilterOptions();
    this.setupSearchAndFilters();
    this.loadOffers();
    this.handleRouteParams();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  // TrackBy function for ngFor optimization
  trackByOfferIdFn: TrackByFunction<Offer> = (index: number, offer: Offer) => offer.id;

  private createFilterForm(): FormGroup {
    return this.fb.group({
      searchTerm: [''],
      categories: [[]],
      conditions: [[]],
      priceRange: [null],
      brands: [[]],
      inStockOnly: [false],
      fastDeliveryOnly: [false],
      discountOnly: [false]
    });
  }

  private setupFilterOptions(): void {
    // تحميل الفئات من الخدمة
    this.filterOptions.categories = [
      { id: 1, name: 'إضاءة', count: 156 },
      { id: 2, name: 'تبريد', count: 98 },
      { id: 3, name: 'وقود', count: 87 },
      { id: 4, name: 'تكييف', count: 76 },
      { id: 5, name: 'زيوت', count: 134 },
      { id: 6, name: 'تعليق', count: 92 },
      { id: 7, name: 'إلكترونيات', count: 65 },
      { id: 8, name: 'فرامل', count: 112 },
      { id: 9, name: 'إطارات', count: 89 },
      { id: 10, name: 'عادم', count: 54 }
    ];

    this.filterOptions.brands = [
      'هونداي', 'نيسان', 'تويوتا', 'BMW', 'مرسيدس', 'أودي',
      'فولكس فاجن', 'كيا', 'شيفروليه', 'فورد', 'مازدا', 'شل'
    ];
  }

  private setupSearchAndFilters(): void {
    // مراقبة تغييرات البحث والفلاتر
    combineLatest([
      this.filterForm.valueChanges.pipe(startWith(this.filterForm.value)),
      this.searchTerm$.pipe(debounceTime(300), distinctUntilChanged())
    ]).pipe(
      takeUntil(this.destroy$)
    ).subscribe(([filters, searchTerm]) => {
      this.applyFiltersAndSearch(filters, searchTerm);
    });
  }

  private handleRouteParams(): void {
    this.route.queryParams.pipe(
      takeUntil(this.destroy$)
    ).subscribe(params => {
      if (params['category']) {
        this.filterForm.patchValue({
          categories: [parseInt(params['category'])]
        });
      }
      if (params['search']) {
        this.searchTerm$.next(params['search']);
        this.filterForm.patchValue({
          searchTerm: params['search']
        });
      }
    });
  }

  private loadOffers(): void {
    this.isLoading$.next(true);

    // محاكاة تحميل البيانات - في التطبيق الحقيقي ستكون من API
    setTimeout(() => {
      const mockOffers = this.generateMockOffers();
      this.offers$.next(mockOffers);
      this.totalCount$.next(1250);
      this.totalPages = Math.ceil(1250 / this.pageSize);
      this.isLoading$.next(false);
      this.cdr.detectChanges();
    }, 1000);
  }

  private generateMockOffers(): Offer[] {
    const categories = ['إضاءة', 'تبريد', 'وقود', 'تكييف', 'زيوت', 'تعليق', 'إلكترونيات', 'فرامل', 'إطارات', 'عادم'];
    const brands = ['هونداي', 'نيسان', 'تويوتا', 'BMW', 'مرسيدس', 'أودي', 'فولكس فاجن', 'كيا', 'شيفروليه', 'فورد'];
    const conditions: Array<'New' | 'Used' | 'Refurbished'> = ['New', 'Used', 'Refurbished'];
    const locations = ['القاهرة', 'الجيزة', 'الإسكندرية', 'شبرا الخيمة', 'المنصورة', 'طنطا'];

    return Array.from({ length: 48 }, (_, index) => {
      const basePrice = Math.floor(Math.random() * 3000) + 200;
      const discount = Math.random() > 0.6 ? Math.floor(Math.random() * 30) + 5 : undefined;
      const oldPrice = discount ? Math.floor(basePrice / (1 - discount / 100)) : undefined;

      return {
        id: index + 1,
        name: `قطعة غيار ${categories[Math.floor(Math.random() * categories.length)]} ${brands[Math.floor(Math.random() * brands.length)]}`,
        price: basePrice,
        oldPrice,
        discount,
        condition: conditions[Math.floor(Math.random() * conditions.length)],
        sellerName: `متجر ${Math.floor(Math.random() * 100) + 1}`,
        sellerId: Math.floor(Math.random() * 50) + 1,
        description: 'قطعة غيار أصلية عالية الجودة مع ضمان الجودة والأداء المثالي',
        imageUrl: 'assets/images/image_100_100.png',
        category: categories[Math.floor(Math.random() * categories.length)],
        categoryId: Math.floor(Math.random() * 10) + 1,
        brand: brands[Math.floor(Math.random() * brands.length)],
        rating: Math.random() * 2 + 3, // بين 3 و 5
        reviewsCount: Math.floor(Math.random() * 200) + 10,
        inStock: Math.random() > 0.2,
        fastDelivery: Math.random() > 0.5,
        location: locations[Math.floor(Math.random() * locations.length)],
        featured: Math.random() > 0.8,
        createdAt: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000) // آخر 30 يوم
      };
    });
  }

  private applyFiltersAndSearch(filters: any, searchTerm: string): void {
    this.selectedFilters = { ...filters, searchTerm };
    // في التطبيق الحقيقي، سترسل الفلاتر إلى API
    this.loadOffers();
  }

  // Public methods for template
  onSearch(event: any): void {
    this.searchTerm$.next(event?.target?.value);
  }

  onSortChange(sortBy: any): void {
    this.sortBy = sortBy?.target?.value as any;
    this.loadOffers();
  }

  onViewModeChange(mode: 'grid' | 'list'): void {
    this.viewMode = mode;
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    this.loadOffers();
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  onFilterChange(): void {
    this.currentPage = 1;
    this.loadOffers();
  }

  clearFilters(): void {
    this.filterForm.reset();
    this.searchTerm$.next('');
    this.selectedFilters = {};
  }

  toggleFilters(): void {
    this.showFilters = !this.showFilters;
  }

  viewOfferDetails(offer: Offer): void {
    this.router.navigate(['/parts', offer.id]);
  }

  addToCart(offer: Offer, event: Event): void {
    event.stopPropagation();
    // منطق إضافة للسلة
    console.log('Adding to cart:', offer);
  }

  addToWishlist(offer: Offer, event: Event): void {
    event.stopPropagation();
    // منطق إضافة للمفضلة
    console.log('Adding to wishlist:', offer);
  }

  contactSeller(offer: Offer, event: Event): void {
    event.stopPropagation();
    // منطق التواصل مع البائع
    this.router.navigate(['/seller', offer.sellerId]);
  }

  // Utility methods
  formatPrice(price: number): string {
    return new Intl.NumberFormat('ar-SA', {
      style: 'currency',
      currency: 'EGP',
      minimumFractionDigits: 0
    }).format(price);
  }

  getDiscountAmount(offer: Offer): number {
    return offer.oldPrice ? offer.oldPrice - offer.price : 0;
  }

  hasDiscount(offer: Offer): boolean {
    return !!offer.discount && offer.discount > 0;
  }

  isOfferNew(offer: Offer): boolean {
    return offer.condition === 'New';
  }

  getConditionInArabic(condition: string): string {
    const conditionMap: { [key: string]: string } = {
      'New': 'جديد',
      'Used': 'مستعمل',
      'Refurbished': 'مجدد'
    };
    return conditionMap[condition] || condition;
  }

  onImageError(event: Event): void {
    const img = event.target as HTMLImageElement;
    img.src = 'assets/images/placeholder-car-part.png';
    img.alt = 'صورة غير متوفرة';
  }
}
