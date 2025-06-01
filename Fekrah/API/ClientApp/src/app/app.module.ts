import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HeaderComponent } from './Shared/layout/header/header.component';
import { PromoTickerComponent } from './Shared/components/promo-ticker/promo-ticker.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FooterModule } from './Shared/layout/footer/footer.module';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    PromoTickerComponent,



  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    FooterModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
