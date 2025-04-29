import { Component, Input } from '@angular/core';
import { PartViewModel } from '../../../Shared/Services/Swagger/SwaggerClient.service';

@Component({
  selector: 'app-part-list',
  templateUrl: './part-list.component.html',
  styleUrls: ['./part-list.component.scss']
})
export class PartListComponent {
  @Input() parts: PartViewModel[] = [];
}
