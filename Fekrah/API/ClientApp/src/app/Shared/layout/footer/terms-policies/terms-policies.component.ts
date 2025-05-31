import { Component } from '@angular/core';

export interface PolicyLink {
  id: number;
  title: string;
  route: string;
  icon: string;
}

@Component({
  selector: 'app-terms-policies',
  templateUrl: './terms-policies.component.html',
  styleUrls: ['./terms-policies.component.scss']
})
export class TermsPoliciesComponent {

  policyLinks: PolicyLink[] = [
    {
      id: 1,
      title: 'سياسة الخصوصية',
      route: '/privacy-policy',
      icon: 'privacy'
    },
    {
      id: 2,
      title: 'الشروط والأحكام',
      route: '/terms-conditions',
      icon: 'terms'
    },
    {
      id: 3,
      title: 'سياسة الإرجاع والاستبدال',
      route: '/return-policy',
      icon: 'return'
    },
    {
      id: 4,
      title: 'سياسة الشحن والتوصيل',
      route: '/shipping-policy',
      icon: 'shipping'
    },
    {
      id: 5,
      title: 'سياسة الضمان',
      route: '/warranty-policy',
      icon: 'warranty'
    },
    {
      id: 6,
      title: 'شروط الاستخدام',
      route: '/usage-terms',
      icon: 'usage'
    }
  ];

  constructor() { }

  navigateToPolicy(route: string): void {
    // Navigation logic will be handled by router
    console.log('Navigating to:', route);
  }
}
