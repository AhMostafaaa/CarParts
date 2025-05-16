import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent {
  @Input() part: any;

  onAdd(part: any): void {
  console.log('تمت الإضافة:', part);
  // يمكنك تنفيذ منطق إضافة المنتج هنا، أو إطلاق حدث (EventEmitter)
}

getGradeClass(grade: string): string {
  switch (grade) {
    case 'فرز أول':
      return 'grade-primary';
    case 'فرز تاني':
      return 'grade-secondary';
    default:
      return 'grade-default';
  }
}


}
