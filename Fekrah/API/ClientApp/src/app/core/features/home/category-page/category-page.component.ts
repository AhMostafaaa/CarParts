import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-category-page',
  templateUrl: './category-page.component.html',
  styleUrls: ['./category-page.component.scss']
})
export class CategoryPageComponent implements OnInit {

  categoryName: string = '';

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.categoryName = this.route.snapshot.paramMap.get('name') || '';
    // هنا تقدر تجيب منتجات التصنيف ده من API بناءً على categoryName
  }
}
