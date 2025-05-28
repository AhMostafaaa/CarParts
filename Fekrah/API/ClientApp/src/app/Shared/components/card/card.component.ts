import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';

interface CarPart {
  id: string;
  name: string;
  subtitle: string;
  condition: string;
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
  grade: string;
  origin?: string; // ⬅️ جديد
}

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardComponent {
  @Input() part!: CarPart;
  @Output() favoriteToggled = new EventEmitter<CarPart>();
  @Output() addToCart = new EventEmitter<CarPart>();

  samplePart: CarPart = {
    id: 'part123',
    name: 'فلتر زيت محرك أصلي',
    subtitle: 'قطعة غيار أصلية',
    condition: 'جديد',
    store: {
      name: 'متجر السيارات الذهبي',
      phone: '201234567890'
    },
    car: {
      brand: 'تويوتا',
      model: 'كامري',
      year: '2020'
    },
    price: 1000,
    priceAfterDiscount: 750,
    discount: 25,
    isFavorite: false,
    hasDelivery: true,
    grade: 'فرز أول',
    origin: 'اليابان',
  };
  

  formatPrice(price: number): string {
    if (!price) return '0';
    return new Intl.NumberFormat('ar-EG', {
      style: 'currency',
      currency: 'EGP',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(price);
  }

  onAdd(part: CarPart): void {
    this.addToCart.emit(part);
    this.showNotification(`تمت إضافة ${part.name} إلى السلة`);
  }

  toggleFavorite(part: CarPart): void {
    part.isFavorite = !part.isFavorite;
    this.favoriteToggled.emit(part);

    const message = part.isFavorite
      ? `تمت إضافة ${part.name} إلى المفضلة`
      : `تم حذف ${part.name} من المفضلة`;

    this.showNotification(message);
  }

  private showNotification(message: string): void {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    document.body.appendChild(notification);

    requestAnimationFrame(() => {
      notification.style.transform = 'translateX(0)';
      setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => notification.remove(), 300);
      }, 3000);
    });
  }

  onWhatsAppClick(part: CarPart): void {
    const message = encodeURIComponent(
      `مرحباً، أريد الاستفسار عن قطعة الغيار:\n${part.name}\n` +
      `للسيارة: ${part.car.brand} ${part.car.model} ${part.car.year}\n` +
      `السعر: ${this.formatPrice(part.priceAfterDiscount || part.price)}`
    );
    window.open(`https://wa.me/${part.store.phone}?text=${message}`, '_blank');
  }

  getDiscountClass(discount: number): string {
    if (!discount) return 'bg-low';
    if (discount >= 30) return 'bg-high';
    if (discount >= 15) return 'bg-medium';
    return 'bg-low';
  }

  
}
