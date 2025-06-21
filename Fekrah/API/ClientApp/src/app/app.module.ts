import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HeaderComponent } from './Shared/layout/header/header.component';
import { PromoTickerComponent } from './Shared/components/promo-ticker/promo-ticker.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FooterModule } from './Shared/layout/footer/footer.module';
import { PreNavbarComponent } from './Shared/layout/pre-navbar/pre-navbar.component';
import { registerLocaleData } from '@angular/common';
import localeAr from '@angular/common/locales/ar';

registerLocaleData(localeAr);

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    PromoTickerComponent,
    PreNavbarComponent


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    FooterModule

  ],
  providers: [{ provide: LOCALE_ID, useValue: 'ar-EG' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
