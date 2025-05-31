import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FooterComponent } from './footer.component';
import { AboutUsComponent } from '../about-us/about-us.component';
import { ContactUsComponent } from '../contact-us/contact-us.component';
import { TermsPoliciesComponent } from './terms-policies/terms-policies.component';
import { SupportComponent } from './support/support.component';
import { CommonQuestionsComponent } from './common-questions/common-questions.component';
import { SellerMenuComponent } from './seller-menu/seller-menu.component';

const routes: Routes = [
  { path: '', component: FooterComponent }, // مسار رئيسي (اختياري)
  { path: 'about-us', component: AboutUsComponent },
  { path: 'contact-us', component: ContactUsComponent },
  { path: 'terms-policies', component: TermsPoliciesComponent },
  { path: 'Support', component: SupportComponent },
  { path: 'CommonQuestions', component: CommonQuestionsComponent },
  { path: 'SellerMenu', component: SellerMenuComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FooterRoutingModule { }
