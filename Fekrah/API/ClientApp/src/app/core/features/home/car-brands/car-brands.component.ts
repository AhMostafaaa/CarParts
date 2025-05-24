import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swiper from 'swiper';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';

@Component({
  selector: 'app-car-brands',
  templateUrl: './car-brands.component.html',
  styleUrls: ['./car-brands.component.scss']
})
export class CarBrandsComponent implements OnInit {
  constructor() {}

  carBrands = [
      { id: 1, name: 'تويوتا', logo: 'assets/images/image_100_100.png' },
      { id: 2, name: 'هيونداي', logo: 'assets/images/image_100_100.png' },
      { id: 3, name: 'نيسان', logo: 'assets/images/image_100_100.png' },
      { id: 4, name: 'شيفروليه', logo: 'assets/images/image_100_100.png' },
      { id: 5, name: 'كيا', logo: 'assets/images/image_100_100.png' },
      { id: 1, name: 'تويوتا', logo: 'assets/images/image_100_100.png' },
      { id: 2, name: 'هيونداي', logo: 'assets/images/image_100_100.png' },
      { id: 3, name: 'نيسان', logo: 'assets/images/image_100_100.png' },
      { id: 4, name: 'شيفروليه', logo: 'assets/images/image_100_100.png' },
      { id: 5, name: 'كيا', logo: 'assets/images/image_100_100.png' },
      { id: 1, name: 'تويوتا', logo: 'assets/images/image_100_100.png' },
      { id: 2, name: 'هيونداي', logo: 'assets/images/image_100_100.png' },
      { id: 3, name: 'نيسان', logo: 'assets/images/image_100_100.png' },
      { id: 4, name: 'شيفروليه', logo: 'assets/images/image_100_100.png' },
      { id: 5, name: 'كيا', logo: 'assets/images/image_100_100.png' },
      { id: 1, name: 'تويوتا', logo: 'assets/images/image_100_100.png' },
      { id: 2, name: 'هيونداي', logo: 'assets/images/image_100_100.png' },
      { id: 3, name: 'نيسان', logo: 'assets/images/image_100_100.png' },
      { id: 4, name: 'شيفروليه', logo: 'assets/images/image_100_100.png' },
      { id: 5, name: 'كيا', logo: 'assets/images/image_100_100.png' },
      { id: 1, name: 'تويوتا', logo: 'assets/images/image_100_100.png' },
      { id: 2, name: 'هيونداي', logo: 'assets/images/image_100_100.png' },
      { id: 3, name: 'نيسان', logo: 'assets/images/image_100_100.png' },
      { id: 4, name: 'شيفروليه', logo: 'assets/images/image_100_100.png' },
      { id: 5, name: 'كيا', logo: 'assets/images/image_100_100.png' },
      { id: 1, name: 'تويوتا', logo: 'assets/images/image_100_100.png' },
      { id: 2, name: 'هيونداي', logo: 'assets/images/image_100_100.png' },
      { id: 3, name: 'نيسان', logo: 'assets/images/image_100_100.png' },
      { id: 4, name: 'شيفروليه', logo: 'assets/images/image_100_100.png' },
      { id: 5, name: 'كيا', logo: 'assets/images/image_100_100.png' },
      // أكمل باقي الماركات
    ];


  ngOnInit() {
    const swiper = new Swiper('.swiper', {
      modules: [Navigation, Pagination, Autoplay],
      slidesPerView: 'auto',
      spaceBetween: 10,
      centeredSlides: false,
      loop: true,
      autoplay: {
        delay: 3000,
        disableOnInteraction: false,
      },
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      breakpoints: {
        320: {
          slidesPerView: 3,
          spaceBetween: 10
        },
        480: {
          slidesPerView: 4,
          spaceBetween: 15
        },
        768: {
          slidesPerView: 6,
          spaceBetween: 15
        },
        1024: {
          slidesPerView: 11,
          spaceBetween: 20
        }
      }
    });
  }



}
