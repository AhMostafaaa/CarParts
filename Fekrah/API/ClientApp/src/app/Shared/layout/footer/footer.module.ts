import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FooterRoutingModule } from './footer-routing.module';
import { FooterComponent } from './footer.component';
import { TermsPoliciesComponent } from './terms-policies/terms-policies.component';
import { SharedModule } from '../../shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { SupportComponent } from './support/support.component';
import { CommonQuestionsComponent } from './common-questions/common-questions.component';
import { SellerMenuComponent } from './seller-menu/seller-menu.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { ContactUsComponent } from './contact-us/contact-us.component';


@NgModule({
  declarations: [FooterComponent,
    AboutUsComponent,
    ContactUsComponent,
    TermsPoliciesComponent,
    SupportComponent,
    CommonQuestionsComponent,
    SellerMenuComponent
  ],
  imports: [
    ReactiveFormsModule,
    FooterRoutingModule,
    SharedModule,
    CommonModule,
  ],
  exports: [FooterComponent]
})
export class FooterModule { }
