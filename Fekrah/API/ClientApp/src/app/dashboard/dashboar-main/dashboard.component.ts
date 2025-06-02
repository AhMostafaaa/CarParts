// dashboard.component.ts
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject, debounceTime, distinctUntilChanged, takeUntil } from 'rxjs';

export interface CarPart {
  id: string;
  name: string;
  subtitle: any;
  condition: 'جديد' | 'مستعمل';
  store: {
    name: string;
    phone: string;
  };
  car: {
    brand: string;
    model: string;
    year: string;
  };
  price: number;
  priceAfterDiscount: number;
  discount: number;
  isFavorite: boolean;
  hasDelivery: boolean;
  grade: 'فرز أول' | 'فرز تاني';
  partType: 'كوري' | 'ياباني' | 'صيني';
  origin: string;
  image?: string;
  thumbnails?: string[];
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  private searchSubject = new Subject<string>();
  
  // Data properties
  parts: CarPart[] = [];
  filteredParts: CarPart[] = [];
  isLoading = false;
  
  // Search and filter properties
  searchTerm = '';
  selectedBrand = '';
  selectedCondition = '';
  selectedGrade = '';
  availableBrands: string[] = [];
  
  // Pagination properties
  currentPage = 1;
  itemsPerPage = 12;
  totalPages = 0;
  
  // Modal properties
  showQuickAddModal = false;
  
  // Stats properties
  get totalParts(): number {
    return this.parts.length;
  }
  
  get favoritePartsCount(): number {
    return this.parts.filter(part => part.isFavorite).length;
  }
  
  get totalValue(): number {
    return this.parts.reduce((sum, part) => sum + part.priceAfterDiscount, 0);
  }
  
  get deliveryAvailableCount(): number {
    return this.parts.filter(part => part.hasDelivery).length;
  }

