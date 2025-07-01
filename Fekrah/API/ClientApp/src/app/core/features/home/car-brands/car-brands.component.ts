import { Component, OnInit } from '@angular/core';
import Swiper from 'swiper';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';

@Component({
  selector: 'app-car-brands',
  templateUrl: './car-brands.component.html',
  styleUrls: ['./car-brands.component.scss']
})
export class CarBrandsComponent implements OnInit {
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
    // أكمل باقي الماركات
  ];

  ngOnInit() {
    new Swiper('.swiper', {
      modules: [Navigation, Pagination, Autoplay],
      slidesPerView: 'auto',
      spaceBetween: 2,
      loop: true,
      centeredSlides: false,
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
          spaceBetween: 10,  // زيادة المسافة بين الكروت هنا
          centeredSlides: false,
        },
        480: {
          slidesPerView: 4,
          spaceBetween: 20,  // زيادة المسافة هنا أيضاً
        },
        768: {
          slidesPerView: 6,
          spaceBetween: 20,
        },
        1024: {
          slidesPerView: 10,
          spaceBetween: 10,
        },
      }

    });


  }
}
