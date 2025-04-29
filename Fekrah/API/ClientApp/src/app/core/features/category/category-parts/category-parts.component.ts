import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-category-parts',
  templateUrl: './category-parts.component.html',
  styleUrls: ['./category-parts.component.scss']
})
export class CategoryPartsComponent implements OnInit {

  categoryName: string = '';
  parts: any[] = [];
  filteredParts: any[] = [];

  selectedCondition: string = '';
  selectedPriceRange: string = '';

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.categoryName = params.get('name') || '';
      this.loadPartsByCategory();
    });
  }

  loadPartsByCategory(): void {
    this.parts = [
      { id: 1, name: 'فلتر زيت', price: 120, condition: 'New', imageUrl: 'assets/images/image100_100.png' },
      { id: 2, name: 'مساعد خلفي', price: 450, condition: 'Refurbished', imageUrl: 'assets/images/image100_100.png' },
      { id: 3, name: 'بطارية سيارة', price: 850, condition: 'New', imageUrl: 'assets/images/image100_100.png' },
      { id: 4, name: 'ردياتير', price: 1200, condition: 'Refurbished', imageUrl: 'assets/images/image100_100.png' },
    ];
    this.filteredParts = [...this.parts];
  }

  applyFilters(): void {
    this.filteredParts = this.parts.filter(part => {
      const matchCondition = this.selectedCondition ? part.condition === this.selectedCondition : true;
      const matchPrice = this.checkPriceRange(part.price);
      return matchCondition && matchPrice;
    });
  }

  checkPriceRange(price: number): boolean {
    if (this.selectedPriceRange === 'low') return price < 500;
    if (this.selectedPriceRange === 'medium') return price >= 500 && price <= 1000;
    if (this.selectedPriceRange === 'high') return price > 1000;
    return true;
  }
}
