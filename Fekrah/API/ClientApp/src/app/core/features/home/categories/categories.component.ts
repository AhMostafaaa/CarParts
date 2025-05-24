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

  categories = [
    { name: 'كهرباء' },
    { name: 'ميكانيكا' },
    { name: 'عفشة' },
    { name: 'سمكرة' },
    { name: 'دهانات' },
    { name: 'بطاريات' },
    { name: 'أكسسوارات' },
    { name: 'زيوت' },
    { name: 'أنوار' },
    { name: 'كهرباء' },
    { name: 'ميكانيكا' },
    { name: 'عفشة' },
    { name: 'سمكرة' },
    { name: 'دهانات' },
    { name: 'بطاريات' },
    { name: 'أكسسوارات' },
    { name: 'زيوت' },
    { name: 'أنوار' },
    { name: 'مكيفات' },
    { name: 'فلتر' }
  ];

  ngOnInit(): void {}

  scrollLeft(): void {
    this.scrollContainer.nativeElement.scrollBy({ left: -200, behavior: 'smooth' });
  }

  scrollRight(): void {
    this.scrollContainer.nativeElement.scrollBy({ left: 200, behavior: 'smooth' });
  }
}
