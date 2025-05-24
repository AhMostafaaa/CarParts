import {
  Component,
  OnInit,
  ViewChild,
  ElementRef
} from '@angular/core';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {
  @ViewChild('scrollContainer', { static: false }) scrollContainer!: ElementRef;

  @ViewChild('brandsSection') brandsSection!: ElementRef;

  scrollToBrands() {
    this.brandsSection.nativeElement.scrollIntoView({ behavior: 'smooth' });
  }

  categories = [
    { name: 'كهرباء', code: 'electric' },
    { name: 'ميكانيكا', code: 'mechanic' },
    { name: 'عفشة', code: 'suspension' },
    { name: 'سمكرة', code: 'bodywork' },
    { name: 'دهانات', code: 'paint' },
    { name: 'بطاريات', code: 'batteries' },
    { name: 'أكسسوارات', code: 'accessories' },
    { name: 'زيوت', code: 'oil' },
    { name: 'أنوار', code: 'lights' },
    { name: 'كهرباء', code: 'electric-2' },
    { name: 'ميكانيكا', code: 'mechanic-2' },
    { name: 'عفشة', code: 'suspension-2' },
    { name: 'سمكرة', code: 'bodywork-2' },
    { name: 'دهانات', code: 'paint-2' },
    { name: 'بطاريات', code: 'batteries-2' },
    { name: 'أكسسوارات', code: 'accessories-2' },
    { name: 'زيوت', code: 'oil-2' },
    { name: 'أنوار', code: 'lights-2' },
    { name: 'مكيفات', code: 'ac' },
    { name: 'فلتر', code: 'filter' }
  ];


  ngOnInit(): void { }

  scrollLeft(): void {
    this.scrollContainer.nativeElement.scrollBy({ left: -200, behavior: 'smooth' });
  }

  scrollRight(): void {
    this.scrollContainer.nativeElement.scrollBy({ left: 200, behavior: 'smooth' });
  }

  scrollToCategory(code: string) {
    const el = document.getElementById(code);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  }



}
