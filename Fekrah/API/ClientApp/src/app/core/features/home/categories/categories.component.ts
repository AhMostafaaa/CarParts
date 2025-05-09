import { Component, OnInit, AfterViewInit } from '@angular/core';
declare var Swiper: any;

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit, AfterViewInit {
  categories: { name: string; image: string; count: number; }[] = [];

  constructor() { }

  ngOnInit(): void {
    this.categories = [
      { name: 'كهرباء', image: 'assets/images/image_100_100.png', count: 34 },
      { name: 'ميكانيكا', image: 'assets/images/image_100_100.png', count: 28 },
      { name: 'عفشة', image: 'assets/images/image_100_100.png', count: 19 },
      { name: 'سمكرة', image: 'assets/images/image_100_100.png', count: 22 },
      { name: 'دهانات', image: 'assets/images/image_100_100.png', count: 12 },
      { name: 'بطاريات', image: 'assets/images/image_100_100.png', count: 16 },
      { name: 'كهرباء', image: 'assets/images/image_100_100.png', count: 34 },
      { name: 'ميكانيكا', image: 'assets/images/image_100_100.png', count: 28 },
      { name: 'عفشة', image: 'assets/images/image_100_100.png', count: 19 },
      { name: 'سمكرة', image: 'assets/images/image_100_100.png', count: 22 },
      { name: 'دهانات', image: 'assets/images/image_100_100.png', count: 12 },
      { name: 'بطاريات', image: 'assets/images/image_100_100.png', count: 16 },
      { name: 'كهرباء', image: 'assets/images/image_100_100.png', count: 34 },
      { name: 'ميكانيكا', image: 'assets/images/image_100_100.png', count: 28 },
      { name: 'عفشة', image: 'assets/images/image_100_100.png', count: 19 },
      { name: 'سمكرة', image: 'assets/images/image_100_100.png', count: 22 },
      { name: 'دهانات', image: 'assets/images/image_100_100.png', count: 12 },
      { name: 'بطاريات', image: 'assets/images/image_100_100.png', count: 16 },
      { name: 'أكسسوارات', image: 'assets/images/image_100_100.png', count: 40 }
    ];
  }

  ngAfterViewInit(): void {
    new Swiper('.swiper-container', {
      slidesPerView: 7,
      spaceBetween: 8,
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
          slidesPerView: 4,
          spaceBetween: 5,
        },
        768: {
          slidesPerView: 5,
          spaceBetween: 6,
        },
        1024: {
          slidesPerView: 7,
          spaceBetween: 8,
        }
      }
    });
  }
}
