import { Component, OnInit } from '@angular/core';
import { SwiperOptions } from 'swiper/types';

@Component({
  selector: 'app-part-types',
  templateUrl: './part-types.component.html',
  styleUrls: ['./part-types.component.scss']
})
export class PartTypesComponent implements OnInit {
  partTypes = [
    { name: 'زيوت المحرك', icon: '🛢️' },
    { name: 'بطاريات', icon: '🔋' },
    { name: 'فلاتر الهواء', icon: '🌀' },
    { name: 'إضاءة / لمبات', icon: '🚦' },
    { name: 'إطارات', icon: '🛞' },
    { name: 'تيل فرامل', icon: '🧯' },
    { name: 'فلتر زيت', icon: '🧪' },
    { name: 'زيوت المحرك', icon: '🛢️' },
    { name: 'بطاريات', icon: '🔋' },
    { name: 'فلاتر الهواء', icon: '🌀' },
    { name: 'إضاءة / لمبات', icon: '🚦' },
    { name: 'إطارات', icon: '🛞' },
    { name: 'تيل فرامل', icon: '🧯' },
    { name: 'فلتر زيت', icon: '🧪' },
    { name: 'زيوت المحرك', icon: '🛢️' },
    { name: 'بطاريات', icon: '🔋' },
    { name: 'فلاتر الهواء', icon: '🌀' },
    { name: 'إضاءة / لمبات', icon: '🚦' },
    { name: 'إطارات', icon: '🛞' },
    { name: 'تيل فرامل', icon: '🧯' },
    { name: 'فلتر زيت', icon: '🧪' },
    { name: 'زيوت المحرك', icon: '🛢️' },
    { name: 'بطاريات', icon: '🔋' },
    { name: 'فلاتر الهواء', icon: '🌀' },
    { name: 'إضاءة / لمبات', icon: '🚦' },
    { name: 'إطارات', icon: '🛞' },
    { name: 'تيل فرامل', icon: '🧯' },
    { name: 'فلتر زيت', icon: '🧪' },
    { name: 'رادياتير', icon: '🚗' }
  ];

  swiperConfig: SwiperOptions = {
    slidesPerView: 'auto',
    spaceBetween: 20,
    pagination: {
      clickable: true
    },
    navigation: true,
    breakpoints: {
      320: {
        slidesPerView: 2,
        spaceBetween: 10
      },
      480: {
        slidesPerView: 3,
        spaceBetween: 15
      },
      768: {
        slidesPerView: 4,
        spaceBetween: 20
      },
      1024: {
        slidesPerView: 6,
        spaceBetween: 20
      }
    }
  };

  ngOnInit() {
    // Swiper will be initialized automatically
  }

  selectPart(type: string) {
    console.log(`عرض قطع: ${type}`);
    // مثال: this.router.navigate(['/parts', type]);
  }
}
