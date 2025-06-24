// header.component.ts - إضافات بسيطة فقط للـ Enhanced Search
import { Component, OnInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { SearchResult, SearchSuggestion, CarSearchFilters } from '../../components/enhanced-search/enhanced-search.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  // الخصائص الموجودة بالفعل - بدون تغيير
  isSticky = false;
  showSearch = true;
  showMobileMenu = false;
  showMobileNav = false;
  showUserMenu = false;
  
  // User data
  isLoggedIn = false;
  isMerchant = false;
  isDriver = false;
  userName = '';
  userAvatar = '';
  cartCount = 0;
  
  // Text properties
  cartText = 'السلة';
  searchPlaceholder = 'ابحث عن المنتجات، قطع الغيار، أو الخدمات...';
  searchButtonText = 'بحث';
  searchTerm = '';
  
  // Navigation items
  navItems = [
    { label: 'الرئيسية', route: '/', type: 'route' },
    { label: 'المنتجات', route: '/products', type: 'route' },
    { label: 'الفئات', route: '/categories', type: 'route' },
    { label: 'العروض', route: '/offers', type: 'route' },
    { label: 'اتصل بنا', route: '/contact', type: 'route' }
  ];
  
  // إضافة searchCategories للـ Enhanced Search
  searchCategories = {
    default: 'جميع الفئات',
    options: [
      { value: '', label: 'جميع الفئات' },
      { value: 'automotive', label: 'قطع السيارات' },
      { value: 'electronics', label: 'الإلكترونيات' },
      { value: 'tools', label: 'الأدوات' },
      { value: 'parts', label: 'قطع الغيار' },
      { value: 'accessories', label: 'الإكسسوارات' },
      { value: 'oils', label: 'الزيوت والمواد الاستهلاكية' },
      { value: 'tires', label: 'الإطارات والجنوط' }
    ]
  };

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.loadUserData();
    this.updateCartCount();
  }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll(): void {
    this.isSticky = window.pageYOffset > 100;
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event): void {
    const target = event.target as HTMLElement;
    
    // Close user menu if clicked outside
    if (!target.closest('.user-menu') && this.showUserMenu) {
      this.showUserMenu = false;
    }
    
    // Close mobile menu if clicked outside
    if (!target.closest('.mobile-menu-toggle') && 
        !target.closest('.right-menu') && 
        this.showMobileMenu) {
      this.closeMobileMenus();
    }
  }

  // ========================================
  // إضافة Event Handlers للـ Enhanced Search
  // ========================================

  onSearchPerformed(result: SearchResult): void {
    console.log('Search performed:', result);
    
    // الانتقال لصفحة النتائج مع المعايير
    const queryParams: any = { q: result.query };
    if (result.category) {
      queryParams.category = result.category;
    }
    
    this.router.navigate(['/search'], { queryParams });
    this.closeMobileMenus();
  }

  onSuggestionSelected(suggestion: SearchSuggestion): void {
    console.log('Suggestion selected:', suggestion);
    
    // التنقل حسب نوع الاقتراح
    if (suggestion.id) {
      this.router.navigate(['/product', suggestion.id]);
    } else {
      this.router.navigate(['/search'], { 
        queryParams: { 
          q: suggestion.text, 
          category: suggestion.category 
        } 
      });
    }
    this.closeMobileMenus();
  }

  onCategoryChanged(category: string): void {
    console.log('Search category changed:', category);
    // منطق إضافي عند تغيير الفئة (اختياري)
  }

  onAdvancedSearchPerformed(filters: CarSearchFilters): void {
    console.log('Advanced search performed:', filters);
    
    // الانتقال لصفحة النتائج مع فلاتر البحث المتقدم
    const queryParams: any = {};
    
    if (filters.brand) queryParams.brand = filters.brand;
    if (filters.model) queryParams.model = filters.model;
    if (filters.year) queryParams.year = filters.year;
    if (filters.category) queryParams.partCategory = filters.category;
    if (filters.subcategory) queryParams.partType = filters.subcategory;
    
    // إضافة مؤشر للبحث المتقدم
    queryParams.advanced = 'true';
    
    this.router.navigate(['/search'], { queryParams });
    this.closeMobileMenus();
  }

  // ========================================
  // الطرق الموجودة بالفعل - بدون تغيير
  // ========================================

  toggleSearch(): void {
    this.showSearch = !this.showSearch;
  }

  toggleMobileMenu(): void {
    this.showMobileMenu = !this.showMobileMenu;
    
    if (this.showMobileMenu) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }

  toggleMobileNav(): void {
    this.showMobileNav = !this.showMobileNav;
  }

  toggleUserMenu(): void {
    this.showUserMenu = !this.showUserMenu;
  }

  closeMobileMenus(): void {
    this.showMobileMenu = false;
    this.showMobileNav = false;
    this.showUserMenu = false;
    document.body.style.overflow = '';
  }

  goToNavItem(item: any): void {
    if (item.type === 'route') {
      this.router.navigate([item.route]);
    } else if (item.type === 'action' && item.action) {
      item.action();
    }
    this.closeMobileMenus();
  }

  getUserInitials(): string {
    if (!this.userName) return '؟';
    const names = this.userName.split(' ');
    return names.length > 1 
      ? names[0].charAt(0) + names[1].charAt(0)
      : names[0].charAt(0);
  }

  switchToCustomerMode(): void {
    console.log('Switching to customer mode');
    this.closeMobileMenus();
  }

  logout(): void {
    this.isLoggedIn = false;
    this.userName = '';
    this.userAvatar = '';
    this.isMerchant = false;
    this.isDriver = false;
    this.router.navigate(['/']);
    this.closeMobileMenus();
  }

  private loadUserData(): void {
    const userData = localStorage.getItem('user');
    if (userData) {
      const user = JSON.parse(userData);
      this.isLoggedIn = true;
      this.userName = user.name || 'المستخدم';
      this.userAvatar = user.avatar || '';
      this.isMerchant = user.type === 'merchant';
      this.isDriver = user.type === 'driver';
    }
  }

  private updateCartCount(): void {
    const cart = localStorage.getItem('cart');
    if (cart) {
      const cartData = JSON.parse(cart);
      this.cartCount = cartData.items ? cartData.items.length : 0;
    }
  }

  // Legacy methods للتوافق مع الخلف
  performQuickSearch(query: string): void {
    this.router.navigate(['/search'], { queryParams: { q: query } });
  }

  search(): void {
    if (this.searchTerm.trim()) {
      this.performQuickSearch(this.searchTerm);
    }
  }

  navigateToAdvancedSearch(): void {
    this.router.navigate(['/advanced-search']);
  }

  onSearchFocus(): void {
    if (window.innerWidth <= 768) {
      this.showSearch = true;
    }
  }
}