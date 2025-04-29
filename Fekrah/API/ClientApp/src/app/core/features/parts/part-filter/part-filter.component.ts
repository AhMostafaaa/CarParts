import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-part-filter',
  templateUrl: './part-filter.component.html',
  styleUrls: ['./part-filter.component.scss']
})
export class PartFilterComponent {
  @Output() filtersChanged = new EventEmitter<any>();

  filters: any = {};

  submitFilters() {
    this.filtersChanged.emit(this.filters);
  }
}
