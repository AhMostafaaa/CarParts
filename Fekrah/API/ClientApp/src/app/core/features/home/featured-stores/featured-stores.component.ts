// featured-stores.component.ts
import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { StoresService } from 'src/app/Shared/Services/stores.service';
import Swiper from 'swiper';

export interface Seller {
  id: number;
  name: string;
  imageUrl: string;
  location: string;
  category: string;
  isTrusted: boolean;
  rating?: number;
  reviewsCount?: number;
}

@Component({
  selector: 'app-featured-stores',
  templateUrl: './featured-stores.component.html',
  styleUrls: ['./featured-stores.component.scss']
})
export class FeaturedStoresComponent implements OnInit, AfterViewInit {
  @ViewChild('swiperContainer', { static: false }) swiperContainer!: ElementRef;
  
  sellers: Seller[] = [];
  isLoading = false;
  swiper!: Swiper;
  showViewMore = false;

  constructor(
    private storesService: StoresService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadFeaturedStores();
  }

  ngAfterViewInit(): void {
    this.initializeSwiper();
  }

  loadFeaturedStores(): void {
    this.isLoading = true;
    
    this.storesService.getFeaturedStores(8).subscribe({
      next: (stores: any[]) => {
        this.sellers = stores.map(store => ({
          id: store.id,
          name: store.arabicName,
          imageUrl: store.logo,
          location: store.arabicLocation,
          category: store.arabicSpecialties[0] || 'قطع غيار',
          isTrusted: store.isVerified,
          rating: store.rating,
          reviewsCount: store.reviewsCount
        }));
        
        // إظهار زر "عرض المزيد" إذا كان هناك أكثر من 6 متاجر
        this.showViewMore = this.sellers.length >= 6;
        this.isLoading = false;
        
        // إعادة تهيئة السوايبر بعد تحديث البيانات
        setTimeout(() => {
          if (this.swiper) {
            this.swiper.update();
          } else {
            this.initializeSwiper();
          }
        }, 100);
      },
      error: (error) => {
        console.error('Error loading featured stores:', error);
        this.isLoading = false;
      }
    });
  }

  initializeSwiper(): void {
    if (!this.swiperContainer) return;

    // تدمير السوايبر السابق إن وجد
    if (this.swiper) {
      this.swiper.destroy(true, true);
    }

    this.swiper = new Swiper(this.swiperContainer.nativeElement, {
      slidesPerView: 'auto',
      spaceBetween: 20,
      centeredSlides: false,
      loop: false,
      autoplay: {
        delay: 3000,
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
        prevEl: '.swiper-button-prev',
      },
      breakpoints: {
        320: {
          slidesPerView: 1.2,
          spaceBetween: 15
        },
        480: {
          slidesPerView: 1.5,
          spaceBetween: 15
        },
        768: {
          slidesPerView: 2.5,
          spaceBetween: 20
        },
        1024: {
          slidesPerView: 3.5,
          spaceBetween: 20
        },
        1200: {
          slidesPerView: 4,
          spaceBetween: 25
        }
      },
      on: {
        init: () => {
          console.log('Swiper initialized');
        }
      }
    });
  }

  onImageError(event: Event): void {
    const target = event.target as HTMLImageElement;
    target.src = 'assets/images/default-store-logo.png';
  }

  viewAllStores(): void {
    this.router.navigate(['seller/all-store'], {
      queryParams: { featured: true }
    });
  }

  viewStoresByCategory(category: string): void {
    this.router.navigate(['/stores'], {
      queryParams: { category: category }
    });
  }

  viewStore(sellerId: number): void {
    this.router.navigate(['/stores', sellerId]);
  }

  viewStoreProducts(sellerId: number): void {
    this.router.navigate(['/products'], {
      queryParams: { store: sellerId }
    });
  }

  addToFavorites(sellerId: number): void {
    console.log('Add store to favorites:', sellerId);
  }

  trackBySellerId(index: number, seller: Seller): number {
    return seller.id;
  }

  ngOnDestroy(): void {
    if (this.swiper) {
      this.swiper.destroy(true, true);
    }
  }
}