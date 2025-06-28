import { NgModule } from '@angular/core';

import { PartsRoutingModule } from './parts-routing.module';
import { PartsComponent } from './parts.component';
import { PartFilterComponent } from './part-filter/part-filter.component';
import { PartListComponent } from './part-list/part-list.component';
import { PartCardComponent } from './part-card/part-card.component';
import { PartDetailsComponent } from './part-details/part-details.component';
import { SharedModule } from '../../../Shared/shared.module';
import { PartSearchComponent } from './part-search/part-search.component';
import { NgImageSliderModule } from 'ng-image-slider';


@NgModule({
  declarations: [
    PartsComponent,
    PartSearchComponent,
    PartFilterComponent,
    PartListComponent,
    PartCardComponent,
    PartDetailsComponent,
  ],
  imports: [
    SharedModule,
    PartsRoutingModule,
    NgImageSliderModule
  ]
})
export class PartsModule { }
