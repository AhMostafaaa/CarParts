import { Component, OnInit, OnDestroy, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject, debounceTime, distinctUntilChanged, takeUntil } from 'rxjs';

interface QuickTemplate {
  name: string;
  icon: string;
  data: Partial<any>;
}

interface ImageFile {
  file: File;
  preview: string;
}

interface CarPart {
  id: string;
  name: string;
  subtitle: string;
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
  selector: 'app-quick-add-form',
  templateUrl: './quick-add-form.component.html',
  styleUrls: ['./quick-add-form.component.scss']
})
export class QuickAddFormComponent implements OnInit, OnDestroy {
  @Output() partAdded = new EventEmitter<CarPart>();
  @Output() cancel = new EventEmitter<void>();
  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;
  @ViewChild('nameInput') nameInput!: ElementRef<HTMLInputElement>;

  private destroy$ = new Subject<void>();
  private suggestionSubject = new Subject<{field: string, value: string}>();

  partForm!: FormGroup;
  useTemplate = false;
  isSubmitting = false;
  isDragOver = false;
  selectedImages: ImageFile[] = [];

  // Suggestions
  nameSuggestions: string[] = [];
  brandSuggestions: string[] = [];
  modelSuggestions: string[] = [];
  storeSuggestions: string[] = [];

  // Static data
  availableYears: string[] = [];
  quickTemplates: QuickTemplate[] = [
    {
      name: 'فرامل',
      icon: 'fas fa-compact-disc',
      data: {
        name: 'فرامل أمامية',
        partType: 'ياباني',
        grade: 'فرز أول',
        condition: 'جديد',
        origin: 'اليابان'
      }
    },
    {
      name: 'فلاتر',
      icon: 'fas fa-filter',
      data: {
        name: 'فلتر هواء',
        partType: 'ياباني',
        grade: 'فرز أول',
        condition: 'جديد',
        origin: 'اليابان'
      }
    },
    {
      name: 'بطارية',
      icon: 'fas fa-battery-full',
      data: {
        name: 'بطارية',
        partType: 'كوري',
        grade: 'فرز أول',
        condition: 'جديد',
        origin: 'كوريا الجنوبية'
      }
    },
    {
      name: 'إطارات',
      icon: 'fas fa-circle',
      data: {
        name: 'إطار',
        partType: 'صيني',
        grade: 'فرز أول',
        condition: 'جديد',
        origin: 'الصين'
      }
    },
    {
      name: 'زيوت',
      icon: 'fas fa-tint',
      data: {
        name: 'زيت محرك',
        partType: 'ياباني',
        grade: 'فرز أول',
        condition: 'جديد',
        origin: 'اليابان'
      }
    },
    {
      name: 'شمعات',
      icon: 'fas fa-fire',
      data: {
        name: 'شمعات إشعال',
        partType: 'ياباني',
        grade: 'فرز أول',
        condition: 'جديد',
        origin: 'اليابان'
      }
    }
  ];

  // Predefined suggestions data
  private partNameSuggestions = [
    'فرامل أمامية', 'فرامل خلفية', 'فلتر هواء', 'فلتر بنزين', 'فلتر زيت',
    'بطارية', 'إطار', 'زيت محرك', 'شمعات إشعال', 'مكابح', 'فوانيس',
    'مرايا', 'مساحات', 'حساسات', 'مضخة وقود', 'ردياتير', 'مكيف'
  ];

  private carBrandSuggestions = [
    'تويوتا', 'هوندا', 'نيسان', 'هيونداي', 'كيا', 'مازدا', 'مرسيدس',
    'BMW', 'أودي', 'فولفو', 'بيجو', 'رينو', 'فولكس واجن', 'فورد', 'شيفروليه'
  ];

