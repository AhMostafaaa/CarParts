// dashboard.component.ts
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject, debounceTime, distinctUntilChanged, takeUntil } from 'rxjs';
import { CarPart } from '../../Shared/Models/car-card';
export interface FormDataInterface {
  partName: string;
  partCode: string;
  subtitle: string;
  partType: string;
  condition: string;
  grade: string;
  hasWarranty: boolean;
  hasDelivery: boolean;
  isFavorite: boolean;
  carBrands: string[];
  carModels: string[];
  yearFrom: number | null;
  yearTo: number | null;
  allYears: boolean;
  price: number;
  discount: number;
  priceAfterDiscount: number;
  hasQuantityPricing: boolean;
  wholesaleQuantity: number | null;
  wholesalePrice: number | null;
  origin: string;
  supplier: string;
  location: string;
  quantity: number;
  images: { url: string; file: File }[];
  mainImageIndex: number | null;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  private searchSubject = new Subject<string>();

  parts: CarPart[] = [];
  filteredParts: CarPart[] = [];
  availableBrands: string[] = [];
  addedParts: any[] = [];

  searchTerm = '';
  selectedBrand = '';
  selectedCondition = '';
  selectedGrade = '';

  currentPage = 1;
  itemsPerPage = 12;
  totalPages = 0;

  viewMode: 'card' | 'list' = 'list';
  showQuickAddModal = false;
  isLoading = false;

  constructor() {
    this.searchSubject.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      takeUntil(this.destroy$)
    ).subscribe(() => this.applyFilters());
  }

  ngOnInit(): void {
    this.loadParts();
    this.setupQuickKeyboardShortcuts();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  openQuickAddModal(): void {
    this.showQuickAddModal = true;
  }

  closeQuickAddModal(): void {
    this.showQuickAddModal = false;
  }

  setViewMode(mode: 'card' | 'list') {
    this.viewMode = mode;
  }

  onSearch(): void {
    this.searchSubject.next(this.searchTerm);
  }

  applyFilters(): void {
    let filtered = [...this.parts];
    const searchLower = this.searchTerm.trim().toLowerCase();
    if (searchLower) {
      filtered = filtered.filter(part =>
        part.name.toLowerCase().includes(searchLower) ||
        part.car.brand.toLowerCase().includes(searchLower) ||
        part.car.model.toLowerCase().includes(searchLower) ||
        part.store.name.toLowerCase().includes(searchLower) ||
        part.origin.toLowerCase().includes(searchLower)
      );
    }
    if (this.selectedBrand) {
      filtered = filtered.filter(part => part.car.brand === this.selectedBrand);
    }
    if (this.selectedCondition) {
      filtered = filtered.filter(part => part.condition === this.selectedCondition);
    }
    if (this.selectedGrade) {
      filtered = filtered.filter(part => part.grade === this.selectedGrade);
    }
    this.filteredParts = filtered;
    this.calculatePagination();
    this.currentPage = 1;
  }

  clearFilters(): void {
    this.searchTerm = '';
    this.selectedBrand = '';
    this.selectedCondition = '';
    this.selectedGrade = '';
    this.applyFilters();
  }

  calculatePagination(): void {
    this.totalPages = Math.ceil(this.filteredParts.length / this.itemsPerPage);
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  getPageNumbers(): number[] {
    const pages: number[] = [];
    const maxVisible = 5;
    let start = Math.max(1, this.currentPage - Math.floor(maxVisible / 2));
    let end = Math.min(this.totalPages, start + maxVisible - 1);
    if (end - start + 1 < maxVisible) {
      start = Math.max(1, end - maxVisible + 1);
    }
    for (let i = start; i <= end; i++) pages.push(i);
    return pages;
  }

onPartAdded(formData: any): void {
  const carPart: CarPart = this.mapFormDataToCarPart(formData);
  this.parts.unshift(carPart);
  this.extractAvailableBrands();
  this.applyFilters();
  this.closeQuickAddModal();
  this.showSuccessMessage('تم إضافة القطعة بنجاح');
}


  toggleFavorite(part: CarPart): void {
    part.isFavorite = !part.isFavorite;
    this.showSuccessMessage(part.isFavorite ? 'تمت الإضافة للمفضلة' : 'تمت الإزالة من المفضلة');
  }

private mapFormDataToCarPart(formData: any): CarPart {
  return {
    id: this.generateId(),
    name: formData.partName,
    subtitle: formData.subtitle,
    condition: formData.condition as 'جديد' | 'مستعمل',
    store: {
      name: formData.storeName || 'غير محدد',
      phone: formData.storePhone || '01000000000'
    },
    car: {
      brand: formData.carBrand || '',
      model: formData.carModel || '',
      year: formData.carYear || ''
    },
    price: formData.price,
    priceAfterDiscount: formData.priceAfterDiscount,
    discount: formData.discount,
    isFavorite: formData.isFavorite,
    hasDelivery: formData.hasDelivery,
    grade: formData.grade as 'فرز أول' | 'فرز تاني',
    partType: formData.partType || '',
    origin: formData.origin,
    image: formData.images && formData.images.length > 0 ? formData.images[formData.mainImageIndex ?? 0]?.url : '',
    thumbnails: formData.images ? formData.images.map((img: any) => img.url) : []
  };
}


  private generateId(): string {
    return Date.now().toString(36) + Math.random().toString(36).substring(2);
  }

  private extractAvailableBrands(): void {
    const brands = new Set(this.parts.map(part => part.car.brand));
    this.availableBrands = Array.from(brands).sort();
  }

  private showSuccessMessage(message: string): void {
    console.log('Success:', message);
  }

  private showErrorMessage(message: string): void {
    console.error('Error:', message);
  }

  editPart(part: CarPart): void {
    console.log('Editing:', part);
  }

  deletePart(part: CarPart): void {
    this.parts = this.parts.filter(p => p.id !== part.id);
    this.applyFilters();
    this.showSuccessMessage('تم حذف القطعة بنجاح');
  }

  duplicatePart(part: CarPart): void {
    const newPart = { ...part, id: this.generateId(), name: `${part.name} (نسخة)` };
    this.parts.unshift(newPart);
    this.applyFilters();
    this.showSuccessMessage('تم نسخ القطعة بنجاح');
  }

  openBulkImport(): void {
    console.log('Bulk import dialog triggered');
  }

  openImageGallery(part: CarPart): void {
    console.log('Opening image gallery for:', part.name);
  }

  loadParts(): void {
    this.parts = []; // Add logic to load data if needed
    this.applyFilters();
  }

  setupQuickKeyboardShortcuts(): void {
    document.addEventListener('keydown', (event) => {
      if ((event.ctrlKey || event.metaKey) && event.key === 'k') {
        event.preventDefault();
        const input = document.querySelector('.search-input') as HTMLInputElement;
        input?.focus();
      }
      if ((event.ctrlKey || event.metaKey) && event.key === 'n') {
        event.preventDefault();
        this.openQuickAddModal();
      }
      if (event.key === 'Escape') {
        this.closeQuickAddModal();
      }
    });
  }

  trackByPartId(index: number, part: CarPart): string {
    return part.id;
  }
}
