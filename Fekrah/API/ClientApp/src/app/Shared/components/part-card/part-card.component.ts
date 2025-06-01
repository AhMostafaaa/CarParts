import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-part-card',
  templateUrl: './part-card.component.html',
  styleUrls: ['./part-card.component.scss']
})
export class PartCardComponent {
  @Input() part: any;
  @Input() type: 'latest' | 'offer' = 'latest';
}
