import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CarPart } from '../../Shared/Models/car-card';



@Component({
  selector: 'app-quick-add-form',
  templateUrl: './quick-add-form.component.html',
  styleUrls: ['./quick-add-form.component.scss']
})
export class QuickAddFormComponent implements OnInit {
onDrop($event: DragEvent) {
throw new Error('Method not implemented.');
}
onDragLeave($event: DragEvent) {
throw new Error('Method not implemented.');
}
onDragOver($event: DragEvent) {
throw new Error('Method not implemented.');
}

  partForm!: FormGroup;

  partNames = ['فرامل أمامية', 'رديتر', 'سير دينمو', 'فلتر زيت'];
  conditions = ['جديد', 'مستعمل'];
  grades = ['فرز أول', 'فرز تاني'];
  partTypes = ['ياباني', 'كوري', 'صيني', 'أوروبي', 'أمريكي'];
  carBrands = ['تويوتا', 'هيونداي', 'نيسان', 'شيفروليه', 'فورد', 'كيا', 'هوندا'];
  carModels = ['كورولا', 'سوناتا', 'النترا', 'كامري', 'سيفيك', 'سبورتاج'];
  years: number[] = [];

  images: { url: string, file: File }[] = [];

  @Output() partAdded = new EventEmitter<CarPart>();

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    // إنشاء مصفوفة السنوات من الحالي إلى 1980
    const thisYear = new Date().getFullYear();
    for (let y = thisYear; y >= 1980; y--) this.years.push(y);

    // تعريف الفورم الريأكتيفي
    this.partForm = this.fb.group({
      name: ['', Validators.required],
      subtitle: [''],
      condition: ['', Validators.required],
      grade: ['', Validators.required],
      partType: ['', Validators.required],
      carBrand: ['', Validators.required],
      carModel: ['', Validators.required],
      carYear: ['', Validators.required],
      price: [null, [Validators.required, Validators.min(0)]],
      discount: [0, [Validators.min(0), Validators.max(100)]],
      priceAfterDiscount: [{value: null, disabled: true}],
      origin: [''],
      hasDelivery: [false],
      isFavorite: [false]
    });
  }

  // عند إضافة صورة جديدة
  onImageSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      Array.from(input.files).forEach(file => {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          this.images.push({ file, url: e.target.result });
        };
        reader.readAsDataURL(file);
      });
    }
  }

  removeImage(index: number) {
    this.images.splice(index, 1);
  }

  calculateDiscountedPrice() {
    const price = this.partForm.get('price')?.value || 0;
    const discount = this.partForm.get('discount')?.value || 0;
    let finalPrice = price;
    if (discount > 0 && discount <= 100) {
      finalPrice = price - ((discount / 100) * price);
    }
    this.partForm.get('priceAfterDiscount')?.setValue(finalPrice);
  }

  submitForm() {
    if (this.partForm.valid) {
      const value: CarPart = {
        ...this.partForm.getRawValue(),
        images: this.images
      };
      this.partAdded.emit(value);
      // Reset if you want:
      // this.partForm.reset();
      // this.images = [];
    }
  }

  closeForm() {
    // اكتب كود إغلاق الفورم هنا
  }

  submitAndAddAnother() {
    this.submitForm();
    this.partForm.reset();
    this.images = [];
  }
}
