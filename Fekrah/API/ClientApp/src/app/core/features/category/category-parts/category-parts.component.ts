// category-parts.component.ts

import { Component, OnInit } from '@angular/core';

interface Part {
  id: number;
  name: string;
  storeName: string;
  price: number;
  condition: 'New' | 'Refurbished';
  category: string;
  brand: string;
  fastDelivery: boolean;
  discount: number;
  rating: number;
  imageUrl: string;
}

@Component({
  selector: 'app-category-parts',
  templateUrl: './category-parts.component.html',
  styleUrls: ['./category-parts.component.scss']
})
export class CategoryPartsComponent implements OnInit {
  parts: Part[] = [];
  filteredParts: Part[] = [];
  displayedParts: Part[] = [];

  // Filters
  searchText = '';
  selectedConditions: string[] = [];
  maxPrice = 0;
  selectedPriceMin = 0;
  selectedPriceMax = 0;
  categoriesList: string[] = [];
  selectedCategories: string[] = [];
  brandsList: string[] = [];
  selectedBrands: string[] = [];
  selectedDelivery = false;
  selectedRating = 0;
  sortOption = '';

  // Pagination
  currentPage = 1;
  pageSize = 12;
  totalPages = 1;

  // Toggle filters sidebar
  showFilters = false;

  ngOnInit(): void {
    this.loadAllParts();
    this.resetFilters();
  }

  toggleFilters(): void {
    this.showFilters = !this.showFilters;
  }

  loadAllParts(): void {
    this.parts = [
      { id:  1, name: 'فلتر زيت',        storeName: 'ميكانيكا مصر',      price: 120,  condition: 'New',        category: 'ميكانيكا', brand: 'تويوتا',    fastDelivery: true,  discount: 0,  rating: 4, imageUrl: 'assets/images/image100_100.png' },
      { id:  2, name: 'مساعد خلفي',       storeName: 'عالم العفشة',       price: 450,  condition: 'Refurbished',category: 'عفشة',    brand: 'نيسان',     fastDelivery: false, discount: 10, rating: 5, imageUrl: 'assets/images/image100_100.png' },
      { id:  3, name: 'بطارية سيارة',      storeName: 'بطاريات الخليج',    price: 850,  condition: 'New',        category: 'كهرباء',   brand: 'هيونداي',   fastDelivery: true,  discount: 5,  rating: 3, imageUrl: 'assets/images/image100_100.png' },
      { id:  4, name: 'ردياتير',          storeName: 'المبرد العربي',     price: 1200, condition: 'Refurbished',category: 'تبريد',    brand: 'تويوتا',    fastDelivery: true,  discount: 15, rating: 4, imageUrl: 'assets/images/image100_100.png' },
      { id:  5, name: 'بواجي',             storeName: 'شمعات الذهب',       price: 200,  condition: 'New',        category: 'كهرباء',   brand: 'مرسيدس',    fastDelivery: false, discount: 0,  rating: 4, imageUrl: 'assets/images/image100_100.png' },
      { id:  6, name: 'طقم فلاتر',        storeName: 'فلتر الشارع',        price: 320,  condition: 'New',        category: 'ميكانيكا', brand: 'فيات',      fastDelivery: true,  discount: 8,  rating: 2, imageUrl: 'assets/images/image100_100.png' },
      { id:  7, name: 'ديسك بريك',         storeName: 'مكابح مصر',         price: 580,  condition: 'Refurbished',category: 'ميكانيكا', brand: 'تويوتا',    fastDelivery: true,  discount: 12, rating: 5, imageUrl: 'assets/images/image100_100.png' },
      { id:  8, name: 'طقم كوابح',        storeName: 'مكابح الكويت',      price: 760,  condition: 'New',        category: 'ميكانيكا', brand: 'بي إم دبليو', fastDelivery: false, discount: 0,  rating: 3, imageUrl: 'assets/images/image100_100.png' },
      { id:  9, name: 'طرمبة مياه',       storeName: 'مبردات الخليج',     price: 950,  condition: 'New',        category: 'تبريد',    brand: 'هيونداي',   fastDelivery: false, discount: 20, rating: 5, imageUrl: 'assets/images/image100_100.png' },
      { id: 10, name: 'دامر',              storeName: 'ميكانيكا 24',       price: 130,  condition: 'New',        category: 'عفشة',    brand: 'كيا',       fastDelivery: true,  discount: 0,  rating: 2, imageUrl: 'assets/images/image100_100.png' },
      { id: 11, name: 'ساعد أمامي',        storeName: 'عالم العفشة',       price: 670,  condition: 'Refurbished',category: 'عفشة',    brand: 'تويوتا',    fastDelivery: true,  discount: 10, rating: 4, imageUrl: 'assets/images/image100_100.png' },
      { id: 12, name: 'مروحة تبريد',       storeName: 'مبردات الصحراء',    price: 330,  condition: 'New',        category: 'تبريد',    brand: 'فيات',      fastDelivery: false, discount: 0,  rating: 2, imageUrl: 'assets/images/image100_100.png' },
      { id: 13, name: 'صامولة عجلة',       storeName: 'مكابح مصر',         price: 25,   condition: 'New',        category: 'عفشة',    brand: 'بي إم دبليو', fastDelivery: true,  discount: 0,  rating: 5, imageUrl: 'assets/images/image100_100.png' },
      { id: 14, name: 'دينامو',            storeName: 'كهرباء اليوم',      price: 1050, condition: 'New',        category: 'كهرباء',   brand: 'تويوتا',    fastDelivery: true,  discount: 7,  rating: 3, imageUrl: 'assets/images/image100_100.png' },
      { id: 15, name: 'كنترول يونية',      storeName: 'إلكترونيات العرب',  price: 2200, condition: 'Refurbished',category: 'كهرباء',   brand: 'هيونداي',   fastDelivery: true,  discount: 18, rating: 5, imageUrl: 'assets/images/image100_100.png' },
      { id: 16, name: 'سيلنكون مكينة',     storeName: 'ميكانيكا 24',       price: 490,  condition: 'New',        category: 'ميكانيكا', brand: 'كيا',       fastDelivery: true,  discount: 5,  rating: 4, imageUrl: 'assets/images/image100_100.png' },
      { id: 17, name: 'مساعد باور',        storeName: 'قوة السيارة',       price: 880,  condition: 'Refurbished',category: 'ميكانيكا', brand: 'بي إم دبليو', fastDelivery: false, discount: 12, rating: 5, imageUrl: 'assets/images/image100_100.png' },
      { id: 18, name: 'جناح هوائي',        storeName: 'ميكانيكا 24',       price: 300,  condition: 'New',        category: 'عفشة',    brand: 'مرسيدس',    fastDelivery: false, discount: 0,  rating: 3, imageUrl: 'assets/images/image100_100.png' },
      { id: 19, name: 'حرارة متر',         storeName: 'كهرباء اليوم',      price: 180,  condition: 'Refurbished',category: 'كهرباء',   brand: 'نيسان',     fastDelivery: false, discount: 3,  rating: 4, imageUrl: 'assets/images/image100_100.png' },
      { id: 20, name: 'فلتر هواء',         storeName: 'فلتر الشارع',       price: 260,  condition: 'New',        category: 'ميكانيكا', brand: 'فيات',      fastDelivery: true,  discount: 0,  rating: 4, imageUrl: 'assets/images/image100_100.png' },
    ];

    this.categoriesList = Array.from(new Set(this.parts.map(p => p.category)));
    this.brandsList     = Array.from(new Set(this.parts.map(p => p.brand)));
    this.maxPrice       = Math.max(...this.parts.map(p => p.price));
  }

