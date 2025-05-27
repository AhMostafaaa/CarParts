import { Injectable } from '@angular/core';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { SwiperOptions } from 'swiper/types';

@Injectable({
  providedIn: 'root'
})
export class SwiperConfigService {
  getDefaultConfig(type: 'part-types' | 'car-brands'): SwiperOptions {
    const baseConfig: SwiperOptions = {
      modules: [Navigation, Pagination, Autoplay],
      slidesPerView: 'auto',
      spaceBetween: 10,
      centeredSlides: false,
      loop: true,
      speed: 1000,
      autoplay: {
        delay: 3000,
        disableOnInteraction: false,
        pauseOnMouseEnter: true
      },
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      }
    };

    const breakpoints = {
      'part-types': {
        320: { slidesPerView: 2, spaceBetween: 10 },
        480: { slidesPerView: 3, spaceBetween: 15 },
        768: { slidesPerView: 4, spaceBetween: 20 },
        1024: { slidesPerView: 6, spaceBetween: 20 }
      },
      'car-brands': {
        320: { slidesPerView: 3, spaceBetween: 10 },
        480: { slidesPerView: 4, spaceBetween: 15 },
        768: { slidesPerView: 6, spaceBetween: 15 },
        1024: { slidesPerView: 11, spaceBetween: 20 }
      }
    };

    return {
      ...baseConfig,
      breakpoints: breakpoints[type]
    };
  }
}