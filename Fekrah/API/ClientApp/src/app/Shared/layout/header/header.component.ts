import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  isSticky = false;
  searchTerm = '';
  cartCount = 0;

  // نصوص الواجهة
  searchPlaceholder = 'ابحث عن قطعة غيار...';
  searchButtonText = 'بحث';
  cartText = 'السلة';

  // قائمة البحث
  searchCategories = {
    default: 'جميع الأقسام',
    options: [
      { value: 'الموتور', label: 'الموتور' },
      { value: 'الكهرباء', label: 'الكهرباء' },
      { value: 'البودي', label: 'البودي' },
      { value: 'الفرامل', label: 'الفرامل' },
      { value: 'اكسسوارات', label: 'اكسسوارات' }
    ]
  };

  // قائمة الجانب الأيمن
  rightMenuItems = [
    // { label: 'من نحن', route: '/AboutUs', icon: 'fas fa-info-circle' },
    // { label: 'اتصل بنا', route: '/contact-us', icon: 'fas fa-envelope' },
    { label: 'لوحة التحكم', route: '/dashboard', icon: 'fas fa-user-cog' }
  ];

  // قائمة التنقل الرئيسية
  navItems = [
    { label: 'الرئيسية', type: 'route', target: '/category' },
    { label: 'المتاجر', type: 'section', target: 'stores-section', page: '/' },
    { label: 'الماركات', type: 'section', target: 'brands-section', page: '/' },
    { label: 'العروض', type: 'section', target: 'offers-section', page: '/' },
    { label: 'أحدث القطع', type: 'section', target: 'latest-section', page: '/' },
    { label: 'المقترحات', type: 'section', target: 'suggested-offers', page: '/' },
    // { label: 'الأقسام', type: 'section', target: 'categories-section', page: '/' },
    { label: 'الأصناف', type: 'section', target: 'part-types', page: '/' }
  ];



  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.isSticky = window.pageYOffset > 20;
  }

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.updateCartCount();
    // تحديث عدد العناصر في السلة كل ثانية (اختياري)
    setInterval(() => {
      this.updateCartCount();
    }, 1000);
  }

  search(): void {
    if (this.searchTerm.trim()) {
      this.router.navigate(['/search'], {
        queryParams: {
          q: this.searchTerm
        }
      });
    }
  }

  goToNavItem(item: any) {
    if (item.type === 'route') {
      this.router.navigateByUrl(item.target);
    } else if (item.type === 'section') {
      // item.page هو اسم الصفحة التي يوجد فيها الـ section
      if (this.router.url.split('?')[0] === item.page) {
        // أنت بالفعل في الصفحة المناسبة، اعمل scroll
        this.scrollToSection(item.target);
      } else {
        // انتقل للصفحة المطلوبة، وأرسل الـ section مع الـ queryParams
        this.router.navigate([item.page], { queryParams: { scrollTo: item.target } });
      }
    }
  }



  updateCartCount(): void {
    this.cartCount = 0;
    const cartData = localStorage.getItem('cart');
    if (cartData) {
      try {
        const cart = JSON.parse(cartData);
        if (Array.isArray(cart)) {
          this.cartCount = cart.reduce((sum, item) => sum + (item.quantity || 0), 0);
        }
      } catch (e) {
        console.error('Error parsing cart data', e);
      }
    }
  }

  goToSection(sectionId: string) {
    if (sectionId == 'category') {
      this.router.navigateByUrl('/category');
    }
    if (this.router.url.startsWith('/home')) {
      this.scrollToSection(sectionId);
    }
    else {
      this.router.navigate(['/home'], { queryParams: { scrollTo: sectionId } });
    }
  }

  scrollToSection(id: string) {
    const el = document.getElementById(id);
    if (el) {
      const yOffset = window.innerHeight / 2 - el.offsetHeight / 2;
      const y = el.getBoundingClientRect().top + window.scrollY - yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  }

  // وظائف إضافية للسلة
  goToCart() {
    this.router.navigate(['/cart']);
  }

  // وظيفة لإضافة عنصر للسلة (يمكن استخدامها من مكونات أخرى)
  addToCart(item: any) {
    const cartData = localStorage.getItem('cart');
    let cart = [];

    if (cartData) {
      try {
        cart = JSON.parse(cartData);
      } catch (e) {
        cart = [];
      }
    }

    const existingItem = cart.find((cartItem: any) => cartItem.id === item.id);
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.push({ ...item, quantity: 1 });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    this.updateCartCount();
  }
}
