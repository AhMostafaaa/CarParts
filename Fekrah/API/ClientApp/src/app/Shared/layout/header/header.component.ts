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
  navItems = [
    { label: 'الرئيسية', target: 'category' },
    { label: 'الأقسام', target: 'categories-section' },
    { label: 'الماركات', target: 'brands-section' },
    { label: 'العروض', target: 'offers-section' },
    { label: 'المتاجر', target: 'stores-section' },
    { label: 'المقترحات', target: 'suggested-offers' },
    { label: 'أحدث القطع', target: 'latest-section' },
    { label: 'الأصناف', target: 'part-types' }
  ];


  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.isSticky = window.pageYOffset > 20;
  }

  constructor(private router: Router) { }

  ngOnInit(): void {
    // In a real application, you would get the cart count from a service
    this.updateCartCount();
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

  updateCartCount(): void {
    // This would typically come from a cart service
    // This is just a placeholder
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



}
