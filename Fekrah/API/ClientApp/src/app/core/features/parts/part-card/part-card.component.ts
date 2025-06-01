import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-part-card',
  templateUrl: './part-card.component.html',
  styleUrls: ['./part-card.component.scss']
})
export class PartCardComponent {
  @Input() part!: any;
  imageLoaded = false;

  // حساب السعر بعد الخصم
  getFinalPrice(): number {
    if (!this.part.discount) return this.part.price;
    return this.part.price - (this.part.price * this.part.discount / 100);
  }

  // فتح الواتساب
  openWhatsApp(): void {
    const message = `مرحباً، أود الاستفسار عن ${this.part.name}`;
    const whatsappUrl = `https://wa.me/${this.part.storePhoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  }

  // إضافة إلى السلة
  addToCart(): void {
    // قم بتنفيذ منطق إضافة المنتج إلى السلة هنا
    console.log('إضافة إلى السلة:', this.part);
  }

  // عرض التفاصيل
  showDetails(): void {
    // قم بتنفيذ منطق عرض التفاصيل هنا
    console.log('عرض التفاصيل:', this.part);
  }
}
