import { Component, OnInit, AfterViewInit } from '@angular/core';
declare var Swiper: any;

@Component({
  selector: 'app-part-preview',
  templateUrl: './part-preview.component.html',
  styleUrls: ['./part-preview.component.scss']
})
export class PartPreviewComponent implements OnInit, AfterViewInit {

  parts: any[] = [];

  constructor() { }

  ngOnInit(): void {
    this.parts = [
      { id: 1, name: 'فلتر زيت تويوتا', price: 150, imageUrl: 'assets/images/image100_100.png' },
      { id: 2, name: 'بطارية AC Delco', price: 950, imageUrl: 'assets/images/image100_100.png' },
      { id: 3, name: 'مساعد أمامي هونداي', price: 1200, imageUrl: 'assets/images/image100_100.png' },
      { id: 4, name: 'ردياتير نيسان صني', price: 800, imageUrl: 'assets/images/image100_100.png' },
      { id: 5, name: 'لمبة أمامية LED', price: 250, imageUrl: 'assets/images/image100_100.png' },
      { id: 6, name: 'طقم تيل فرامل أمامي', price: 400, imageUrl: 'assets/images/image100_100.png' },
      { id: 7, name: 'دينامو شحن هونداي', price: 1300, imageUrl: 'assets/images/image100_100.png' },
      { id: 8, name: 'طقم مساعدين خلفي نيسان', price: 1450, imageUrl: 'assets/images/image100_100.png' },
      { id: 9, name: 'كمبروسر تكييف كيا سيراتو', price: 2800, imageUrl: 'assets/images/image100_100.png' },
      { id: 10, name: 'زيت محرك Mobile 1', price: 350, imageUrl: 'assets/images/image100_100.png' },
      { id: 11, name: 'فلتر هواء تويوتا', price: 180, imageUrl: 'assets/images/image100_100.png' },
      { id: 12, name: 'بطارية جافة فارتا', price: 1000, imageUrl: 'assets/images/image100_100.png' },
      { id: 13, name: 'طقم سيور كيا سبورتاج', price: 850, imageUrl: 'assets/images/image100_100.png' },
      { id: 14, name: 'رادياتير مياه هونداي', price: 950, imageUrl: 'assets/images/image100_100.png' },
      { id: 15, name: 'طقم لمبات زينون', price: 500, imageUrl: 'assets/images/image100_100.png' },
      { id: 16, name: 'فلتر بنزين أصلي', price: 300, imageUrl: 'assets/images/image100_100.png' },
      { id: 17, name: 'مراية جانبية نيسان', price: 600, imageUrl: 'assets/images/image100_100.png' },
      { id: 18, name: 'طقم بوجيهات بوش', price: 700, imageUrl: 'assets/images/image100_100.png' },
      { id: 19, name: 'كمبروسر تبريد أصلي', price: 3200, imageUrl: 'assets/images/image100_100.png' },
      { id: 20, name: 'مساعدين أمامي ميتسوبيشي', price: 1500, imageUrl: 'assets/images/image100_100.png' }
    ];
  }

  ngAfterViewInit(): void {
    new Swiper('.parts-preview-swiper', {
      slidesPerView: 4,
      spaceBetween: 20,
      loop: true,
      autoplay: {
        delay: 4000,
        disableOnInteraction: false,
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
      rtl: true,
      breakpoints: {
        320: {
          slidesPerView: 1,
          spaceBetween: 10,
        },
        640: {
          slidesPerView: 2,
          spaceBetween: 15,
        },
        768: {
          slidesPerView: 3,
          spaceBetween: 20,
        },
        1024: {
          slidesPerView: 4,
          spaceBetween: 25,
        }
      }
    });
  }
}
