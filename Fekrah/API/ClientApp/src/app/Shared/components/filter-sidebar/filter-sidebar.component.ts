// filter-sidebar.component.ts
import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';

export interface FilterCriteria {
  searchText: string;
  selectedCondition: '' | 'New' | 'Refurbished';
  selectedPriceMin: number;
  selectedPriceMax: number;
  selectedCategory: string;
  selectedBrand: string;
  selectedDelivery: boolean;
  selectedRating: number;
  sortOption: '' | 'priceAsc' | 'priceDesc' | 'ratingDesc';
}

@Component({
  selector: 'app-filter-sidebar',
  templateUrl: './filter-sidebar.component.html',
  styleUrls: ['./filter-sidebar.component.scss']
})
export class FilterSidebarComponent implements OnInit {
  @Input() categoriesList: string[] = [];
  @Input() brandsList: string[] = [];
  @Input() maxPrice = 0;

  @Input() criteria!: FilterCriteria;
  @Output() criteriaChange = new EventEmitter<FilterCriteria>();

  show = true;
  localCriteria!: FilterCriteria;

  ngOnInit() {
    // initialize local copy
    this.localCriteria = { ...this.criteria };
  }

  toggle() {
    this.show = !this.show;
  }

  apply() {
    this.criteriaChange.emit(this.localCriteria);
  }

  reset() {
    this.localCriteria = {
      searchText: '',
      selectedCondition: '',
      selectedPriceMin: 0,
      selectedPriceMax: this.maxPrice,
      selectedCategory: '',
      selectedBrand: '',
      selectedDelivery: false,
      selectedRating: 0,
      sortOption: ''
    };
    this.criteriaChange.emit(this.localCriteria);
  }
}
