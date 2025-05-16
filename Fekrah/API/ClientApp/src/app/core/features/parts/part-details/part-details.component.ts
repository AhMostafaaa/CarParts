import { Component, OnInit, OnDestroy, ElementRef, ViewChild, Renderer2, HostListener, ViewEncapsulation } from '@angular/core';

declare const bootstrap: any;

interface Comment {
  user: string;
  rating: number;
  text: string;
  date?: Date;
}

interface PartDto {
  id: number;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  onSale?: boolean;
  condition: string;
  type: string;
  imageUrl: string;
  thumbnails: string[];
  comments: Comment[];
  offers: string[];
  shippingDetails: string;
  seller: {
    id: number;
    name: string;
  };
}


interface RelatedPart {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
}

@Component({
  selector: 'app-part-details',
  templateUrl: './part-details.component.html',
  styleUrls: ['./part-details.component.scss'],
  encapsulation: ViewEncapsulation.None // ✅ أضف هذا السطر
})
export class PartDetailsComponent implements OnInit, OnDestroy {
  @ViewChild('mainImage') mainImageRef!: ElementRef;
  @ViewChild('lens') lensRef!: ElementRef;
  @ViewChild('reviewsContainer') reviewsContainerRef!: ElementRef;

  part!: PartDto;
  relatedParts: RelatedPart[] = [];
  selectedImage: string = '';
  quantity: number = 1;
  newRating: number = 0;
  newComment: string = '';
  hoveredRating: number = 0;
  isZoomed: boolean = false;
  showToast: boolean = false;
  private autoSlideInterval: any;

  // إضافة متغيرات للتحكم في سكرول التقييمات
  reviewsContainerHeight: string = '400px';
  showScrollIndicator: boolean = false;

  constructor(private renderer: Renderer2) { }

  ngOnInit(): void {
    this.fetchPartDetails();
    this.fetchRelatedParts();
    this.startImageSlider();

    // ضبط ارتفاع مناسب لحاوية التقييمات
    this.adjustReviewsContainerHeight();
  }

  ngAfterViewInit(): void {
    if (this.mainImageRef && this.lensRef) {
      this.renderer.listen(this.mainImageRef.nativeElement, 'mousemove', this.magnify.bind(this));
      this.renderer.listen(this.mainImageRef.nativeElement, 'mouseleave', this.hideMagnifier.bind(this));
    }

    // التحقق من وجود سكرول في التقييمات
    this.checkReviewsScrollability();

    // إضافة مستمعات للتمرير في التقييمات
    if (this.reviewsContainerRef) {
      this.renderer.listen(this.reviewsContainerRef.nativeElement, 'scroll', this.handleReviewScroll.bind(this));
    }
  }

  ngOnDestroy(): void {
    clearInterval(this.autoSlideInterval);
  }

  // دالة للاستماع لتغيير حجم الشاشة
  @HostListener('window:resize')
  onResize() {
    this.adjustReviewsContainerHeight();
    this.checkReviewsScrollability();
  }

  // ضبط ارتفاع حاوية التقييمات بناءً على حجم الشاشة
  adjustReviewsContainerHeight() {
    const screenWidth = window.innerWidth;

    if (screenWidth > 991) {
      // شاشات كبيرة
      this.reviewsContainerHeight = '400px';
    } else if (screenWidth > 576) {
      // شاشات متوسطة
      this.reviewsContainerHeight = '350px';
    } else {
      // شاشات صغيرة
      this.reviewsContainerHeight = '250px';
    }
  }

  // التحقق من وجود سكرول في التقييمات
  checkReviewsScrollability() {
    if (this.reviewsContainerRef) {
      setTimeout(() => {
        const container = this.reviewsContainerRef.nativeElement;
        // التحقق من أن محتوى السكرول أكبر من حجم الحاوية
        this.showScrollIndicator = container.scrollHeight > container.clientHeight;
      }, 300);
    }
  }

  // معالجة حدث التمرير في التقييمات
  handleReviewScroll() {
    if (this.reviewsContainerRef) {
      const container = this.reviewsContainerRef.nativeElement;
      const atBottom = container.scrollHeight - container.scrollTop <= container.clientHeight + 10;

      // يمكنك استخدام هذا لإظهار مؤشر عند وصول المستخدم لأسفل التقييمات
      if (atBottom) {
        console.log('وصلت لنهاية التقييمات');
        // يمكنك إضافة منطق إضافي هنا
      }
    }
  }

  // التمرير لأعلى قائمة التقييمات
  scrollToTopReviews() {
    if (this.reviewsContainerRef) {
      this.reviewsContainerRef.nativeElement.scrollTop = 0;
    }
  }

  // التمرير لأسفل قائمة التقييمات
  scrollToBottomReviews() {
    if (this.reviewsContainerRef) {
      this.reviewsContainerRef.nativeElement.scrollTop = this.reviewsContainerRef.nativeElement.scrollHeight;
    }
  }

