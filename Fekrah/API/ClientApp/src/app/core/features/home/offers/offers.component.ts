import { AfterViewInit, Component, OnInit } from '@angular/core';
import Swiper from 'swiper';

@Component({
  selector: 'app-offers',
  templateUrl: './offers.component.html',
  styleUrls: ['./offers.component.scss']
})
export class OffersComponent implements OnInit, AfterViewInit {

  bestOffers: any[] = [];

  constructor() { }

  ngOnInit(): void {
    this.bestOffers = [
      {
        id: 1,
        name: 'كبالن داخلية',
        price: 1082,
        oldPrice: 1274,
        discount: 15,
        condition: 'New',
        isBestSeller: true,
        imageUrl: 'assets/images/image100_100.png'
      },
      {
        id: 2,
        name: 'فلتر هواء',
        price: 1460,
        oldPrice: 1460,
        discount: 0,
        condition: 'New',
        isBestSeller: false,
        imageUrl: 'assets/images/image100_100.png'
      },
      {
        id: 3,
        name: 'لمبة زينون',
        price: 686,
        oldPrice: 981,
        discount: 30,
        condition: 'New',
        isBestSeller: true,
        imageUrl: 'assets/images/image100_100.png'
      },
      {
        id: 4,
        name: 'فلتر زيت',
        price: 266,
        oldPrice: 314,
        discount: 15,
        condition: 'New',
        isBestSeller: true,
        imageUrl: 'assets/images/image100_100.png'
      },
      {
        id: 5,
        name: 'بوجيهات NGK',
        price: 385,
        oldPrice: 551,
        discount: 30,
        condition: 'New',
        isBestSeller: true,
        imageUrl: 'assets/images/image100_100.png'
      },
      {
        id: 6,
        name: 'كشاف أمامي',
        price: 409,
        oldPrice: 409,
        discount: 0,
        condition: 'New',
        isBestSeller: false,
        imageUrl: 'assets/images/image100_100.png'
      },
      {
        id: 7,
        name: 'كمبروسر تكييف',
        price: 947,
        oldPrice: 1354,
        discount: 30,
        condition: 'New',
        isBestSeller: true,
        imageUrl: 'assets/images/image100_100.png'
      },
      {
        id: 8,
        name: 'باور ستيرنج',
        price: 396,
        oldPrice: 440,
        discount: 10,
        condition: 'New',
        isBestSeller: true,
        imageUrl: 'assets/images/image100_100.png'
      },
      {
        id: 9,
        name: 'طقم فرامل',
        price: 388,
        oldPrice: 485,
        discount: 20,
        condition: 'New',
        isBestSeller: true,
        imageUrl: 'assets/images/image100_100.png'
      },
      {
        id: 10,
        name: 'ردياتير مياه',
        price: 1125,
        oldPrice: 1251,
        discount: 10,
        condition: 'New',
        isBestSeller: true,
        imageUrl: 'assets/images/image100_100.png'
      },
      {
        id: 11,
        name: 'بطارية AC Delco',
        price: 260,
        oldPrice: 326,
        discount: 20,
        condition: 'New',
        isBestSeller: true,
        imageUrl: 'assets/images/image100_100.png'
      },
      {
        id: 12,
        name: 'جهاز كشف أعطال',
        price: 624,
        oldPrice: 832,
        discount: 25,
        condition: 'New',
        isBestSeller: true,
        imageUrl: 'assets/images/image100_100.png'
      },
      {
        id: 13,
        name: 'طرمبة بنزين',
        price: 368,
        oldPrice: 434,
        discount: 15,
        condition: 'New',
        isBestSeller: false,
        imageUrl: 'assets/images/image100_100.png'
      },
      {
        id: 14,
        name: 'دينامو شحن',
        price: 612,
        oldPrice: 612,
        discount: 0,
        condition: 'New',
        isBestSeller: true,
        imageUrl: 'assets/images/image100_100.png'
      },
      {
        id: 15,
        name: 'زيت محرك شل',
        price: 843,
        oldPrice: 1032,
        discount: 18,
        condition: 'New',
        isBestSeller: false,
        imageUrl: 'assets/images/image100_100.png'
      },
      {
        id: 16,
        name: 'فلتر كابينة',
        price: 320,
        oldPrice: 400,
        discount: 20,
        condition: 'New',
        isBestSeller: true,
        imageUrl: 'assets/images/image100_100.png'
      },
      {
        id: 17,
        name: 'ردياتير نيسان',
        price: 781,
        oldPrice: 920,
        discount: 15,
        condition: 'New',
        isBestSeller: false,
        imageUrl: 'assets/images/image100_100.png'
      },
      {
        id: 18,
        name: 'طارة دركسيون',
        price: 1245,
        oldPrice: 1384,
        discount: 10,
        condition: 'New',
        isBestSeller: true,
        imageUrl: 'assets/images/image100_100.png'
      },
      {
        id: 19,
        name: 'حساس أكسجين',
        price: 441,
        oldPrice: 552,
        discount: 20,
        condition: 'New',
        isBestSeller: false,
        imageUrl: 'assets/images/image100_100.png'
      },
      {
        id: 20,
        name: 'لمبة زينون',
        price: 1059,
        oldPrice: 1412,
        discount: 25,
        condition: 'New',
        isBestSeller: true,
        imageUrl: 'assets/images/image100_100.png'
      }
      // 🔁 كرر الباقي بنفس الشكل لو محتاج أكثر من 20 عنصر
    ];





  }
  ngAfterViewInit(): void {
    new Swiper('.offers-swiper', {
      slidesPerView: 6,
      spaceBetween: 30,
      loop: true,
      autoplay: {
        delay: 4000,
        disableOnInteraction: false,
        reverseDirection: false, // ✅ الحركة من اليمين لليسار
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
      speed: 800,
      breakpoints: {
        320: {
          slidesPerView: 2,
          spaceBetween: 10,
        },
        768: {
          slidesPerView: 4,
          spaceBetween: 20,
        },
        1024: {
          slidesPerView: 5,
          spaceBetween: 30,
        },
      }
    });
  }




}
