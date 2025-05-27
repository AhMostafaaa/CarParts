import { Component, Input, Output, EventEmitter } from '@angular/core';



@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent {
  @Input() part!: any;
  @Output() favoriteToggled = new EventEmitter<any>();
  @Output() addToCart = new EventEmitter<any>();

  /**
   * Format price with Egyptian Pound currency
   * @param price - The price to format
   * @returns Formatted price string
   */
  formatPrice(price: number): string {
    if (!price) return '0';
    
    return new Intl.NumberFormat('ar-EG', {
      style: 'currency',
      currency: 'EGP',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(price);
  }

  /**
   * Handle adding item to cart
   * @param part - The car part to add
   */
  onAdd(part: any): void {
    // Add ripple effect
    this.createRippleEffect(event as MouseEvent);
    
    // Emit event
    this.addToCart.emit(part);
    
    // Show success notification (you can customize this)
    this.showNotification(`تمت إضافة ${part.name} إلى السلة`);
    
    console.log('تمت الإضافة:', part);
  }

  /**
   * Toggle favorite status
   * @param part - The car part to toggle favorite
   */
  toggleFavorite(part:  any): void {
    part.isFavorite = !part.isFavorite;
    this.favoriteToggled.emit(part);
    
    const message = part.isFavorite 
      ? `تمت إضافة ${part.name} إلى المفضلة` 
      : `تم حذف ${part.name} من المفضلة`;
    
    this.showNotification(message);
  }

  /**
   * Get CSS class for grade badge
   * @param grade - The grade string
   * @returns CSS class name
   */
  getGradeClass(grade: string): string {
    const gradeMap: { [key: string]: string } = {
      'فرز أول': 'grade-primary',
      'فرز تاني': 'grade-secondary',
      'الأول': 'grade-primary',
      'الثاني': 'grade-secondary',
      'ممتاز': 'grade-primary',
      'جيد': 'grade-secondary'
    };

    return gradeMap[grade] || 'grade-default';
  }

  /**
   * Get CSS class for condition badge
   * @param condition - The condition string
   * @returns CSS class name
   */
  getConditionClass(condition: string): string {
    const conditionMap: { [key: string]: string } = {
      'جديد': 'condition-new',
      'مستعمل': 'condition-used',
      'مستخدم': 'condition-used',
      'بحالة ممتازة': 'condition-new',
      'بحالة جيدة': 'condition-used'
    };

    return conditionMap[condition] || 'condition-default';
  }

  /**
   * Create ripple effect on button click
   * @param event - Mouse event
   */
  private createRippleEffect(event: MouseEvent): void {
    const button = event.currentTarget as HTMLElement;
    const ripple = document.createElement('span');
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;

    ripple.style.cssText = `
      position: absolute;
      width: ${size}px;
      height: ${size}px;
      left: ${x}px;
      top: ${y}px;
      background: rgba(255, 255, 255, 0.5);
      border-radius: 50%;
      transform: scale(0);
      animation: ripple 0.6s linear;
      pointer-events: none;
    `;

    // Add ripple animation CSS if not exists
    if (!document.querySelector('#ripple-styles')) {
      const style = document.createElement('style');
      style.id = 'ripple-styles';
      style.textContent = `
        @keyframes ripple {
          to {
            transform: scale(4);
            opacity: 0;
          }
        }
      `;
      document.head.appendChild(style);
    }

    button.style.position = 'relative';
    button.style.overflow = 'hidden';
    button.appendChild(ripple);

    // Remove ripple after animation
    setTimeout(() => {
      ripple.remove();
    }, 600);
  }

  /**
   * Show notification message
   * @param message - The message to show
   */
  private showNotification(message: string): void {
    // Create notification element
    const notification = document.createElement('div');
    notification.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: linear-gradient(135deg, #10b981 0%, #047857 100%);
      color: white;
      padding: 12px 20px;
      border-radius: 8px;
      box-shadow: 0 4px 12px rgba(16, 185, 129, 0.4);
      z-index: 1000;
      font-family: 'Cairo', sans-serif;
      font-size: 0.9rem;
      transform: translateX(100%);
      transition: transform 0.3s ease;
    `;
    notification.textContent = message;

    document.body.appendChild(notification);

    // Animate in
    setTimeout(() => {
      notification.style.transform = 'translateX(0)';
    }, 100);

    // Remove after 3 seconds
    setTimeout(() => {
      notification.style.transform = 'translateX(100%)';
      setTimeout(() => {
        notification.remove();
      }, 300);
    }, 3000);
  }

  /**
   * Handle image loading errors
   * @param event - Error event
   */
  onImageError(event: Event): void {
    const img = event.target as HTMLImageElement;
    img.src = '/assets/images/placeholder-car-part.jpg'; // Add placeholder image
  }

  /**
   * Get formatted discount percentage
   * @param discount - Discount percentage
   * @returns Formatted discount string
   */
  getFormattedDiscount(discount: number): string {
    return `خصم ${discount}%`;
  }

  /**
   * Calculate savings amount
   * @param originalPrice - Original price
   * @param discountedPrice - Price after discount
   * @returns Savings amount
   */
  calculateSavings(originalPrice: number, discountedPrice: number): number {
    return originalPrice - discountedPrice;
  }

  /**
   * Get formatted savings amount
   * @param originalPrice - Original price
   * @param discountedPrice - Price after discount
   * @returns Formatted savings string
   */
  getFormattedSavings(originalPrice: number, discountedPrice: number): string {
    const savings = this.calculateSavings(originalPrice, discountedPrice);
    return this.formatPrice(savings);
  }

  /**
   * Check if part is on sale
   * @param part - Car part object
   * @returns True if part has discount
   */
  isOnSale(part: any): boolean {
    return !!(part.discount && part.discount > 0);
  }

  /**
   * Get WhatsApp message template
   * @param part - Car part object
   * @returns WhatsApp message URL
   */
  getWhatsAppMessage(part: any): string {
    const message = encodeURIComponent(
      `مرحباً، أريد الاستفسار عن قطعة الغيار:\n` +
      `${part.name}\n` +
      `للسيارة: ${part.carBrand} ${part.carModel} ${part.modelYear}\n` +
      `السعر: ${this.formatPrice(part.priceAfterDiscount || part.price)}`
    );
    return `https://wa.me/${part.sellerPhone}?text=${message}`;
  }

  /**
   * Share part details
   * @param part - Car part to share
   */
  sharePart(part: any): void {
    if (navigator.share) {
      navigator.share({
        title: part.name,
        text: `${part.name} - ${part.carBrand} ${part.carModel} ${part.modelYear}`,
        url: window.location.href + `/parts/${part.id}`
      }).catch(console.error);
    } else {
      // Fallback: copy to clipboard
      const shareText = `${part.name} - ${part.carBrand} ${part.carModel} ${part.modelYear}\n${window.location.href}/parts/${part.id}`;
      navigator.clipboard.writeText(shareText).then(() => {
        this.showNotification('تم نسخ رابط القطعة');
      }).catch(() => {
        this.showNotification('فشل في نسخ الرابط');
      });
    }
  }

  /**
   * Track user interaction for analytics
   * @param action - Action type
   * @param part - Car part object
   */
  trackInteraction(action: string, part: any): void {
    // Analytics tracking - you can integrate with Google Analytics, Firebase, etc.
    console.log('User Interaction:', {
      action,
      partId: part.id,
      partName: part.name,
      timestamp: new Date().toISOString()
    });

    // Example: Google Analytics 4 event (uncomment when gtag is available)
    // if (typeof (window as any).gtag !== 'undefined') {
    //   (window as any).gtag('event', action, {
    //     event_category: 'car_parts',
    //     event_label: part.name,
    //     value: part.priceAfterDiscount || part.price
    //   });
    // }
  }

  /**
   * Handle card click for detailed view
   * @param part - Car part object
   */
  onCardClick(part: any): void {
    this.trackInteraction('card_click', part);
    // Navigation will be handled by routerLink in template
  }

  /**
   * Handle WhatsApp button click
   * @param part - Car part object
   */
  onWhatsAppClick(part: any): void {
    this.trackInteraction('whatsapp_click', part);
    const whatsappUrl = this.getWhatsAppMessage(part);
    window.open(whatsappUrl, '_blank');
  }

  /**
   * Check if part is available
   * @param part - Car part object
   * @returns True if part is available
   */
  isPartAvailable(part: any): boolean {
    // You can add more complex availability logic here
    return !!(part && part.id);
  }

  /**
   * Get part condition icon
   * @param condition - Condition string
   * @returns Icon class name
   */
  getConditionIcon(condition: string): string {
    const iconMap: { [key: string]: string } = {
      'جديد': 'fas fa-star',
      'مستعمل': 'fas fa-check-circle',
      'مستخدم': 'fas fa-check-circle',
      'بحالة ممتازة': 'fas fa-star',
      'بحالة جيدة': 'fas fa-check'
    };

    return iconMap[condition] || 'fas fa-info-circle';
  }

  /**
   * Format car details for display
   * @param part - Car part object
   * @returns Formatted car details string
   */
  getFormattedCarDetails(part: any): string {
    return `${part.carBrand} ${part.carModel} ${part.modelYear}`;
  }

  /**
   * Check if image should show loading placeholder
   * @param imageUrl - Image URL
   * @returns True if should show placeholder
   */
  shouldShowPlaceholder(imageUrl: string): boolean {
    return !imageUrl || imageUrl.trim() === '';
  }

  /**
   * Get placeholder image URL
   * @returns Placeholder image path
   */
  getPlaceholderImage(): string {
    return '/assets/images/car-part-placeholder.svg';
  }

  /**
   * Lazy load image
   * @param event - Intersection observer event
   */
  onImageIntersection(event: IntersectionObserverEntry[]): void {
    event.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target as HTMLImageElement;
        if (img.dataset['src']) {
          img.src = img.dataset['src'];
          img.removeAttribute('data-src');
        }
      }
    });
  }
}