  applyFilters(): void {
    this.filteredParts = this.parts.filter(p => {
      const ms = !this.searchText || p.name.toLowerCase().includes(this.searchText.toLowerCase());
      const mc = !this.selectedConditions.length || this.selectedConditions.includes(p.condition);
      const mp = p.price >= this.selectedPriceMin && p.price <= this.selectedPriceMax;
      const mcat = !this.selectedCategories.length || this.selectedCategories.includes(p.category);
      const mb = !this.selectedBrands.length   || this.selectedBrands.includes(p.brand);
      const md = !this.selectedDelivery        || p.fastDelivery;
      const mr = !this.selectedRating          || p.rating >= this.selectedRating;
      return ms && mc && mp && mcat && mb && md && mr;
    });

    if (this.sortOption === 'priceAsc') {
      this.filteredParts.sort((a,b)=>a.price-b.price);
    } else if (this.sortOption === 'priceDesc') {
      this.filteredParts.sort((a,b)=>b.price-a.price);
    } else if (this.sortOption === 'ratingDesc') {
      this.filteredParts.sort((a,b)=>b.rating-a.rating);
    }

    this.currentPage = 1;
    this.updatePagination();
  }

  private updatePagination(): void {
    this.totalPages     = Math.max(1, Math.ceil(this.filteredParts.length/this.pageSize));
    const start         = (this.currentPage-1)*this.pageSize;
    this.displayedParts = this.filteredParts.slice(start, start+this.pageSize);
  }

  goToPage(page: number): void {
    if (page<1||page>this.totalPages) return;
    this.currentPage = page;
    this.updatePagination();
  }

  resetFilters(): void {
    this.searchText         = '';
    this.selectedConditions = [];
    this.selectedPriceMin   = 0;
    this.selectedPriceMax   = this.maxPrice;
    this.selectedCategories = [];
    this.selectedBrands     = [];
    this.selectedDelivery   = false;
    this.selectedRating     = 0;
    this.sortOption         = '';
    this.currentPage        = 1;
    this.applyFilters();
  }

  onConditionChange(evt: any): void {
    this.toggleSelection(this.selectedConditions, evt);
    this.applyFilters();
  }

  onCategoryChange(evt: any): void {
    this.toggleSelection(this.selectedCategories, evt);
    this.applyFilters();
  }

  onBrandChange(evt: any): void {
    this.toggleSelection(this.selectedBrands, evt);
    this.applyFilters();
  }

  onDeliveryChange(evt: any): void {
    this.selectedDelivery = evt.target.checked;
    this.applyFilters();
  }

  onRatingChange(evt: any): void {
    this.selectedRating = +evt.target.value;
    this.applyFilters();
  }

  private toggleSelection(list: string[], evt: any): void {
    const val = evt.target.value;
    if (evt.target.checked) list.push(val);
    else {
      const i = list.indexOf(val);
      if (i>-1) list.splice(i,1);
    }
  }
}