  magnify(e: MouseEvent) {
    const lens = this.lensRef.nativeElement;
    const img = this.mainImageRef.nativeElement;
    const pos = this.getCursorPos(e, img);
    const cx = 2;
    const cy = 2;

    lens.style.display = 'block';
    lens.style.left = `${pos.x - lens.offsetWidth / 2}px`;
    lens.style.top = `${pos.y - lens.offsetHeight / 2}px`;
    lens.style.backgroundImage = `url(${img.src})`;
    lens.style.backgroundSize = `${img.width * cx}px ${img.height * cy}px`;
    lens.style.backgroundPosition = `-${pos.x * cx - lens.offsetWidth / 2}px -${pos.y * cy - lens.offsetHeight / 2}px`;
  }

  hideMagnifier() {
    const lens = this.lensRef.nativeElement;
    lens.style.display = 'none';
  }

  getCursorPos(e: MouseEvent, img: HTMLImageElement): { x: number; y: number } {
    const rect = img.getBoundingClientRect();
    const x = e.pageX - rect.left - window.pageXOffset;
    const y = e.pageY - rect.top - window.pageYOffset;
    return { x, y };
  }

  fetchPartDetails() {
    this.part = {
      id: 1,
      name: 'بطارية VARTA Blue Dynamic E11 - 70Ah',
      description: `
بطارية VARTA Blue Dynamic E11 بقدرة 70 أمبير، خيار مثالي للسيارات المتوسطة والعائلية.
توفر أداء قويًا ومستقرًا في جميع الظروف الجوية، بفضل تقنية PowerFrame™ المبتكرة.
عمر افتراضي أطول، وتشغيل سريع وآمن حتى في درجات الحرارة المنخفضة.
مدعومة بضمان لمدة 24 شهرًا وخدمة دعم فني متميزة.
`,
      price: 1350,
      originalPrice: 1500,
      onSale: true,
      condition: 'جديد',
      type: 'بطاريات سيارات',
      imageUrl: '../../assets/images/image100_100.png',
      thumbnails: [
        '../../assets/images/image100_100.png',
        '../../assets/images/image100_100.png',
        '../../assets/images/image100_100.png',
        '../../assets/images/image100_100.png',
        '../../assets/images/image100_100.png',
      ],
      comments: [
        {
          user: 'أحمد سمير',
          rating: 5,
          text: 'البطارية ممتازة وتم التوصيل بسرعة. شكراً على الخدمة!',
          date: new Date('2025-04-15')
        },
        {
          user: 'منى إبراهيم',
          rating: 4,
          text: 'أداء قوي ولكن تمنيت أن يأتي معها كتيب التعليمات.',
          date: new Date('2025-04-20')
        },
        {
          user: 'أحمد سمير',
          rating: 5,
          text: 'البطارية ممتازة وتم التوصيل بسرعة. شكراً على الخدمة!',
          date: new Date('2025-04-15')
        },
        {
          user: 'منى إبراهيم',
          rating: 4,
          text: 'أداء قوي ولكن تمنيت أن يأتي معها كتيب التعليمات.',
          date: new Date('2025-04-20')
        },
        {
          user: 'أحمد سمير',
          rating: 5,
          text: 'البطارية ممتازة وتم التوصيل بسرعة. شكراً على الخدمة!',
          date: new Date('2025-04-15')
        },
        {
          user: 'منى إبراهيم',
          rating: 4,
          text: 'أداء قوي ولكن تمنيت أن يأتي معها كتيب التعليمات.',
          date: new Date('2025-04-20')
        },
        {
          user: 'أحمد سمير',
          rating: 5,
          text: 'البطارية ممتازة وتم التوصيل بسرعة. شكراً على الخدمة!',
          date: new Date('2025-04-15')
        },
        {
          user: 'منى إبراهيم',
          rating: 4,
          text: 'أداء قوي ولكن تمنيت أن يأتي معها كتيب التعليمات.',
          date: new Date('2025-04-20')
        },
        {
          user: 'أحمد سمير',
          rating: 5,
          text: 'البطارية ممتازة وتم التوصيل بسرعة. شكراً على الخدمة!',
          date: new Date('2025-04-15')
        },
        {
          user: 'منى إبراهيم',
          rating: 4,
          text: 'أداء قوي ولكن تمنيت أن يأتي معها كتيب التعليمات.',
          date: new Date('2025-04-20')
        },
        {
          user: 'أحمد سمير',
          rating: 5,
          text: 'البطارية ممتازة وتم التوصيل بسرعة. شكراً على الخدمة!',
          date: new Date('2025-04-15')
        },
        {
          user: 'منى إبراهيم',
          rating: 4,
          text: 'أداء قوي ولكن تمنيت أن يأتي معها كتيب التعليمات.',
          date: new Date('2025-04-20')
        },
        {
          user: 'أحمد سمير',
          rating: 5,
          text: 'البطارية ممتازة وتم التوصيل بسرعة. شكراً على الخدمة!',
          date: new Date('2025-04-15')
        },
        {
          user: 'منى إبراهيم',
          rating: 4,
          text: 'أداء قوي ولكن تمنيت أن يأتي معها كتيب التعليمات.',
          date: new Date('2025-04-20')
        },
        {
          user: 'أحمد سمير',
          rating: 5,
          text: 'البطارية ممتازة وتم التوصيل بسرعة. شكراً على الخدمة!',
          date: new Date('2025-04-15')
        },
        {
          user: 'منى إبراهيم',
          rating: 4,
          text: 'أداء قوي ولكن تمنيت أن يأتي معها كتيب التعليمات.',
          date: new Date('2025-04-20')
        },
        {
          user: 'أحمد سمير',
          rating: 5,
          text: 'البطارية ممتازة وتم التوصيل بسرعة. شكراً على الخدمة!',
          date: new Date('2025-04-15')
        },
        {
          user: 'منى إبراهيم',
          rating: 4,
          text: 'أداء قوي ولكن تمنيت أن يأتي معها كتيب التعليمات.',
          date: new Date('2025-04-20')
        },
        {
          user: 'أحمد سمير',
          rating: 5,
          text: 'البطارية ممتازة وتم التوصيل بسرعة. شكراً على الخدمة!',
          date: new Date('2025-04-15')
        },
        {
          user: 'منى إبراهيم',
          rating: 4,
          text: 'أداء قوي ولكن تمنيت أن يأتي معها كتيب التعليمات.',
          date: new Date('2025-04-20')
        },
        {
          user: 'أحمد سمير',
          rating: 5,
          text: 'البطارية ممتازة وتم التوصيل بسرعة. شكراً على الخدمة!',
          date: new Date('2025-04-15')
        },
        {
          user: 'منى إبراهيم',
          rating: 4,
          text: 'أداء قوي ولكن تمنيت أن يأتي معها كتيب التعليمات.',
          date: new Date('2025-04-20')
        },
        {
          user: 'أحمد سمير',
          rating: 5,
          text: 'البطارية ممتازة وتم التوصيل بسرعة. شكراً على الخدمة!',
          date: new Date('2025-04-15')
        },
        {
          user: 'منى إبراهيم',
          rating: 4,
          text: 'أداء قوي ولكن تمنيت أن يأتي معها كتيب التعليمات.',
          date: new Date('2025-04-20')
        },
        {
          user: 'أحمد سمير',
          rating: 5,
          text: 'البطارية ممتازة وتم التوصيل بسرعة. شكراً على الخدمة!',
          date: new Date('2025-04-15')
        },
        {
          user: 'منى إبراهيم',
          rating: 4,
          text: 'أداء قوي ولكن تمنيت أن يأتي معها كتيب التعليمات.',
          date: new Date('2025-04-20')
        },
        {
          user: 'أحمد سمير',
          rating: 5,
          text: 'البطارية ممتازة وتم التوصيل بسرعة. شكراً على الخدمة!',
          date: new Date('2025-04-15')
        },
        {
          user: 'منى إبراهيم',
          rating: 4,
          text: 'أداء قوي ولكن تمنيت أن يأتي معها كتيب التعليمات.',
          date: new Date('2025-04-20')
        },
        {
          user: 'أحمد سمير',
          rating: 5,
          text: 'البطارية ممتازة وتم التوصيل بسرعة. شكراً على الخدمة!',
          date: new Date('2025-04-15')
        },
        {
          user: 'منى إبراهيم',
          rating: 4,
          text: 'أداء قوي ولكن تمنيت أن يأتي معها كتيب التعليمات.',
          date: new Date('2025-04-20')
        },
        {
          user: 'أحمد سمير',
          rating: 5,
          text: 'البطارية ممتازة وتم التوصيل بسرعة. شكراً على الخدمة!',
          date: new Date('2025-04-15')
        },
        {
          user: 'منى إبراهيم',
          rating: 4,
          text: 'أداء قوي ولكن تمنيت أن يأتي معها كتيب التعليمات.',
          date: new Date('2025-04-20')
        },
        {
          user: 'أحمد سمير',
          rating: 5,
          text: 'البطارية ممتازة وتم التوصيل بسرعة. شكراً على الخدمة!',
          date: new Date('2025-04-15')
        },
        {
          user: 'منى إبراهيم',
          rating: 4,
          text: 'أداء قوي ولكن تمنيت أن يأتي معها كتيب التعليمات.',
          date: new Date('2025-04-20')
        },
        {
          user: 'أحمد سمير',
          rating: 5,
          text: 'البطارية ممتازة وتم التوصيل بسرعة. شكراً على الخدمة!',
          date: new Date('2025-04-15')
        },
        {
          user: 'منى إبراهيم',
          rating: 4,
          text: 'أداء قوي ولكن تمنيت أن يأتي معها كتيب التعليمات.',
          date: new Date('2025-04-20')
        },
        // التقييمات الأخرى كما هي
      ],
      offers: [
        'خصم 10% عند الشراء عبر الموقع',
        'شحن مجاني داخل القاهرة الكبرى',
        'تركيب مجاني عند الشراء من الفرع الرئيسي'
      ],
      shippingDetails: 'يتم الشحن خلال 2-3 أيام عمل عبر مندوب معتمد. تشمل الخدمة فحص وتشغيل البطارية عند التسليم.',
      seller: {
        id: 2001,
        name: 'مؤسسة البطاريات الحديثة - القاهرة'
      }
    };

    this.selectedImage = this.part.imageUrl;
  }

