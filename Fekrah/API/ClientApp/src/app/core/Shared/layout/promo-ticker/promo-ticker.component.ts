import { Component } from '@angular/core';

@Component({
  selector: 'app-promo-ticker',
  templateUrl: './promo-ticker.component.html',
  styleUrls: ['./promo-ticker.component.scss']
})
export class PromoTickerComponent {
  promoOffers = [
    { id: 1, title: 'خصم خاص على فلاتر الهواء' },
    { id: 2, title: 'عروض بطاريات السيارات' },
    { id: 3, title: 'مساعدين بأسعار مميزة' },
    { id: 4, title: 'ردياتيرات أصلية خصم كبير' },
    { id: 5, title: 'أطقم فرامل أصلية بأسعار خاصة' },
    { id: 6, title: 'أكسسوارات جديدة بأسعار رائعة' }
  ];
}
