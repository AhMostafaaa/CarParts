import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryPageComponent } from './core/features/home/category-page/category-page.component';
import { AboutUsComponent } from './Shared/layout/about-us/about-us.component';
import { ContactUsComponent } from './Shared/layout/contact-us/contact-us.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: () => import('./core/features/home/home.module').then(m => m.HomeModule) },
  { path: 'parts', loadChildren: () => import('./core/features/parts/parts.module').then(m => m.PartsModule) },
  { path: 'auth', loadChildren: () => import('./core/features/auth/auth.module').then(m => m.AuthModule) },
  { path: 'admin', loadChildren: () => import('./core/features/admin/admin.module').then(m => m.AdminModule) },
  { path: 'category', loadChildren: () => import('./core/features/category/category.module').then(m => m.CategoryModule) },
  { path: 'category/:name', component: CategoryPageComponent },
  { path: 'AboutUs', component: AboutUsComponent },
  {
    path: 'contact-us', component: ContactUsComponent,
  },
  { path: 'seller', loadChildren: () => import('./core/features/seller/seller-page.module').then(m => m.SellerModule) },

  // أي مسارات تانية


  { path: '**', redirectTo: 'home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