  private carModelSuggestions: {[key: string]: string[]} = {
    'تويوتا': ['كورولا', 'كامري', 'يارس', 'أفينسيس', 'لاند كروزر', 'برادو', 'هايلوكس'],
    'هوندا': ['أكورد', 'سيفيك', 'سيتي', 'CR-V', 'HR-V', 'بايلوت'],
    'نيسان': ['التيما', 'صني', 'سنترا', 'باترول', 'إكس تريل', 'جوك'],
    'هيونداي': ['النترا', 'أكسنت', 'سوناتا', 'توكسون', 'سانتا في', 'كريتا'],
    'كيا': ['سيراتو', 'ريو', 'أوبتيما', 'سورينتو', 'سبورتاج', 'بيكانتو']
  };

  private storeNameSuggestions = [
    'ورشة الأمين', 'قطع غيار المحترف', 'مركز الصيانة الشامل', 'ورشة النجمة',
    'مركز الخليج للسيارات', 'ورشة الماهر', 'قطع غيار الأصلية', 'مركز التميز'
  ];

  constructor(private fb: FormBuilder) {
    this.initializeForm();
    this.generateAvailableYears();
    this.setupSuggestionDebounce();
  }

  ngOnInit(): void {
    this.setupKeyboardShortcuts();
    // Focus on name input after view init
    setTimeout(() => {
      if (this.nameInput) {
        this.nameInput.nativeElement.focus();
      }
    }, 100);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    this.cleanupImagePreviews();
  }

