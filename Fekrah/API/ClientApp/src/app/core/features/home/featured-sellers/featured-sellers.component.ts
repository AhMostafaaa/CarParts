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
      whatsapp: '201234567890',
      category: 'كهرباء السيارة'
    },
    {
      id: 2,
      name: 'مركز الفلاتر الأصلي',
      imageUrl: 'assets/images/image_100_100.png',
      location: 'الإسكندرية',
      whatsapp: '201112223334',
      category: 'الفلاتر'
    },
    {
      id: 1,
      name: 'مؤسسة البطاريات',
      imageUrl: 'assets/images/image_100_100.png',
      location: 'القاهرة',
      whatsapp: '201234567890',
      category: 'كهرباء السيارة'
    },
    {
      id: 2,
      name: 'مركز الفلاتر الأصلي',
      imageUrl: 'assets/images/image_100_100.png',
      location: 'الإسكندرية',
      whatsapp: '201112223334',
      category: 'الفلاتر'
    },
    {
      id: 1,
      name: 'مؤسسة البطاريات',
      imageUrl: 'assets/images/image_100_100.png',
      location: 'القاهرة',
      whatsapp: '201234567890',
      category: 'كهرباء السيارة'
    },
    {
      id: 2,
      name: 'مركز الفلاتر الأصلي',
      imageUrl: 'assets/images/image_100_100.png',
      location: 'الإسكندرية',
      whatsapp: '201112223334',
      category: 'الفلاتر'
    },
    {
      id: 1,
      name: 'مؤسسة البطاريات',
      imageUrl: 'assets/images/image_100_100.png',
      location: 'القاهرة',
      whatsapp: '201234567890',
      category: 'كهرباء السيارة'
    },
    {
      id: 2,
      name: 'مركز الفلاتر الأصلي',
      imageUrl: 'assets/images/image_100_100.png',
      location: 'الإسكندرية',
      whatsapp: '201112223334',
      category: 'الفلاتر'
    },
    {
      id: 1,
      name: 'مؤسسة البطاريات',
      imageUrl: 'assets/images/image_100_100.png',
      location: 'القاهرة',
      whatsapp: '201234567890',
      category: 'كهرباء السيارة'
    },
    {
      id: 2,
      name: 'مركز الفلاتر الأصلي',
      imageUrl: 'assets/images/image_100_100.png',
      location: 'الإسكندرية',
      whatsapp: '201112223334',
      category: 'الفلاتر'
    },
    {
      id: 1,
      name: 'مؤسسة البطاريات',
      imageUrl: 'assets/images/image_100_100.png',
      location: 'القاهرة',
      whatsapp: '201234567890',
      category: 'كهرباء السيارة'
    },
    {
      id: 2,
      name: 'مركز الفلاتر الأصلي',
      imageUrl: 'assets/images/image_100_100.png',
      location: 'الإسكندرية',
      whatsapp: '201112223334',
      category: 'الفلاتر'
    },
    {
      id: 1,
      name: 'مؤسسة البطاريات',
      imageUrl: 'assets/images/image_100_100.png',
      location: 'القاهرة',
      whatsapp: '201234567890',
      category: 'كهرباء السيارة'
    },
    {
      id: 2,
      name: 'مركز الفلاتر الأصلي',
      imageUrl: 'assets/images/image_100_100.png',
      location: 'الإسكندرية',
      whatsapp: '201112223334',
      category: 'الفلاتر'
    },
    {
      id: 1,
      name: 'مؤسسة البطاريات',
      imageUrl: 'assets/images/image_100_100.png',
      location: 'القاهرة',
      whatsapp: '201234567890',
      category: 'كهرباء السيارة'
    },
    {
      id: 2,
      name: 'مركز الفلاتر الأصلي',
      imageUrl: 'assets/images/image_100_100.png',
      location: 'الإسكندرية',
      whatsapp: '201112223334',
      category: 'الفلاتر'
    },
    {
      id: 1,
      name: 'مؤسسة البطاريات',
      imageUrl: 'assets/images/image_100_100.png',
      location: 'القاهرة',
      whatsapp: '201234567890',
      category: 'كهرباء السيارة'
    },
    {
      id: 2,
      name: 'مركز الفلاتر الأصلي',
      imageUrl: 'assets/images/image_100_100.png',
      location: 'الإسكندرية',
      whatsapp: '201112223334',
      category: 'الفلاتر'
    },
  ];



  ngOnInit(): void { }

  ngAfterViewInit(): void {
    new Swiper('.swiper-container', {
      slidesPerView: 6,
      spaceBetween: 10,
      loop: true,
      autoplay: {
        delay: 3000,
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
      speed: 800,
      rtl: true,
      breakpoints: {
        640: {
          slidesPerView: 3,
          spaceBetween: 1,
        },
        768: {
          slidesPerView: 4,
          spaceBetween: 1,
        },
        1024: {
          slidesPerView: 7,
          spaceBetween: 1,
        }
      }
    });
  }
}
