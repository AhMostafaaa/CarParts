import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { CarPart } from '../../Shared/Models/car-card';



export interface CartItem {
  carPart: CarPart;
  quantity: number;
}

export interface DeliveryInfo {
  customerName: string;
  phone: string;
  governorate: string;
  city: string;
  address: string;
}

export interface Order {
  id: string;
  items: CartItem[];
  delivery: DeliveryInfo;
  paymentMethod: 'cash' | 'online';
  total: number;
  deliveryFee: number;
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered';
  date: Date;
}

const sampleParts: CarPart[] = [
  {
    id: 'p101',
    name: 'كمبروسر تكييف تويوتا يارس',
    subtitle: 'كمبروسر أصلي بحالة ممتازة - وارد اليابان',
    condition: 'مستعمل',
    store: {
      name: 'مؤسسة الأمل لقطع الغيار',
      phone: '01011223344'
    },
    car: {
      brand: 'تويوتا',
      model: 'يارس',
      year: '2014'
    },
    price: 3500,
    priceAfterDiscount: 3200,
    discount: 9,
    isFavorite: true,
    hasDelivery: true,
    grade: 'فرز أول',
    partType: 'ياباني',
    origin: 'اليابان',
    image:  '../../assets/images/image100_100.png'
  },
  {
    id: 'p102',
    name: 'مراية جانبية هيونداي أكسنت',
    subtitle: 'مراية كهرباء أصلية بدون كسر',
    condition: 'مستعمل',
    store: {
      name: 'قطع غيار الشرق',
      phone: '01055667788'
    },
    car: {
      brand: 'هيونداي',
      model: 'أكسنت',
      year: '2017'
    },
    price: 700,
    priceAfterDiscount: 650,
    discount: 7,
    isFavorite: false,
    hasDelivery: true,
    grade: 'فرز أول',
    partType: 'كوري',
    origin: 'كوريا',
    image: '../../assets/images/image100_100.png'
  },
  {
    id: 'p103',
    name: 'فلتر هواء نيسان صني',
    subtitle: 'فلتر جديد صناعة ماليزية',
    condition: 'جديد',
    store: {
      name: 'النور لقطع الغيار',
      phone: '01122334455'
    },
    car: {
      brand: 'نيسان',
      model: 'صني',
      year: '2019'
    },
    price: 120,
    priceAfterDiscount: 100,
    discount: 17,
    isFavorite: true,
    hasDelivery: false,
    grade: 'فرز أول',
    partType: 'صيني',
    origin: 'ماليزيا',
    image:  '../../assets/images/image100_100.png'
  },
  {
    id: 'p104',
    name: 'ردياتير شيفروليه أوبترا',
    subtitle: 'جديد - ضمان 6 شهور',
    condition: 'جديد',
    store: {
      name: 'الوفاء لقطع الغيار',
      phone: '01234567890'
    },
    car: {
      brand: 'شيفروليه',
      model: 'أوبترا',
      year: '2022'
    },
    price: 1800,
    priceAfterDiscount: 1600,
    discount: 11,
    isFavorite: false,
    hasDelivery: true,
    grade: 'فرز أول',
    partType: 'صيني',
    origin: 'الصين',
    image:  '../../assets/images/image100_100.png'
  }
];


@Component({
  selector: 'app-modern-cart',
  templateUrl: './add-to-cart.component.html',
  styleUrls: ['./add-to-cart.component.scss']
})
export class AddToCartComponent implements OnInit, OnDestroy {
  step = 1;
  cartItems: CartItem[] = [];
  filteredCartItems: CartItem[] = [];
  paymentMethod: 'cash' | 'online' = 'cash';
  deliveryForm!: FormGroup;
  isLoading = false;
  orderSubmitted = false;
  private destroy$ = new Subject<void>();

  readonly deliveryFee = 50;
  readonly governorates = ['القاهرة', 'الجيزة', 'الإسكندرية', 'الدقهلية', 'أسيوط', 'سوهاج', 'المنيا', 'بني سويف', 'الفيوم', 'قنا', 'الأقصر', 'أسوان', 'البحر الأحمر', 'الوادي الجديد', 'مطروح', 'شمال سيناء', 'جنوب سيناء', 'بورسعيد', 'السويس', 'دمياط', 'كفر الشيخ', 'الغربية', 'المنوفية', 'الشرقية', 'القليوبية', 'البحيرة'];

  constructor(private fb: FormBuilder) {
    this.initializeForm();
  }

