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
}