  fetchRelatedParts() {
    this.relatedParts = [
      { id: 2, name: 'بطارية بوش 80 أمبير', price: 1600, imageUrl: `../../assets/images/image100_100.png`, },
      { id: 3, name: 'شاحن بطارية سريع', price: 450, imageUrl: `../../assets/images/image100_100.png`, }
    ];
  }

  changeImage(img: string) {
    this.selectedImage = img;
  }

  prevImage() {
    const index = this.part.thumbnails.indexOf(this.selectedImage);
    const newIndex = (index - 1 + this.part.thumbnails.length) % this.part.thumbnails.length;
    this.selectedImage = this.part.thumbnails[newIndex];
  }

  nextImage() {
    const index = this.part.thumbnails.indexOf(this.selectedImage);
    const newIndex = (index + 1) % this.part.thumbnails.length;
    this.selectedImage = this.part.thumbnails[newIndex];
  }

  startImageSlider() {
    this.autoSlideInterval = setInterval(() => this.nextImage(), 5000);
  }

  toggleZoom() {
    this.isZoomed = !this.isZoomed;
  }

  openImageInModal(img: string) {
    this.selectedImage = img;
    const modal = new bootstrap.Modal(document.getElementById('imageModal'));
    modal.show();
  }

  downloadImage(url: string) {
    const link = document.createElement('a');
    link.href = url;
    link.download = 'image.jpg';
    link.click();
  }

