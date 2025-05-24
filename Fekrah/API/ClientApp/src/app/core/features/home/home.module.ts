import { NgModule } from '@angular/core';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { BannerComponent } from './banner/banner.component';
import { PartPreviewComponent } from './part-preview/part-preview.component';
import { OffersComponent } from './offers/offers.component';
import { CategoriesComponent } from './categories/categories.component';
import { CategoryPageComponent } from './category-page/category-page.component';
import { SuggestedOffersComponent } from './suggested-offers/suggested-offers.component';
import { FeaturedSellersComponent } from './featured-sellers/featured-sellers.component';
import { SharedModule } from '../../../Shared/shared.module';

@NgModule({
  declarations: [
    HomeComponent,
    BannerComponent,
    PartPreviewComponent,
    OffersComponent,
    CategoriesComponent,
    CategoryPageComponent,
    SuggestedOffersComponent,
    FeaturedSellersComponent,
  ],
  imports: [
    SharedModule,
    HomeRoutingModule
  ]
})
export class HomeModule { }
