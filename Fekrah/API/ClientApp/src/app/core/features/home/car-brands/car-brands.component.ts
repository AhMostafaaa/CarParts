import { Component, OnInit } from '@angular/core';
import Swiper from 'swiper';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';

@Component({
  selector: 'app-car-brands',
  templateUrl: './car-brands.component.html',
  styleUrls: ['./car-brands.component.scss']
})
export class CarBrandsComponent implements OnInit {
  carBrands = [
    { name: 'تويوتا', logo: 'assets/images/image_100_100.png' },
    { name: 'هيونداي', logo: 'assets/images/image_100_100.png' },
    { name: 'نيسان', logo: 'assets/images/image_100_100.png' },
    { name: 'شيفروليه', logo: 'assets/images/image_100_100.png' },
    { name: 'كيا', logo: 'assets/images/image_100_100.png' },
    { name: 'بي إم دبليو', logo: 'assets/images/image_100_100.png' },
    { name: 'مرسيدس', logo: 'assets/images/image_100_100.png' },
    { name: 'تويوتا', logo: 'assets/images/image_100_100.png' },
    { name: 'هيونداي', logo: 'assets/images/image_100_100.png' },
    { name: 'نيسان', logo: 'assets/images/image_100_100.png' },
    { name: 'شيفروليه', logo: 'assets/images/image_100_100.png' },
    { name: 'كيا', logo: 'assets/images/image_100_100.png' },
    { name: 'بي إم دبليو', logo: 'assets/images/image_100_100.png' },
    { name: 'مرسيدس', logo: 'assets/images/image_100_100.png' },
    { name: 'فورد', logo: 'assets/images/image_100_100.png' }
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

  goToBrand(name: string) {
    console.log('انتقال إلى صفحة:', name);
  }
}