  calculateDiscount(): number {
    if (!this.part.originalPrice || !this.part.price) return 0;
    return Math.round(((this.part.originalPrice - this.part.price) / this.part.originalPrice) * 100);
  }

  decreaseQty() {
    if (this.quantity > 1) this.quantity--;
  }

  increaseQty() {
    if (this.quantity < 10) this.quantity++;
  }

  setRating(star: number) {
    // تحديث التقييم
    this.newRating = star;

    // إضافة تأثير بصري للنجوم المختارة (اختياري)
    setTimeout(() => {
      const stars = document.querySelectorAll('.rating-stars i');
      stars.forEach((starElement, index) => {
        if (index < star) {
          // إضافة صنف للتأثير المتحرك
          starElement.classList.add('active');
          // إزالة الصنف بعد الانتهاء من التأثير
          setTimeout(() => {
            starElement.classList.remove('active');
          }, 300);
        }
      });
    }, 10);
  }

  submitComment() {
    if (!this.newComment || this.newRating === 0) return;
    this.part.comments.unshift({
      user: 'مستخدم مجهول',
      rating: this.newRating,
      text: this.newComment,
      date: new Date()
    });
    this.newRating = 0;
    this.newComment = '';

    // التمرير لأعلى قائمة التقييمات لرؤية التقييم الجديد
    setTimeout(() => this.scrollToTopReviews(), 100);

    // تحديث حالة السكرول
    this.checkReviewsScrollability();
  }

  addToCart() {
    this.showToast = true;
    setTimeout(() => this.showToast = false, 3000);
  }

  addRelatedToCart(id: number) {
    const item = this.relatedParts.find(p => p.id === id);
    if (item) {
      this.showToast = true;
      setTimeout(() => this.showToast = false, 3000);
    }
  }

  contactViaWhatsApp() {
    const msg = encodeURIComponent(
      `👋 مرحبًا، هذه رسالة من موقع قطع غيار.\nأرغب في الاستفسار عن: ${this.part.name}`
    );
    window.open(`https://wa.me/201287868525?text=${msg}`, '_blank');
  }





  getRatingText(rating: number): string {
    switch (rating) {
      case 1: return 'سيئ جدًا 😞';
      case 2: return 'سيئ 😕';
      case 3: return 'متوسط 🙂';
      case 4: return 'جيد جدًا 😃';
      case 5: return 'ممتاز 👌';
      default: return '';
    }
  }


}
