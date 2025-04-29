import { Component, OnInit, AfterViewInit } from '@angular/core';
declare var Swiper: any;

@Component({
  selector: 'app-suggested-offers',
  templateUrl: './suggested-offers.component.html',
  styleUrls: ['./suggested-offers.component.scss']
})
export class SuggestedOffersComponent implements OnInit, AfterViewInit {

  suggestedOffers: any[] = [];

  constructor() { }

  ngOnInit(): void {
    // بيانات تجريبية للمقترحات
    this.suggestedOffers = [
      { id: 1, name: 'فلتر زيت', price: 120, imageUrl: 'assets/images/image100_100.png' },
      { id: 2, name: 'مساعد خلفي', price: 450, imageUrl: 'assets/images/image100_100.png' },
      { id: 3, name: 'كمبروسر تكييف', price: 1100, imageUrl: 'assets/images/image100_100.png' },
      { id: 4, name: 'بطارية سيارة', price: 850, imageUrl: 'assets/images/image100_100.png' },
      { id: 5, name: 'طقم مساعدين', price: 2000, imageUrl: 'assets/images/image100_100.png' },
      { id: 6, name: 'سير كاتينة', price: 320, imageUrl: 'assets/images/image100_100.png' },
      { id: 1, name: 'فلتر زيت', price: 120, imageUrl: 'assets/images/image100_100.png' },
      { id: 2, name: 'مساعد خلفي', price: 450, imageUrl: 'assets/images/image100_100.png' },
      { id: 3, name: 'كمبروسر تكييف', price: 1100, imageUrl: 'assets/images/image100_100.png' },
      { id: 4, name: 'بطارية سيارة', price: 850, imageUrl: 'assets/images/image100_100.png' },
      { id: 5, name: 'طقم مساعدين', price: 2000, imageUrl: 'assets/images/image100_100.png' },
      { id: 6, name: 'سير كاتينة', price: 320, imageUrl: 'assets/images/image100_100.png' },
    ];
  }

  ngAfterViewInit(): void {
    new Swiper('.suggested-swiper', {
      slidesPerView: 6,
      spaceBetween: 20,
      loop: true,
      autoplay: {
        delay: 3000, // 👈 أسرع شويه
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
      speed: 800,
    });
  }



}