  constructor() {
    // Setup search debouncing
    this.searchSubject.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      takeUntil(this.destroy$)
    ).subscribe(() => {
      this.applyFilters();
    });
  }

  ngOnInit(): void {
    this.loadParts();
    this.setupQuickKeyboardShortcuts();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  // Data loading methods
  async loadParts(): Promise<void> {
    this.isLoading = true;
    try {
      // Simulate API call - replace with actual service call
      await this.delay(1000);
      this.parts = this.generateSampleData();
      this.extractAvailableBrands();
      this.applyFilters();
    } catch (error) {
      console.error('Error loading parts:', error);
    } finally {
      this.isLoading = false;
    }
  }

  // Search and filter methods
  onSearch(): void {
    this.searchSubject.next(this.searchTerm);
  }

  applyFilters(): void {
    let filtered = [...this.parts];

    // Apply search filter
    if (this.searchTerm.trim()) {
      const searchLower = this.searchTerm.toLowerCase();
      filtered = filtered.filter(part =>
        part.name.toLowerCase().includes(searchLower) ||
        part.car.brand.toLowerCase().includes(searchLower) ||
        part.car.model.toLowerCase().includes(searchLower) ||
        part.store.name.toLowerCase().includes(searchLower) ||
        part.origin.toLowerCase().includes(searchLower)
      );
    }

    // Apply brand filter
    if (this.selectedBrand) {
      filtered = filtered.filter(part => part.car.brand === this.selectedBrand);
    }

    // Apply condition filter
    if (this.selectedCondition) {
      filtered = filtered.filter(part => part.condition === this.selectedCondition);
    }

    // Apply grade filter
    if (this.selectedGrade) {
      filtered = filtered.filter(part => part.grade === this.selectedGrade);
    }

    this.filteredParts = filtered;
    this.calculatePagination();
    this.currentPage = 1; // Reset to first page when filters change
  }

  clearFilters(): void {
    this.searchTerm = '';
    this.selectedBrand = '';
    this.selectedCondition = '';
    this.selectedGrade = '';
    this.applyFilters();
  }

  // Pagination methods
  calculatePagination(): void {
    this.totalPages = Math.ceil(this.filteredParts.length / this.itemsPerPage);
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.scrollToTop();
    }
  }

  getPageNumbers(): number[] {
    const pages: number[] = [];
    const maxVisiblePages = 5;
    let startPage = Math.max(1, this.currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(this.totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    return pages;
  }

  // CRUD operations with quick actions
  async editPart(part: CarPart): Promise<void> {
    // Quick edit modal or inline editing
    console.log('Editing part:', part.id);
    // Implement quick edit functionality
  }

  async deletePart(part: CarPart): Promise<void> {
    if (confirm(`هل أنت متأكد من حذف ${part.name}؟`)) {
      this.parts = this.parts.filter(p => p.id !== part.id);
      this.applyFilters();
      this.showSuccessMessage('تم حذف القطعة بنجاح');
    }
  }

  async duplicatePart(part: CarPart): Promise<void> {
    const newPart: CarPart = {
      ...part,
      id: this.generateId(),
      name: `${part.name} (نسخة)`,
      isFavorite: false
    };
    
    this.parts.unshift(newPart); // Add to beginning for quick access
    this.applyFilters();
    this.showSuccessMessage('تم نسخ القطعة بنجاح');
  }

  toggleFavorite(part: CarPart): void {
    part.isFavorite = !part.isFavorite;
    this.showSuccessMessage(
      part.isFavorite ? 'تم إضافة القطعة للمفضلة' : 'تم إزالة القطعة من المفضلة'
    );
  }

  // Quick Add Modal methods
  openQuickAddModal(): void {
    this.showQuickAddModal = true;
  }

  closeQuickAddModal(): void {
    this.showQuickAddModal = false;
  }

  onPartAdded(newPart: CarPart): void {
    this.parts.unshift(newPart); // Add to beginning
    this.extractAvailableBrands();
    this.applyFilters();
    this.closeQuickAddModal();
    this.showSuccessMessage('تم إضافة القطعة بنجاح');
  }

  // Bulk operations for speed
  openBulkImport(): void {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.csv,.xlsx,.json';
    input.multiple = false;
    
    input.onchange = (event: any) => {
      const file = event.target.files[0];
      if (file) {
        this.processBulkImport(file);
      }
    };
    
    input.click();
  }

  async processBulkImport(file: File): Promise<void> {
    this.isLoading = true;
    try {
      const fileText = await this.readFileAsText(file);
      let importedParts: CarPart[] = [];

      if (file.name.endsWith('.json')) {
        importedParts = JSON.parse(fileText);
      } else if (file.name.endsWith('.csv')) {
        importedParts = this.parseCSV(fileText);
      }

      // Validate and add parts
      const validParts = importedParts.filter(part => this.validatePart(part));
      this.parts = [...validParts, ...this.parts];
      
      this.extractAvailableBrands();
      this.applyFilters();
      this.showSuccessMessage(`تم استيراد ${validParts.length} قطعة بنجاح`);
    } catch (error) {
      console.error('Bulk import error:', error);
      this.showErrorMessage('خطأ في استيراد البيانات');
    } finally {
      this.isLoading = false;
    }
  }

  // Quick keyboard shortcuts for power users
  setupQuickKeyboardShortcuts(): void {
    document.addEventListener('keydown', (event) => {
      // Ctrl/Cmd + K for quick search
      if ((event.ctrlKey || event.metaKey) && event.key === 'k') {
        event.preventDefault();
        const searchInput = document.querySelector('.search-input') as HTMLInputElement;
        searchInput?.focus();
      }
      
      // Ctrl/Cmd + N for quick add
      if ((event.ctrlKey || event.metaKey) && event.key === 'n') {
        event.preventDefault();
        this.openQuickAddModal();
      }
      
      // Escape to close modals
      if (event.key === 'Escape') {
        this.closeQuickAddModal();
      }
    });
  }

  // Image gallery methods
  openImageGallery(part: CarPart): void {
    // Implement image gallery modal
    console.log('Opening image gallery for:', part.name);
  }

  // Utility methods
  trackByPartId(index: number, part: CarPart): string {
    return part.id;
  }

  private extractAvailableBrands(): void {
    const brands = new Set(this.parts.map(part => part.car.brand));
    this.availableBrands = Array.from(brands).sort();
  }

  private scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  private generateId(): string {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }

  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  private readFileAsText(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsText(file);
    });
  }

  private parseCSV(csvText: string): CarPart[] {
    // Basic CSV parsing - for production, use a proper CSV library
    const lines = csvText.split('\n');
    const headers = lines[0].split(',');
    const parts: CarPart[] = [];

    for (let i = 1; i < lines.length; i++) {
      const values = lines[i].split(',');
      if (values.length >= headers.length) {
        // Map CSV columns to CarPart interface
        // This is a simplified example - adjust based on your CSV format
        const part: CarPart = {
          id: this.generateId(),
          name: values[0] || '',
          subtitle: values[1] || '',
          condition: (values[2] as 'جديد' | 'مستعمل') || 'مستعمل',
          store: {
            name: values[3] || '',
            phone: values[4] || ''
          },
          car: {
            brand: values[5] || '',
            model: values[6] || '',
            year: values[7] || ''
          },
          price: parseFloat(values[8]) || 0,
          priceAfterDiscount: parseFloat(values[9]) || 0,
          discount: parseFloat(values[10]) || 0,
          isFavorite: values[11] === 'true',
          hasDelivery: values[12] === 'true',
          grade: (values[13] as 'فرز أول' | 'فرز تاني') || 'فرز تاني',
          partType: (values[14] as 'كوري' | 'ياباني' | 'صيني') || 'صيني',
          origin: values[15] || '',
          image: values[16] || ''
        };
        parts.push(part);
      }
    }
    return parts;
  }

  private validatePart(part: any): part is CarPart {
    return part && 
           typeof part.name === 'string' && 
           part.name.length > 0 &&
           part.car && 
           part.store &&
           typeof part.price === 'number';
  }

  private showSuccessMessage(message: string): void {
    // Implement toast notification or similar
    console.log('Success:', message);
  }

  private showErrorMessage(message: string): void {
    // Implement error notification
    console.error('Error:', message);
  }

  // Sample data generator for testing
  private generateSampleData(): CarPart[] {
    const brands = ['تويوتا', 'هوندا', 'نيسان', 'هيونداي', 'كيا', 'مازدا', 'مرسيدس', 'BMW'];
    const models = ['كورولا', 'كامري', 'أكورد', 'سيفيك', 'التيما', 'صني', 'النترا', 'سيراتو'];
    const partNames = ['فرامل أمامية', 'فرامل خلفية', 'فلتر هواء', 'فلتر بنزين', 'بطارية', 'إطارات', 'زيت محرك', 'شمعات'];
    const stores = ['ورشة الأمين', 'قطع غيار المحترف', 'مركز الصيانة الشامل', 'ورشة النجمة'];
    const origins = ['المانيا', 'اليابان', 'كوريا الجنوبية', 'الصين', 'تركيا'];

    const sampleParts: CarPart[] = [];

    for (let i = 0; i < 50; i++) {
      const brand = brands[Math.floor(Math.random() * brands.length)];
      const model = models[Math.floor(Math.random() * models.length)];
      const partName = partNames[Math.floor(Math.random() * partNames.length)];
      const store = stores[Math.floor(Math.random() * stores.length)];
      const origin = origins[Math.floor(Math.random() * origins.length)];
      
      const price = Math.floor(Math.random() * 2000) + 100;
      const discount = Math.floor(Math.random() * 30);
      const priceAfterDiscount = price - (price * discount / 100);

      sampleParts.push({
        id: this.generateId(),
        name: `${partName} ${brand}`,
        subtitle: `قطعة غيار أصلية عالية الجودة`,
        condition: Math.random() > 0.5 ? 'جديد' : 'مستعمل',
        store: {
          name: store,
          phone: `010${Math.floor(Math.random() * 100000000).toString().padStart(8, '0')}`
        },
        car: {
          brand: brand,
          model: model,
          year: (2015 + Math.floor(Math.random() * 9)).toString()
        },
        price: price,
        priceAfterDiscount: Math.floor(priceAfterDiscount),
        discount: discount,
        isFavorite: Math.random() > 0.8,
        hasDelivery: Math.random() > 0.4,
        grade: Math.random() > 0.6 ? 'فرز أول' : 'فرز تاني',
        partType: Math.random() > 0.66 ? 'ياباني' : Math.random() > 0.5 ? 'كوري' : 'صيني',
        origin: origin,
        image: `https://picsum.photos/400/300?random=${i}`
      });
    }

    return sampleParts;
  }
}