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
        name: 'فلتر هواء تويوتا كورولا',
        description: 'فلتر هواء أصلي يناسب موديلات كورولا من 2015 إلى 2020.',
        price: 180,
        condition: 'New',
        imageUrl: 'assets/images/image100_100.png',
        sellerShopName: 'مركز التوفيق',
        categoryName: 'الفلاتر',
        isSold: false
      },
      {
        id: 2,
        name: 'مساعد أمامي هونداي النترا',
        description: 'مساعدين أماميين مجددين بجودة عالية.',
        price: 750,
        condition: 'Refurbished',
        imageUrl: 'assets/images/image100_100.png',
        sellerShopName: 'ورشة الشرق',
        categoryName: 'العفشة',
        isSold: false
      },
      {
        id: 1,
        name: 'فلتر هواء تويوتا كورولا',
        description: 'فلتر هواء أصلي يناسب موديلات كورولا من 2015 إلى 2020.',
        price: 180,
        condition: 'New',
        imageUrl: 'assets/images/image100_100.png',
        sellerShopName: 'مركز التوفيق',
        categoryName: 'الفلاتر',
        isSold: false
      },
      {
        id: 2,
        name: 'مساعد أمامي هونداي النترا',
        description: 'مساعدين أماميين مجددين بجودة عالية.',
        price: 750,
        condition: 'Refurbished',
        imageUrl: 'assets/images/image100_100.png',
        sellerShopName: 'ورشة الشرق',
        categoryName: 'العفشة',
        isSold: false
      },
      {
        id: 1,
        name: 'فلتر هواء تويوتا كورولا',
        description: 'فلتر هواء أصلي يناسب موديلات كورولا من 2015 إلى 2020.',
        price: 180,
        condition: 'New',
        imageUrl: 'assets/images/image100_100.png',
        sellerShopName: 'مركز التوفيق',
        categoryName: 'الفلاتر',
        isSold: false
      },
      {
        id: 2,
        name: 'مساعد أمامي هونداي النترا',
        description: 'مساعدين أماميين مجددين بجودة عالية.',
        price: 750,
        condition: 'Refurbished',
        imageUrl: 'assets/images/image100_100.png',
        sellerShopName: 'ورشة الشرق',
        categoryName: 'العفشة',
        isSold: false
      },
      {
        id: 1,
        name: 'فلتر هواء تويوتا كورولا',
        description: 'فلتر هواء أصلي يناسب موديلات كورولا من 2015 إلى 2020.',
        price: 180,
        condition: 'New',
        imageUrl: 'assets/images/image100_100.png',
        sellerShopName: 'مركز التوفيق',
        categoryName: 'الفلاتر',
        isSold: false
      },
      {
        id: 2,
        name: 'مساعد أمامي هونداي النترا',
        description: 'مساعدين أماميين مجددين بجودة عالية.',
        price: 750,
        condition: 'Refurbished',
        imageUrl: 'assets/images/image100_100.png',
        sellerShopName: 'ورشة الشرق',
        categoryName: 'العفشة',
        isSold: false
      },
      {
        id: 1,
        name: 'فلتر هواء تويوتا كورولا',
        description: 'فلتر هواء أصلي يناسب موديلات كورولا من 2015 إلى 2020.',
        price: 180,
        condition: 'New',
        imageUrl: 'assets/images/image100_100.png',
        sellerShopName: 'مركز التوفيق',
        categoryName: 'الفلاتر',
        isSold: false
      },
      {
        id: 2,
        name: 'مساعد أمامي هونداي النترا',
        description: 'مساعدين أماميين مجددين بجودة عالية.',
        price: 750,
        condition: 'Refurbished',
        imageUrl: 'assets/images/image100_100.png',
        sellerShopName: 'ورشة الشرق',
        categoryName: 'العفشة',
        isSold: false
      },
      {
        id: 1,
        name: 'فلتر هواء تويوتا كورولا',
        description: 'فلتر هواء أصلي يناسب موديلات كورولا من 2015 إلى 2020.',
        price: 180,
        condition: 'New',
        imageUrl: 'assets/images/image100_100.png',
        sellerShopName: 'مركز التوفيق',
        categoryName: 'الفلاتر',
        isSold: false
      },
      {
        id: 2,
        name: 'مساعد أمامي هونداي النترا',
        description: 'مساعدين أماميين مجددين بجودة عالية.',
        price: 750,
        condition: 'Refurbished',
        imageUrl: 'assets/images/image100_100.png',
        sellerShopName: 'ورشة الشرق',
        categoryName: 'العفشة',
        isSold: false
      },
      {
        id: 2,
        name: 'مساعد أمامي هونداي النترا',
        description: 'مساعدين أماميين مجددين بجودة عالية.',
        price: 750,
        condition: 'Refurbished',
        imageUrl: 'assets/images/image100_100.png',
        sellerShopName: 'ورشة الشرق',
        categoryName: 'العفشة',
        isSold: false
      },
      {
        id: 3,
        name: 'ردياتير نيسان صني',
        description: 'ردياتير مياه جديد يناسب جميع موديلات نيسان صني.',
        price: 550,
        condition: 'New',
        imageUrl: 'assets/images/image100_100.png',
        sellerShopName: 'التجارة الحديثة',
        categoryName: 'التبريد',
        isSold: false
      }
    ];

  }
  ngAfterViewInit(): void {
    new Swiper('.offers-swiper', {
      slidesPerView: 6, // 👈 هنا بتزود عدد الكروت
      spaceBetween: 15,
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
      speed: 700,
      rtl: true,
      breakpoints: {
        320: {
          slidesPerView: 2,
          spaceBetween: 10,
        },
        640: {
          slidesPerView: 3,
          spaceBetween: 10,
        },
        768: {
          slidesPerView: 4,
          spaceBetween: 15,
        },
        1024: {
          slidesPerView: 6, // 👈 على الشاشات الكبيرة خلي 6 كروت مع بعض
          spaceBetween: 20,
        }
      }
    });
  }

}
