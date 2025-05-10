import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HeaderComponent } from './Shared/layout/header/header.component';
import { FooterComponent } from './Shared/layout/footer/footer.component';
import { PromoTickerComponent } from './Shared/components/promo-ticker/promo-ticker.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    PromoTickerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,


  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
