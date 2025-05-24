import { Component, OnInit } from '@angular/core';
import { SwiperOptions } from 'swiper/types';
import Swiper from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';

@Component({
  selector: 'app-part-types',
  templateUrl: './part-types.component.html',
  styleUrls: ['./part-types.component.scss']
})
export class PartTypesComponent implements OnInit {
  partTypes = [
    { name: 'زيوت المحرك', imageUrl: '../../assets/images/image100_100.png' },
    { name: 'بطاريات', imageUrl: '../../assets/images/image100_100.png' },
    { name: 'فلاتر الهواء', imageUrl: '../../assets/images/image100_100.png' },
    { name: 'إضاءة / لمبات', imageUrl: '../../assets/images/image100_100.png' },
    { name: 'إطارات', imageUrl: '../../assets/images/image100_100.png' },
    { name: 'تيل فرامل', imageUrl: '../../assets/images/image100_100.png' },
    { name: 'فلتر زيت', imageUrl: '../../assets/images/image100_100.png' },
    { name: 'رادياتير', imageUrl: '../../assets/images/image100_100.png' },
    { name: 'شماعات', imageUrl: '../../assets/images/image100_100.png' },
    { name: 'بوجيهات', imageUrl: '../../assets/images/image100_100.png' }
  ];

  swiperConfig: SwiperOptions = {
    modules: [Navigation, Pagination],
    spaceBetween: 20,
    centeredSlides: false,
    pagination: {
      clickable: true,
      dynamicBullets: true
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev'
    },
    breakpoints: {
      320: {
        slidesPerView: 1, // عرض شريحة واحدة على الشاشات الصغيرة
        spaceBetween: 10
      },
      640: {
        slidesPerView: 1, // عرض شريحة واحدة على الشاشات المتوسطة
        spaceBetween: 15
      },
      960: {
        slidesPerView: 1, // عرض شريحة واحدة على الشاشات الكبيرة
        spaceBetween: 20
      },
      1200: {
        slidesPerView: 1, // عرض شريحة واحدة على الشاشات الأكبر
        spaceBetween: 25
      }
    }
  };

  ngOnInit() {
    // Swiper initialization is handled automatically by the Angular component
  }

  selectPart(type: string) {
    console.log(`عرض قطع: ${type}`);
    // يمكنك إضافة التنقل هنا مثل:
    // this.router.navigate(['/parts', type]);
  }
}
