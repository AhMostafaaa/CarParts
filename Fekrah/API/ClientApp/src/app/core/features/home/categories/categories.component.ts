import { Component, OnInit, AfterViewInit } from '@angular/core';
declare var Swiper: any;

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit, AfterViewInit {

  categories: any[] = [];

  constructor() { }

  ngOnInit(): void {
    this.categories = [
      { name: 'كهرباء', image: 'assets/images/image_100_100.png' },
      { name: 'كهرباء', image: 'assets/images/image_100_100.png' },
      { name: 'كهرباء', image: 'assets/images/image_100_100.png' },
      { name: 'ميكانيكا', image: 'assets/images/image_100_100.png' },
      { name: 'ميكانيكا', image: 'assets/images/image_100_100.png' },
      { name: 'ميكانيكا', image: 'assets/images/image_100_100.png' },
      { name: 'عفشة', image: 'assets/images/image_100_100.png' },
      { name: 'عفشة', image: 'assets/images/image_100_100.png' },
      { name: 'عفشة', image: 'assets/images/image_100_100.png' },
      { name: 'سمكرة', image: 'assets/images/image_100_100.png' },
      { name: 'سمكرة', image: 'assets/images/image_100_100.png' },
      { name: 'سمكرة', image: 'assets/images/image_100_100.png' },
      { name: 'دهانات', image: 'assets/images/image_100_100.png' },
      { name: 'بطاريات', image: 'assets/images/image_100_100.png' },
      { name: 'أكسسوارات', image: 'assets/images/image_100_100.png' }
    ];
  }

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
