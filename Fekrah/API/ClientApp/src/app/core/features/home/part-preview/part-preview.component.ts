import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import Swiper from 'swiper';
import {
  Navigation,
  Pagination,
  Autoplay,
  EffectCoverflow
} from 'swiper/modules';


interface CarPart {
  id: number;
  name: string;
  brand: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  rating: number;
  reviews: number;
  isNew?: boolean;
  discount?: number;
  inStock: boolean;
}

@Component({
  selector: 'app-part-preview',
  templateUrl: './part-preview.component.html',
  styleUrls: ['./part-preview.component.scss']
})
export class PartPreviewComponent implements OnInit, AfterViewInit, OnDestroy {
  private swiper: Swiper | null = null;

  latestParts: CarPart[] = [
    {
      id: 1,
      name: 'فلتر هواء عالي الأداء',
      brand: 'K&N',
      price: 450,
      originalPrice: 520,
      image: 'assets/images/image_100_100.png',
      category: 'فلاتر',
      rating: 4.8,
      reviews: 142,
      isNew: true,
      discount: 13,
      inStock: true
    },
    {
      id: 2,
      name: 'فرامل سيراميك متقدمة',
      brand: 'Brembo',
      price: 1200,
      originalPrice: 1450,
      image: 'assets/images/image_100_100.png',
      category: 'فرامل',
      rating: 4.9,
      reviews: 89,
      discount: 17,
      inStock: true
    },
    {
      id: 3,
      name: 'مصابيح LED للمقدمة',
      brand: 'Philips',
      price: 280,
      image: 'assets/images/image_100_100.png',
      category: 'إضاءة',
      rating: 4.7,
      reviews: 234,
      isNew: true,
      inStock: false
    },
    {
      id: 4,
      name: 'زيت محرك سينثتيك',
      brand: 'Mobil 1',
      price: 65,
      originalPrice: 80,
      image: 'assets/images/image_100_100.png',
      category: 'زيوت',
      rating: 4.6,
      reviews: 567,
      discount: 19,
      inStock: true
    },
    {
      id: 5,
      name: 'إطارات عالية الأداء',
      brand: 'Michelin',
      price: 950,
      image: 'assets/images/image_100_100.png',
      category: 'إطارات',
      rating: 4.8,
      reviews: 178,
      inStock: true
    },
    {
      id: 6,
      name: 'بطارية سيارة متقدمة',
      brand: 'Bosch',
      price: 340,
      originalPrice: 400,
      image: 'assets/images/image_100_100.png',
      category: 'كهرباء',
      rating: 4.5,
      reviews: 298,
      discount: 15,
      inStock: true
    }
  ];

  ngOnInit(): void {
    // Component initialization logic
  }

  ngAfterViewInit(): void {
    this.initializeSwiper();
  }

  ngOnDestroy(): void {
    if (this.swiper) {
      this.swiper.destroy(true, true);
    }
  }

  private initializeSwiper(): void {
    setTimeout(() => {
      this.swiper = new Swiper('.part-swiper', {
        slidesPerView: 1,
        spaceBetween: 30,
        loop: true,
        centeredSlides: true,
        effect: 'coverflow',
        coverflowEffect: {
          rotate: 20,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true,
        },
        autoplay: {
          delay: 4000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true
        },
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
          dynamicBullets: true
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        },
        breakpoints: {
          320: {
            slidesPerView: 1,
            spaceBetween: 20,
            effect: 'slide'
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 25,
            effect: 'slide'
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 30,
            effect: 'coverflow'
          },
          1400: {
            slidesPerView: 4,
            spaceBetween: 35,
            effect: 'coverflow'
          }
        },
        on: {
          slideChange: () => {
            // Add any slide change logic here
          }
        }
      });
    }, 100);
  }

  onPartClick(part: CarPart): void {
    console.log('Part clicked:', part);
    // Handle part click logic here
  }

  addToCart(part: CarPart, event: Event): void {
    event.stopPropagation();
    console.log('Added to cart:', part);
    // Handle add to cart logic here
  }

  addToWishlist(part: CarPart, event: Event): void {
    event.stopPropagation();
    console.log('Added to wishlist:', part);
    // Handle add to wishlist logic here
  }

  trackByPartId(index: number, part: CarPart): number {
    return part.id;
  }
}
