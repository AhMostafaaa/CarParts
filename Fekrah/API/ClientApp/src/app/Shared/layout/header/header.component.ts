import { Component, HostListener, OnInit, OnDestroy } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Subject, takeUntil, interval } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();

  // Existing properties
  isSticky = false;
  searchTerm = '';
  cartCount = 0;
  showMobileMenu = false;
  showMobileNav = false;
  showSearch = false;

  // New properties for orders management
  isMerchant = false;
  isDriver = false;
  isLoggedIn = false;
  userName = '';
  userAvatar = '';
  pendingOrdersCount = 0;
  showUserMenu = false;
  userType: 'customer' | 'merchant' | 'driver' | 'admin' = 'customer';
  deliveryOrdersCount = 0;

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

  // قائمة التنقل الرئيسية
  navItems = [
    { label: 'الرئيسية', type: 'route', target: '/category' },
    { label: 'المتاجر', type: 'section', target: 'stores-section', page: '/' },
    { label: 'الماركات', type: 'section', target: 'brands-section', page: '/' },
    { label: 'العروض', type: 'section', target: 'offers-section', page: '/' },
    { label: 'أحدث القطع', type: 'section', target: 'latest-section', page: '/' },
    { label: 'المقترحات', type: 'section', target: 'suggested-offers', page: '/' },
    { label: 'الأصناف', type: 'section', target: 'part-types', page: '/' }
  ];

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.updateCartCount();
    this.loadUserData();
    this.loadPendingOrders();

    // للتجربة - إظهار pre-navbar
    this.isMerchant = true;
    this.pendingOrdersCount = 7;

    // تحديث عدد العناصر في السلة كل ثانية
    interval(1000).pipe(takeUntil(this.destroy$)).subscribe(() => {
      this.updateCartCount();
    });

    // تحديث عدد الطلبات المعلقة كل 30 ثانية
    interval(30000).pipe(takeUntil(this.destroy$)).subscribe(() => {
      if (this.isMerchant || this.isDriver) {
        this.loadPendingOrders();
      }
    });

    this.router.events.pipe(takeUntil(this.destroy$)).subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.closeMobileMenus();
      }
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.isSticky = window.pageYOffset > 20;
  }

  // Load user data from localStorage or service
  loadUserData(): void {
    try {
      const userData = localStorage.getItem('user_data');
      const authToken = localStorage.getItem('auth_token');

      if (authToken && userData) {
        const user = JSON.parse(userData);
        this.isLoggedIn = true;
        this.userName = user.name || user.username || 'المستخدم';
        this.userAvatar = user.avatar || '';
        this.userType = user.type || 'customer';
        this.isMerchant = this.userType === 'merchant';
        this.isDriver = this.userType === 'driver';
      } else {
        this.resetUserData();
      }
    } catch (error) {
      console.error('Error loading user data:', error);
      this.resetUserData();
    }
  }

  // Reset user data
  resetUserData(): void {
    this.isLoggedIn = false;
    this.userName = '';
    this.userAvatar = '';
    this.userType = 'customer';
    this.isMerchant = false;
    this.isDriver = false;
    this.pendingOrdersCount = 0;
    this.deliveryOrdersCount = 0;
  }

  // Load pending orders count
  loadPendingOrders(): void {
    if (this.isMerchant) {
      try {
        const mockPendingOrders = localStorage.getItem('pending_orders_count');
        this.pendingOrdersCount = mockPendingOrders ? parseInt(mockPendingOrders) : 0;
      } catch (error) {
        console.error('Error loading pending orders:', error);
        this.pendingOrdersCount = 0;
      }
    }

    if (this.isDriver) {
      try {
        const mockDeliveryOrders = localStorage.getItem('delivery_orders_count');
        this.deliveryOrdersCount = mockDeliveryOrders ? parseInt(mockDeliveryOrders) : 0;
      } catch (error) {
        console.error('Error loading delivery orders:', error);
        this.deliveryOrdersCount = 0;
      }
    }
  }

  // Toggle user menu dropdown
  toggleUserMenu(): void {
    this.showUserMenu = !this.showUserMenu;
  }

  // Switch to customer mode
  switchToCustomerMode(): void {
    if (this.isMerchant || this.isDriver) {
      this.isMerchant = false;
      this.isDriver = false;
      this.showUserMenu = false;
      localStorage.setItem('view_mode', 'customer');
      this.router.navigate(['/']);
    }
  }

  // Logout function
  logout(): void {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user_data');
    localStorage.removeItem('view_mode');
    localStorage.removeItem('pending_orders_count');
    this.resetUserData();
    this.showUserMenu = false;
    this.router.navigate(['/auth/login']);
  }

  // Search functionality
  search(): void {
    if (this.searchTerm.trim()) {
      this.router.navigate(['/search'], {
        queryParams: { q: this.searchTerm }
      });
    }
  }

  // Navigation functions
  goToNavItem(item: any) {
    if (item.type === 'route') {
      this.router.navigateByUrl(item.target);
    } else if (item.type === 'section') {
      if (this.router.url.split('?')[0] === item.page) {
        this.scrollToSection(item.target);
      } else {
        this.router.navigate([item.page], { queryParams: { scrollTo: item.target } });
      }
    }
    this.closeMobileMenus();
  }

  // Update cart count
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

  // Scroll to section
  scrollToSection(id: string) {
    const el = document.getElementById(id);
    if (el) {
      const yOffset = window.innerHeight / 2 - el.offsetHeight / 2;
      const y = el.getBoundingClientRect().top + window.scrollY - yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  }

  // Cart functions
  goToCart() {
    this.router.navigate(['/cart']);
  }

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

  // Mobile menu methods
  toggleMobileMenu(): void {
    this.showMobileMenu = !this.showMobileMenu;
    if (this.showMobileMenu) {
      this.showMobileNav = false;
      this.showSearch = false;
      this.showUserMenu = false;
    }
  }

  toggleMobileNav(): void {
    this.showMobileNav = !this.showMobileNav;
    if (this.showMobileNav) {
      this.showMobileMenu = false;
      this.showSearch = false;
      this.showUserMenu = false;
    }
  }

  toggleSearch(): void {
    this.showSearch = !this.showSearch;
    if (this.showSearch) {
      this.showMobileMenu = false;
      this.showMobileNav = false;
      this.showUserMenu = false;
    }
  }

  // Close all mobile menus
  closeMobileMenus(): void {
    this.showMobileMenu = false;
    this.showMobileNav = false;
    this.showSearch = false;
    this.showUserMenu = false;
  }

  // Get user initials for avatar fallback
  getUserInitials(): string {
    if (!this.userName) return 'M';
    return this.userName.split(' ').map(name => name.charAt(0)).join('').substring(0, 2).toUpperCase();
  }

  // Listen for window resize
  @HostListener('window:resize', ['$event'])
  onResize(event: any): void {
    if (event.target.innerWidth > 768) {
      this.closeMobileMenus();
    }
  }

  // Close menus when clicking outside
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: any): void {
    const target = event.target;
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navToggle = document.querySelector('.nav-toggle');
    const searchToggle = document.querySelector('.search-toggle');
    const userMenu = document.querySelector('.user-menu');

    if (this.showMobileMenu && !target.closest('.right-menu') && target !== mobileMenuToggle) {
      this.showMobileMenu = false;
    }

    if (this.showMobileNav && !target.closest('.main-nav') && target !== navToggle) {
      this.showMobileNav = false;
    }

    if (this.showSearch && !target.closest('.search-bar') && target !== searchToggle) {
      this.showSearch = false;
    }

    if (this.showUserMenu && !target.closest('.user-menu') && target !== userMenu) {
      this.showUserMenu = false;
    }
  }

  // Debug functions للتجربة
  debugSimulateMerchant(): void {
    this.isMerchant = true;
    this.isDriver = false;
    this.pendingOrdersCount = 5;
    console.log('تم تفعيل وضع التاجر');
  }

  debugSimulateDriver(): void {
    this.isDriver = true;
    this.isMerchant = false;
    this.deliveryOrdersCount = 3;
    console.log('تم تفعيل وضع المراسل');
  }

  debugClearMode(): void {
    this.isMerchant = false;
    this.isDriver = false;
    this.pendingOrdersCount = 0;
    this.deliveryOrdersCount = 0;
    console.log('تم إلغاء جميع الأوضاع');
  }
}
