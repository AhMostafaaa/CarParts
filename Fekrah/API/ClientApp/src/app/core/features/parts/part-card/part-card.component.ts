import { Component, Input } from '@angular/core';
import { PartViewModel } from '../../../Shared/Services/Swagger/SwaggerClient.service';

@Component({
  selector: 'app-part-card',
  templateUrl: './part-card.component.html',
  styleUrls: ['./part-card.component.scss']
})
export class PartCardComponent {
  @Input() part!: PartViewModel;
  imageLoaded = false; // 👈 لمتابعة تحميل الصورة
}