  ngOnInit(): void {
    this.loadCart();
    this.watchFormChanges();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private initializeForm(): void {
    this.deliveryForm = this.fb.group({
      customerName: ['', [Validators.required, Validators.minLength(3)]],
      phone: ['', [Validators.required, Validators.pattern(/^01[0-2,5]{1}[0-9]{8}$/)]],
      governorate: ['', Validators.required],
      city: ['', [Validators.required, Validators.minLength(2)]],
      address: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  private watchFormChanges(): void {
    this.deliveryForm.valueChanges.pipe(takeUntil(this.destroy$)).subscribe();
  }
loadCart(): void {
  // تحميل بيانات ثابتة من sampleParts
  this.cartItems = [
    { carPart: sampleParts[0], quantity: 1 },
    { carPart: sampleParts[1], quantity: 2 },
    { carPart: sampleParts[2], quantity: 1 },
    { carPart: sampleParts[3], quantity: 1 }
  ];

  this.filteredCartItems = this.cartItems.filter(i => !!i?.carPart);
}


  private loadSampleData(): CartItem[] {
    const dummyCart: CartItem[] = [
      { carPart: sampleParts[0], quantity: 1 },
      { carPart: sampleParts[1], quantity: 2 },
      { carPart: sampleParts[2], quantity: 1 }
    ];
    this.cartItems = dummyCart;
    this.saveCart();
    return dummyCart;
  }

  saveCart(): void {
    try {
      localStorage.setItem('modernCart', JSON.stringify(this.cartItems));
    } catch (error) {
      console.error('Error saving cart:', error);
    }
  }

  updateQuantity(id: string, qty: number): void {
    if (qty < 1) {
      this.removeFromCart(id);
      return;
    }

    const item = this.cartItems.find(x => x.carPart.id === id);
    if (item) {
      item.quantity = Math.min(qty, 10);
      this.saveCart();
    }
  }

  removeFromCart(id: string): void {
    const index = this.cartItems.findIndex(item => item.carPart.id === id);
    if (index > -1) {
      const element = document.querySelector(`[data-item-id="${id}"]`);
      if (element) {
        element.classList.add('removing');
        setTimeout(() => {
          this.cartItems.splice(index, 1);
          this.saveCart();
        }, 300);
      } else {
        this.cartItems.splice(index, 1);
        this.saveCart();
      }
    }
  }

  clearCart(): void {
    this.cartItems = [];
    this.saveCart();
  }

  getTotalItems(): number {
    return this.cartItems.reduce((sum, item) => sum + item.quantity, 0);
  }

  getSubtotal(): number {
    return this.cartItems.reduce((sum, item) => sum + (item.carPart.priceAfterDiscount * item.quantity), 0);
  }

  getTotalPrice(): number {
    return this.getSubtotal();
  }

  getTotalDiscount(): number {
    return this.cartItems.reduce((sum, item) => sum + ((item.carPart.price - item.carPart.priceAfterDiscount) * item.quantity), 0);
  }

  getFinalTotal(): number {
    return this.getTotalPrice() + this.deliveryFee;
  }

  nextStep(): void {
    if (this.canProceedToNextStep()) {
      this.step = Math.min(this.step + 1, 3);
      this.scrollToTop();
    }
  }

  previousStep(): void {
    this.step = Math.max(this.step - 1, 1);
    this.scrollToTop();
  }

  goToStep(stepNumber: number): void {
    if (stepNumber >= 1 && stepNumber <= 3) {
      this.step = stepNumber;
      this.scrollToTop();
    }
  }

  private canProceedToNextStep(): boolean {
    switch (this.step) {
      case 1: return this.cartItems.length > 0;
      case 2: return !!this.paymentMethod;
      case 3: return this.deliveryForm.valid;
      default: return false;
    }
  }

  private scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  async submitOrder(): Promise<void> {
    if (!this.deliveryForm.valid || this.cartItems.length === 0) {
      this.markFormGroupTouched();
      return;
    }

    this.isLoading = true;

    try {
      const order: Order = {
        id: this.generateOrderId(),
        items: [...this.cartItems],
        delivery: this.deliveryForm.value,
        paymentMethod: this.paymentMethod,
        total: this.getTotalPrice(),
        deliveryFee: this.deliveryFee,
        status: 'pending',
        date: new Date()
      };

      await this.simulateOrderSubmission(order);
      this.handleOrderSuccess(order);
    } catch (error) {
      this.handleOrderError(error);
    } finally {
      this.isLoading = false;
    }
  }

  private async simulateOrderSubmission(order: Order): Promise<void> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        Math.random() > 0.05 ? resolve() : reject(new Error('فشل في إرسال الطلب. يرجى المحاولة مرة أخرى.'));
      }, 2000);
    });
  }

  private handleOrderSuccess(order: Order): void {
    this.saveOrderToHistory(order);
    this.clearCart();
    this.deliveryForm.reset();
    this.orderSubmitted = true;

    setTimeout(() => {
      this.step = 1;
      this.orderSubmitted = false;
    }, 5000);

    this.showSuccessNotification('تم إرسال طلبك بنجاح! سنتواصل معك قريباً.');
  }

  private handleOrderError(error: any): void {
    const message = error?.message || 'حدث خطأ غير متوقع. يرجى المحاولة مرة أخرى.';
    this.showErrorNotification(message);
  }

  private generateOrderId(): string {
    return `ORDER-${Date.now()}-${Math.random().toString(36).substring(2, 8)}`.toUpperCase();
  }

  private saveOrderToHistory(order: Order): void {
    try {
      const history = JSON.parse(localStorage.getItem('orderHistory') || '[]');
      history.unshift(order);
      if (history.length > 50) history.splice(50);
      localStorage.setItem('orderHistory', JSON.stringify(history));
    } catch (error) {
      console.error('Error saving order to history:', error);
    }
  }

  private markFormGroupTouched(): void {
    Object.keys(this.deliveryForm.controls).forEach(key => {
      this.deliveryForm.get(key)?.markAsTouched();
    });
  }

  showSuccessNotification(message: string): void {
    alert(message); // يمكنك استبداله بـ toast أو SweetAlert
  }

  showErrorNotification(message: string): void {
    alert('❌ ' + message); // يمكن تحسينه بـ toast مخصص
  }

  trackByItemId(index: number, item: CartItem): string {
    return item?.carPart?.id || `unknown-${index}`;
  }

  goToDelivery(): void {
    this.goToStep(3);
  }

  goBackToCart(): void {
    this.goToStep(1);
  }
}
