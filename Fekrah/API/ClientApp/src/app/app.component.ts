import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'قطع غيار';

  promoOffers = [
    { id: 1, title: 'خصم خاص على فلاتر الهواء' },
    { id: 2, title: 'عروض بطاريات السيارات - ضمان سنة' },
    { id: 3, title: 'مساعدين بأسعار خاصة لفترة محدودة' },
    { id: 4, title: 'ردياتيرات أصلية بنصف السعر' },
    { id: 5, title: 'قطع غيار كهرباء بخصومات ضخمة' },
    { id: 6, title: 'أكسسوارات أصلية بأفضل الأسعار' },
    { id: 7, title: 'أطقم فرامل بضمان سنتين' }
  ];



}
