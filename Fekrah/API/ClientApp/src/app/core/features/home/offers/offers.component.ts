import {
  AfterViewInit,
  Component,
  OnInit,
  OnDestroy,
  ChangeDetectionStrategy,
  TrackByFunction,
  ViewChildren,
  QueryList,
  ElementRef,
  ChangeDetectorRef,
  NgZone
} from '@angular/core';
import Swiper from 'swiper';
import { Pagination, EffectCoverflow, Autoplay } from 'swiper/modules';

// Enhanced Offer Interface
export interface Offer {
  id: number;
  name: string;
  price: number;
  oldPrice?: number;
  discount?: number;
  condition: 'New' | 'Used' | 'Refurbished';
  sellerName: string;
  sellerId: number;
  description: string;
  imageUrl: string;
  category?: string;
  categoryId?: number;
  rating?: number;
  reviewsCount?: number;
  inStock?: boolean;
  fastDelivery?: boolean;
}

@Component({
  selector: 'app-offers',
  templateUrl: './offers.component.html',
  styleUrls: ['./offers.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OffersComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChildren('offerCard', { read: ElementRef }) offerCards!: QueryList<ElementRef>;

  bestOffers: Offer[] = [];
  swiper?: Swiper;
  private resizeObserver?: ResizeObserver;
  private intersectionObserver?: IntersectionObserver;
  private animationFrameId?: number;

  // Animation and interaction states
  isLoading = true;
  activeSlideIndex = 0;
  router: any;

  constructor(
    private cdr: ChangeDetectorRef,
    private ngZone: NgZone
  ) {}

  ngOnInit(): void {
    this.loadOffers();
    this.setupIntersectionObserver();
  }

  ngAfterViewInit(): void {
    // تأخير لضمان تحميل DOM
    this.ngZone.runOutsideAngular(() => {
      setTimeout(() => {
        this.initializeSwiper();
        this.setupResizeObserver();
        this.setupCardAnimations();
        this.isLoading = false;
        this.cdr.detectChanges();
      }, 150);
    });
  }

  ngOnDestroy(): void {
    this.cleanup();
  }

  trackByOfferId: TrackByFunction<Offer> = (index: number, offer: Offer) => offer.id;

  private loadOffers(): void {
    // Enhanced sample data with more realistic car parts
    this.bestOffers = [
      {
        id: 1,
        name: 'كشاف أمامي هونداي LED',
        price: 409,
        oldPrice: 489,
        discount: 16,
        condition: 'New',
        sellerName: 'متجر الإنارة المتطورة',
        sellerId: 4,
        description: 'كشاف LED عالي الكفاءة من هونداي يوفر إضاءة قوية وواضحة للقيادة الآمنة في جميع الأوقات.',
        imageUrl: 'assets/images/image_100_100.png',
        category: 'إضاءة',
        categoryId: 4,
        rating: 4.6,
        reviewsCount: 89,
        inStock: true,
        fastDelivery: true
      },
      {
        id: 5,
        name: 'ردياتير نيسان الأصلي',
        price: 781,
        oldPrice: 920,
        discount: 15,
        condition: 'New',
        sellerName: 'شركة التبريد المتخصصة',
        sellerId: 4,
        description: 'ردياتير تبريد أصلي من نيسان مصنوع من أجود المواد لضمان تحكم مثالي في درجة حرارة المحرك.',
        imageUrl: 'assets/images/image_100_100.png',
        category: 'تبريد',
        categoryId: 4,
        rating: 4.8,
        reviewsCount: 167,
        inStock: true,
        fastDelivery: false
      },
      {
        id: 6,
        name: 'طرمبة بنزين عالية الأداء',
        price: 368,
        oldPrice: 434,
        discount: 15,
        condition: 'New',
        sellerName: 'ورشة الجودة المعتمدة',
        sellerId: 4,
        description: 'طرمبة بنزين قوية ومتينة تضمن ضخ الوقود بكفاءة عالية وثبات تام لجميع أنواع السيارات.',
        imageUrl:'assets/images/image_100_100.png',
        category: 'وقود',
        categoryId: 4,
        rating: 4.5,
        reviewsCount: 112,
        inStock: true,
        fastDelivery: true
      },
      {
        id: 7,
        name: 'كمبروسر تكييف متطور',
        price: 947,
        oldPrice: 1354,
        discount: 30,
        condition: 'New',
        sellerName: 'التبريد المركزي المحدود',
        sellerId: 4,
        description: 'كمبروسر تكييف عالي الأداء يوفر تبريداً فائقاً وكفاءة في استهلاك الطاقة حتى في أقسى الظروف.',
        imageUrl: 'assets/images/image_100_100.png',
        category: 'تكييف',
        categoryId: 4,
        rating: 4.9,
        reviewsCount: 234,
        inStock: true,
        fastDelivery: false
      },
      {
        id: 8,
        name: 'زيت محرك شل هيليكس الفائق',
        price: 843,
        oldPrice: 1032,
        discount: 18,
        condition: 'New',
        sellerName: 'محل زيوت السيارات الممتاز',
        sellerId: 4,
        description: 'زيت شل هيليكس الأصلي يوفر حماية فائقة للمحرك وأداءً استثنائياً في جميع ظروف القيادة.',
        imageUrl: 'assets/images/image_100_100.png',
        category: 'زيوت',
        categoryId: 4,
        rating: 4.8,
        reviewsCount: 189,
        inStock: true,
        fastDelivery: true
      },
      {
        id: 9,
        name: 'مساعدين أمامي تويوتا',
        price: 1125,
        oldPrice: 1300,
        discount: 14,
        condition: 'New',
        sellerName: 'العفشة الأصلية المعتمدة',
        sellerId: 4,
        description: 'مساعدين أمامي أصلي من تويوتا يوفر راحة قصوى وثبات مثالي أثناء القيادة على جميع الطرق.',
        imageUrl: 'assets/images/image_100_100.png',
        category: 'تعليق',
        categoryId: 4,
        rating: 4.7,
        reviewsCount: 143,
        inStock: true,
        fastDelivery: false
      },
      {
        id: 10,
        name: 'كمبيوتر السيارة الذكي',
        price: 2850,
        oldPrice: 3200,
        discount: 11,
        condition: 'Used',
        sellerName: 'الورشة الإلكترونية المتقدمة',
        sellerId: 4,
        description: 'وحدة تحكم إلكترونية شاملة ومتطورة لجميع أنظمة السيارة مع ضمان الجودة والأداء.',
        imageUrl: 'assets/images/image_100_100.png',
        category: 'إلكترونيات',
        categoryId: 4,
        rating: 4.4,
        reviewsCount: 67,
        inStock: false,
        fastDelivery: false
      }
    ];
  }

  private initializeSwiper(): void {
    const swiperElement = document.querySelector('.offers-swiper') as HTMLElement;
    if (!swiperElement) return;

    this.swiper = new Swiper(swiperElement, {
      modules: [Pagination, Autoplay],
      slidesPerView: 'auto',
      spaceBetween: 1,
      centeredSlides: false,
      loop: false,
      grabCursor: true,
      speed: 800,

      // Auto play for better engagement
      autoplay: {
        delay: 4000,
        disableOnInteraction: true,
        pauseOnMouseEnter: true,
      },

      pagination: {
        el: '.swiper-pagination',
        clickable: true,
        dynamicBullets: true,
        dynamicMainBullets: 3,
        renderBullet: (index: number, className: string) => {
          return `<span class="${className} position-relative">
            <span class="position-absolute top-50 start-50 translate-middle w-100 h-100 rounded-circle border border-2 opacity-50"></span>
          </span>`;
        }
      },

      breakpoints: {
        320: {
          slidesPerView: 1.1,
          spaceBetween: 5,
          centeredSlides: true,
        },
        576: {
          slidesPerView: 1.5,
          spaceBetween: 5,
          centeredSlides: true,
        },
        768: {
          slidesPerView: 2.2,
          spaceBetween: 5,
          centeredSlides: false,
        },
        992: {
          slidesPerView: 3,
          spaceBetween: 5,
        },
        1200: {
          slidesPerView: 4,
          spaceBetween: 5,
        },
        1400: {
          slidesPerView: 5,
          spaceBetween: 5,
        }
      },

      on: {
        init: () => {
          this.updateSlideEffects();
          this.startParallaxAnimation();
        },
        slideChange: () => {
          this.activeSlideIndex = this.swiper?.activeIndex || 0;
          this.updateSlideEffects();
          this.triggerSlideChangeEffects();
        },
        resize: () => this.updateSlideEffects(),
        touchStart: () => this.pauseAutoplay(),
        touchEnd: () => this.resumeAutoplay()
      }
    });
  }

  // ... existing code ...

private applyCardTransition(card: HTMLElement, distance: number): void {
  const scale = 1; // ثابت بدون تصغير
  const opacity = 1; // ثابت بدون شفافية
  const blur = 0; // إزالة الضبابية

  // card.style.transform = `scale(${scale})`;
  card.style.opacity = opacity.toString();
  card.style.filter = 'none'; // إزالة جميع الفلاتر
}

private updateSlideEffects(): void {
  if (!this.swiper) return;

  const slides = this.swiper.slides;
  const activeIndex = this.swiper.activeIndex;

  slides.forEach((slide: HTMLElement, index: number) => {
    const card = slide.querySelector('.offer-card') as HTMLElement;
    if (!card) return;

    // إزالة جميع الكلاسات السابقة
    card.classList.remove('slide-active', 'slide-adjacent', 'slide-distant');

    // إضافة كلاس active فقط للكارد النشط
    if (index === activeIndex) {
      card.classList.add('slide-active');
      this.addCardGlowEffect(card);
    }

    // تطبيق التأثيرات بدون ضبابية أو بهتان
    this.applyCardTransition(card, 0);
  });
}

// ... existing code ...

  // private updateSlideEffects(): void {
  //   if (!this.swiper) return;

  //   const slides = this.swiper.slides;
  //   const activeIndex = this.swiper.activeIndex;
  //   const slidesPerView = this.swiper.params.slidesPerView as number;

  //   slides.forEach((slide: HTMLElement, index: number) => {
  //     const card = slide.querySelector('.offer-card') as HTMLElement;
  //     if (!card) return;

  //     // Remove all effect classes
  //     card.classList.remove('slide-active', 'slide-adjacent', 'slide-distant');

  //     // Calculate distance from active slide
  //     const distance = Math.abs(index - activeIndex);

  //     if (distance === 0) {
  //       card.classList.add('slide-active');
  //       this.addCardGlowEffect(card);
  //     } else if (distance === 1) {
  //       card.classList.add('slide-adjacent');
  //     } else {
  //       card.classList.add('slide-distant');
  //     }

  //     // Apply smooth transitions
  //     this.applyCardTransition(card, distance);
  //   });
  // }

  private addCardGlowEffect(card: HTMLElement): void {
    card.style.boxShadow = '0 25px 50px rgba(255, 107, 53, 0.3), 0 0 30px rgba(255, 107, 53, 0.2)';
    setTimeout(() => {
      card.style.boxShadow = '';
    }, 2000);
  }

  // private applyCardTransition(card: HTMLElement, distance: number): void {
  //   const scale = Math.max(0.85, 1 - (distance * 0.05));
  //   const opacity = Math.max(0.6, 1 - (distance * 0.1));
  //   const blur = Math.min(2, distance * 0.5);

  //   card.style.transform = `scale(${scale})`;
  //   card.style.opacity = opacity.toString();
  //   card.style.filter = `blur(${blur}px)`;
  // }

  private triggerSlideChangeEffects(): void {
    // Add subtle animation to active card
    const activeSlide = this.swiper?.slides[this.activeSlideIndex];
    if (activeSlide) {
      const card = activeSlide.querySelector('.offer-card') as HTMLElement;
      if (card) {
        card.style.animation = 'none';
        setTimeout(() => {
          card.style.animation = 'cardPulse 0.6s ease-out';
        }, 10);
      }
    }
  }

  private setupCardAnimations(): void {
    if (this.offerCards) {
      this.offerCards.forEach((cardRef, index) => {
        const card = cardRef.nativeElement;

        // Mouse enter effects
        card.addEventListener('mouseenter', () => {
          this.pauseAutoplay();
          this.addHoverEffects(card);
        });

        // Mouse leave effects
        card.addEventListener('mouseleave', () => {
          this.resumeAutoplay();
          this.removeHoverEffects(card);
        });
      });
    }
  }

  private addHoverEffects(card: HTMLElement): void {
    const image = card.querySelector('.offer-image') as HTMLElement;
    const title = card.querySelector('.offer-title') as HTMLElement;

    if (image) {
      image.style.transform = 'scale(1.1) rotateY(10deg)';
      image.style.filter = 'brightness(1.1) saturate(1.2)';
    }

    if (title) {
      title.style.background = 'linear-gradient(135deg, #ff6b35, #f7931e)';
      title.style.webkitBackgroundClip = 'text';
      title.style.webkitTextFillColor = 'transparent';
      title.style.backgroundClip = 'text';
    }
  }

  private removeHoverEffects(card: HTMLElement): void {
    const image = card.querySelector('.offer-image') as HTMLElement;
    const title = card.querySelector('.offer-title') as HTMLElement;

    if (image) {
      image.style.transform = '';
      image.style.filter = '';
    }

    if (title) {
      title.style.background = '';
      title.style.webkitBackgroundClip = '';
      title.style.webkitTextFillColor = '';
      title.style.backgroundClip = '';
    }
  }

  private startParallaxAnimation(): void {
    const animateParallax = () => {
      const scrollY = window.scrollY;
      const cards = document.querySelectorAll('.offer-card');

      cards.forEach((card, index) => {
        const speed = 0.5 + (index % 3) * 0.1;
        const yPos = -(scrollY * speed);
        (card as HTMLElement).style.transform += ` translateY(${yPos}px)`;
      });

      this.animationFrameId = requestAnimationFrame(animateParallax);
    };

    // Start animation
    // animateParallax();
  }

  private setupIntersectionObserver(): void {
    if (typeof IntersectionObserver !== 'undefined') {
      this.intersectionObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('animate__fadeInUp');
            }
          });
        },
        { threshold: 0.1 }
      );
    }
  }

  private setupResizeObserver(): void {
    if (typeof ResizeObserver !== 'undefined') {
      this.resizeObserver = new ResizeObserver(() => {
        if (this.swiper) {
          this.swiper.update();
          setTimeout(() => this.updateSlideEffects(), 100);
        }
      });

      const container = document.querySelector('.offers-section');
      if (container) {
        this.resizeObserver.observe(container);
      }
    }
  }

  private pauseAutoplay(): void {
    if (this.swiper?.autoplay) {
      this.swiper.autoplay.stop();
    }
  }

  private resumeAutoplay(): void {
    if (this.swiper?.autoplay) {
      setTimeout(() => {
        this.swiper?.autoplay.start();
      }, 2000);
    }
  }

  viewOfferDetails(offer: Offer): void {
    const button = event?.target as HTMLElement;

    // Create enhanced ripple effect
    this.createAdvancedRippleEffect(button);

    // Add success feedback
    this.showSuccessFeedback(button);

    // Simulate navigation or modal opening
    console.log('Viewing offer details:', offer);

    // Example implementations:
    this.router.navigate(['/offers', offer.id]);
    // this.modalService.open(OfferDetailsComponent, { data: offer });
    // this.dialog.open(OfferModalComponent, { data: offer });
  }

  onImageError(event: Event): void {
    const img = event.target as HTMLImageElement;
    img.src = 'assets/images/placeholder-car-part.png';
    img.alt = 'صورة غير متوفرة';
  }

  private createAdvancedRippleEffect(element: HTMLElement): void {
    if (!element) return;

    const rect = element.getBoundingClientRect();
    const ripple = document.createElement('div');
    const size = Math.max(rect.width, rect.height) * 2;

    // Enhanced ripple styles
    Object.assign(ripple.style, {
      width: `${size}px`,
      height: `${size}px`,
      left: '50%',
      top: '50%',
      transform: 'translate(-50%, -50%) scale(0)',
      position: 'absolute',
      borderRadius: '50%',
      background: 'radial-gradient(circle, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0.2) 70%, transparent 100%)',
      animation: 'advancedRipple 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
      pointerEvents: 'none',
      zIndex: '1000'
    });

    element.style.position = 'relative';
    element.style.overflow = 'hidden';
    element.appendChild(ripple);

    setTimeout(() => ripple.remove(), 800);
  }

  private showSuccessFeedback(element: HTMLElement): void {
    const originalText = element.textContent;
    const icon = element.querySelector('i');

    if (icon) {
      icon.className = 'fas fa-check';
    }

    element.style.background = 'linear-gradient(135deg, #11998e, #38ef7d)';

    setTimeout(() => {
      if (icon) {
        icon.className = 'fas fa-eye';
      }
      element.style.background = '';
    }, 1500);
  }

  private cleanup(): void {
    if (this.swiper) {
      this.swiper.destroy(true, true);
      this.swiper = undefined;
    }

    this.resizeObserver?.disconnect();
    this.intersectionObserver?.disconnect();

    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
    }
  }

  // Utility methods for enhanced UX
  isOfferNew(offer: Offer): boolean {
    return offer.condition === 'New';
  }

  hasDiscount(offer: Offer): boolean {
    return !!offer.discount && offer.discount > 0;
  }

  getDiscountAmount(offer: Offer): number {
    return offer.oldPrice ? offer.oldPrice - offer.price : 0;
  }

  formatPrice(price: number): string {
    return new Intl.NumberFormat('ar-SA', {
      style: 'currency',
      currency: 'EGP',
      minimumFractionDigits: 0
    }).format(price);
  }
}
