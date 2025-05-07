import { Component, OnInit, AfterViewInit } from '@angular/core';
import Swiper from 'swiper';

@Component({
  selector: 'app-featured-sellers',
  templateUrl: './featured-sellers.component.html',
  styleUrls: ['./featured-sellers.component.scss']
})
export class FeaturedSellersComponent implements OnInit, AfterViewInit {

  sellers = [
    {
      id: 1,
      name: 'مؤسسة البطاريات',
      imageUrl: 'assets/images/image_100_100.png',
      location: 'القاهرة',
      whatsapp: '201234567890'
    },
    {
      id: 2,
      name: 'مركز الفلاتر الأصلي',
      imageUrl: 'assets/images/image_100_100.png',
      location: 'الإسكندرية',
      whatsapp: '201112223334'
    },
    {
      id: 2,
      name: 'مركز الفلاتر الأصلي',
      imageUrl: 'assets/images/image_100_100.png',
      location: 'الإسكندرية',
      whatsapp: '201112223334'
    },
    {
      id: 2,
      name: 'مركز الفلاتر الأصلي',
      imageUrl: 'assets/images/image_100_100.png',
      location: 'الإسكندرية',
      whatsapp: '201112223334'
    },
    {
      id: 2,
      name: 'مركز الفلاتر الأصلي',
      imageUrl: 'assets/images/image_100_100.png',
      location: 'الإسكندرية',
      whatsapp: '201112223334'
    },
    {
      id: 2,
      name: 'مركز الفلاتر الأصلي',
      imageUrl: 'assets/images/image_100_100.png',
      location: 'الإسكندرية',
      whatsapp: '201112223334'
    },
    {
      id: 2,
      name: 'مركز الفلاتر الأصلي',
      imageUrl: 'assets/images/image_100_100.png',
      location: 'الإسكندرية',
      whatsapp: '201112223334'
    },
    {
      id: 3,
      name: 'محل الكهرباء الحديثة',
      imageUrl: 'assets/images/image_100_100.png',
      location: 'الجيزة',
      whatsapp: '201023456789'
    },
    {
      id: 4,
      name: 'متجر الإنارة للسيارات',
      imageUrl: 'assets/images/image_100_100.png',
      location: 'دمياط',
      whatsapp: '201099887766'
    },
    {
      id: 5,
      name: 'شركة التبريد الحديثة',
      imageUrl: 'assets/images/image_100_100.png',
      location: 'بني سويف',
      whatsapp: '201088776655'
    }
    // يمكنك إضافة المزيد بنفس المسار
  ];
  

  ngOnInit(): void { }

  ngAfterViewInit(): void {
    new Swiper('.featured-sellers-swiper', {
      slidesPerView: 5,
      spaceBetween: 20,
      loop: true,
      autoplay: {
        delay: 3500,
        disableOnInteraction: false
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev'
      },
      pagination: {
        el: '.swiper-pagination',
        clickable: true
      },
      breakpoints: {
        320: { slidesPerView: 2, spaceBetween: 10 },
        640: { slidesPerView: 3, spaceBetween: 15 },
        1024: { slidesPerView: 5, spaceBetween: 20 }
      }
    });
  }
}