  private initializeForm(): void {
    this.partForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      subtitle: [''],
      condition: ['جديد', Validators.required],
      grade: ['فرز أول', Validators.required],
      partType: ['ياباني', Validators.required],
      carBrand: ['', Validators.required],
      carModel: ['', Validators.required],
      carYear: ['', Validators.required],
      storeName: ['', Validators.required],
      storePhone: ['', [Validators.required, Validators.pattern(/^01[0-9]{9}$/)]],
      price: [0, [Validators.required, Validators.min(1)]],
      discount: [0, [Validators.min(0), Validators.max(100)]],
      priceAfterDiscount: [0, [Validators.required, Validators.min(0)]],
      origin: [''],
      hasDelivery: [false],
      isFavorite: [false]
    });

    // Auto-calculate price after discount
    this.partForm.get('price')?.valueChanges.pipe(takeUntil(this.destroy$))
      .subscribe(() => this.calculateDiscountedPrice());
    
    this.partForm.get('discount')?.valueChanges.pipe(takeUntil(this.destroy$))
      .subscribe(() => this.calculateDiscountedPrice());
  }

  private generateAvailableYears(): void {
    const currentYear = new Date().getFullYear();
    for (let year = currentYear; year >= 1990; year--) {
      this.availableYears.push(year.toString());
    }
  }

  private setupSuggestionDebounce(): void {
    this.suggestionSubject.pipe(
      debounceTime(300),
      distinctUntilChanged((a, b) => a.field === b.field && a.value === b.value),
      takeUntil(this.destroy$)
    ).subscribe(({field, value}) => {
      this.updateSuggestions(field, value);
    });
  }

  private setupKeyboardShortcuts(): void {
    const keydownHandler = (event: KeyboardEvent) => {
      // Ctrl/Cmd + Enter to submit
      if ((event.ctrlKey || event.metaKey) && event.key === 'Enter') {
        event.preventDefault();
        if (event.shiftKey) {
          this.onSubmitAndAddAnother();
        } else {
          this.onSubmit();
        }
      }
      
      // Escape to cancel
      if (event.key === 'Escape') {
        this.onCancel();
      }
    };

    document.addEventListener('keydown', keydownHandler);
    
    // Cleanup on destroy
    this.destroy$.subscribe(() => {
      document.removeEventListener('keydown', keydownHandler);
    });
  }

  // Template Methods
  applyTemplate(template: QuickTemplate): void {
    this.useTemplate = true;
    
    // Apply template data to form
    Object.keys(template.data).forEach(key => {
      if (this.partForm.get(key)) {
        this.partForm.get(key)?.setValue(template.data[key]);
      }
    });

    // Focus on name input
    setTimeout(() => {
      if (this.nameInput) {
        this.nameInput.nativeElement.focus();
        this.nameInput.nativeElement.select();
      }
    }, 100);
  }

  // Suggestion Methods
  onBrandInput(event: any): void {
    const value = event.target.value;
    this.suggestionSubject.next({field: 'brand', value});
    
    // Clear model when brand changes
    this.partForm.get('carModel')?.setValue('');
    this.modelSuggestions = [];
  }

  onModelInput(event: any): void {
    const value = event.target.value;
    const brand = this.partForm.get('carBrand')?.value;
    this.suggestionSubject.next({field: 'model', value: `${brand}|${value}`});
  }

  onStoreInput(event: any): void {
    const value = event.target.value;
    this.suggestionSubject.next({field: 'store', value});
  }

  private updateSuggestions(field: string, value: string): void {
    const searchTerm = value.toLowerCase();

    switch (field) {
      case 'name':
        this.nameSuggestions = this.partNameSuggestions
          .filter(name => name.toLowerCase().includes(searchTerm))
          .slice(0, 5);
        break;

      case 'brand':
        this.brandSuggestions = this.carBrandSuggestions
          .filter(brand => brand.toLowerCase().includes(searchTerm))
          .slice(0, 5);
        break;

      case 'model':
        const [brand, modelSearch] = value.split('|');
        const availableModels = this.carModelSuggestions[brand] || [];
        this.modelSuggestions = availableModels
          .filter(model => model.toLowerCase().includes(modelSearch.toLowerCase()))
          .slice(0, 5);
        break;

      case 'store':
        this.storeSuggestions = this.storeNameSuggestions
          .filter(store => store.toLowerCase().includes(searchTerm))
          .slice(0, 5);
        break;
    }
  }

  selectSuggestion(field: string, suggestion: string): void {
    this.partForm.get(field)?.setValue(suggestion);
    
    // Clear suggestions
    switch (field) {
      case 'name':
        this.nameSuggestions = [];
        break;
      case 'carBrand':
        this.brandSuggestions = [];
        break;
      case 'carModel':
        this.modelSuggestions = [];
        break;
      case 'storeName':
        this.storeSuggestions = [];
        break;
    }
  }

  // Price Calculation
  calculateDiscount(): void {
    const price = this.partForm.get('price')?.value || 0;
    const priceAfterDiscount = this.partForm.get('priceAfterDiscount')?.value || 0;
    
    if (price > 0 && priceAfterDiscount < price) {
      const discount = Math.round(((price - priceAfterDiscount) / price) * 100);
      this.partForm.get('discount')?.setValue(discount, {emitEvent: false});
    }
  }

  calculateDiscountedPrice(): void {
    const price = this.partForm.get('price')?.value || 0;
    const discount = this.partForm.get('discount')?.value || 0;
    
    const discountedPrice = price - (price * discount / 100);
    this.partForm.get('priceAfterDiscount')?.setValue(Math.round(discountedPrice), {emitEvent: false});
  }

  // Image Handling
  selectImages(): void {
    this.fileInput.nativeElement.click();
  }

  onImageSelected(event: any): void {
    const files = Array.from(event.target.files) as File[];
    this.processSelectedImages(files);
  }

  onDragOver(event: DragEvent): void {
    event.preventDefault();
    this.isDragOver = true;
  }

  onDragLeave(event: DragEvent): void {
    event.preventDefault();
    this.isDragOver = false;
  }

  onDrop(event: DragEvent): void {
    event.preventDefault();
    this.isDragOver = false;
    
    const files = Array.from(event.dataTransfer?.files || []) as File[];
    const imageFiles = files.filter(file => file.type.startsWith('image/'));
    this.processSelectedImages(imageFiles);
  }

  private processSelectedImages(files: File[]): void {
    const maxImages = 5;
    const availableSlots = maxImages - this.selectedImages.length;
    const filesToProcess = files.slice(0, availableSlots);

    filesToProcess.forEach(file => {
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        console.warn(`File ${file.name} is too large. Maximum size is 5MB.`);
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        this.selectedImages.push({
          file: file,
          preview: e.target?.result as string
        });
      };
      reader.readAsDataURL(file);
    });

    // Clear file input
    this.fileInput.nativeElement.value = '';
  }

  removeImage(index: number): void {
    if (this.selectedImages[index]) {
      URL.revokeObjectURL(this.selectedImages[index].preview);
      this.selectedImages.splice(index, 1);
    }
  }

  private cleanupImagePreviews(): void {
    this.selectedImages.forEach(image => {
      if (image.preview.startsWith('blob:')) {
        URL.revokeObjectURL(image.preview);
      }
    });
  }

  // Form Submission
  async onSubmit(): Promise<void> {
    if (this.partForm.valid && !this.isSubmitting) {
      this.isSubmitting = true;
      
      try {
        const formData = this.partForm.value;
        const newPart = await this.createPartFromForm(formData);
        this.partAdded.emit(newPart);
      } catch (error) {
        console.error('Error creating part:', error);
        // Handle error (show toast, etc.)
      } finally {
        this.isSubmitting = false;
      }
    } else {
      this.markFormGroupTouched();
    }
  }

  async onSubmitAndAddAnother(): Promise<void> {
    if (this.partForm.valid && !this.isSubmitting) {
      this.isSubmitting = true;
      
      try {
        const formData = this.partForm.value;
        const newPart = await this.createPartFromForm(formData);
        this.partAdded.emit(newPart);
        
        // Reset form but keep some common data
        this.resetFormForNext();
      } catch (error) {
        console.error('Error creating part:', error);
      } finally {
        this.isSubmitting = false;
      }
    } else {
      this.markFormGroupTouched();
    }
  }

  private async createPartFromForm(formData: any): Promise<CarPart> {
    // Simulate image upload delay
    let mainImage = '';
    const thumbnails: string[] = [];

    if (this.selectedImages.length > 0) {
      // In a real app, you'd upload images to a server here
      await this.delay(500);
      mainImage = this.selectedImages[0].preview;
      const thumbnails = this.selectedImages.slice(1).map(img => img.preview);
    }

    const newPart: CarPart = {
      id: this.generateId(),
      name: formData.name,
      subtitle: formData.subtitle || '',
      condition: formData.condition,
      store: {
        name: formData.storeName,
        phone: formData.storePhone
      },
      car: {
        brand: formData.carBrand,
        model: formData.carModel,
        year: formData.carYear
      },
      price: formData.price,
      priceAfterDiscount: formData.priceAfterDiscount,
      discount: formData.discount,
      isFavorite: formData.isFavorite,
      hasDelivery: formData.hasDelivery,
      grade: formData.grade,
      partType: formData.partType,
      origin: formData.origin || 'غير محدد',
      image: mainImage,
      thumbnails: thumbnails
    };

    return newPart;
  }

  private resetFormForNext(): void {
    // Keep store and car info for convenience
    const storeInfo = {
      storeName: this.partForm.get('storeName')?.value,
      storePhone: this.partForm.get('storePhone')?.value
    };
    
    const carInfo = {
      carBrand: this.partForm.get('carBrand')?.value,
      carModel: this.partForm.get('carModel')?.value,
      carYear: this.partForm.get('carYear')?.value
    };

    this.partForm.reset();
    this.selectedImages = [];
    
    // Restore preserved data
    Object.keys(storeInfo).forEach(key => {
      this.partForm.get(key)?.setValue(storeInfo[key as keyof typeof storeInfo]);
    });
    
    Object.keys(carInfo).forEach(key => {
      this.partForm.get(key)?.setValue(carInfo[key as keyof typeof carInfo]);
    });

    // Set defaults
    this.partForm.patchValue({
      condition: 'جديد',
      grade: 'فرز أول',
      partType: 'ياباني',
      discount: 0,
      hasDelivery: false,
      isFavorite: false
    });

    // Focus on name input
    setTimeout(() => {
      if (this.nameInput) {
        this.nameInput.nativeElement.focus();
      }
    }, 100);
  }

  onCancel(): void {
    this.cancel.emit();
  }

  private markFormGroupTouched(): void {
    Object.keys(this.partForm.controls).forEach(key => {
      this.partForm.get(key)?.markAsTouched();
    });
  }

  private generateId(): string {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }

  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}