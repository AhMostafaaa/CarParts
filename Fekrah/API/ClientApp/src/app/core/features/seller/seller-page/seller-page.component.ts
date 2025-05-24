import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-seller-page',
  templateUrl: './seller-page.component.html',
  styleUrls: ['./seller-page.component.scss']
})
export class SellerPageComponent implements OnInit {
  seller = {
    name: 'مؤسسة قطع غيار السيارات الأصلية',
    rating: 4.8,
    phone: '966500000000',
    description: 'متخصصون في بيع قطع الغيار الأصلية للسيارات الأوروبية واليابانية بأفضل الأسعار مع ضمان أصالة المنتج',
    location: 'الرياض - حي النسيم',
    workingHours: '9:00 ص - 11:00 م',
    reviews: [
      { customer: 'أحمد علي', rating: 5, comment: 'قطع غيار أصلية وخدمة ممتازة وسرعة في التوصيل!' },
      { customer: 'سارة محمد', rating: 4, comment: 'جودة القطع رائعة والأسعار معقولة مقارنة بالسوق.' },
      { customer: 'مصطفى فؤاد', rating: 5, comment: 'تعاملت معهم أكثر من مرة وكل مرة الخدمة ممتازة.' },
      { customer: 'نهى خالد', rating: 5, comment: 'التوصيل سريع والتغليف ممتاز والقطع أصلية 100%.' },
      { customer: 'محمد عمر', rating: 4, comment: 'أسعار منافسة وخدمة عملاء محترفة.' }
    ]
  };

  stars = Array(5).fill(0);
  categories = ['فلاتر', 'بطاريات', 'زيوت', 'إطارات', 'قطع كهربائية', 'قطع ميكانيكية', 'إكسسوارات', 'قطع هيكل'];

  sellerProducts = [
    {
      id: 201,
      name: 'فلتر هواء تويوتا كامري',
      description: 'فلتر هواء أصلي لسيارات تويوتا كامري 2018-2022',
      price: 320,
      oldPrice: 390,
      category: 'فلاتر',
      imageUrl: 'assets/images/image100_100.png',
      freeShipping: false
    },
    {
      id: 202,
      name: 'بطارية فارتا AGM 80 أمبير',
      description: 'بطارية ألمانية عالية الأداء مع ضمان 3 سنوات',
      price: 1200,
      oldPrice: 1350,
      category: 'بطاريات',
      imageUrl: 'assets/images/image100_100.png',
      freeShipping: true
    },
    {
      id: 203,
      name: 'طقم فرامل بريمبو',
      description: 'طقم فرامل أمامي أصلي من بريمبو لسيارات BMW الفئة الثالثة',
      price: 2200,
      oldPrice: 2500,
      category: 'قطع ميكانيكية',
      imageUrl: 'assets/images/image100_100.png',
      freeShipping: true
    },
    {
      id: 204,
      name: 'زيت موبيل 1 5W-40',
      description: 'زيت محرك اصطناعي بالكامل 4 لتر',
      price: 450,
      oldPrice: 500,
      category: 'زيوت',
      imageUrl: 'assets/images/image100_100.png',
      freeShipping: false
    },
    {
      id: 205,
      name: 'إطارات ميشلان',
      description: 'إطار مقاس 225/45R17 للسيارات الرياضية',
      price: 800,
      oldPrice: 950,
      category: 'إطارات',
      imageUrl: 'assets/images/image100_100.png',
      freeShipping: true
    },
    {
      id: 206,
      name: 'دينامو بوش',
      description: 'دينامو أصلي لسيارات مرسيدس الفئة C',
      price: 1800,
      oldPrice: 2100,
      category: 'قطع كهربائية',
      imageUrl: 'assets/images/image100_100.png',
      freeShipping: true
    },
    {
      id: 207,
      name: 'شاشة أندرويد',
      description: 'شاشة لمس 9 بوصة مع نظام أندرويد وخرائط',
      price: 2500,
      oldPrice: 2800,
      category: 'إكسسوارات',
      imageUrl: 'assets/images/image100_100.png',
      freeShipping: false
    },
    {
      id: 208,
      name: 'صدام أمامي هوندا',
      description: 'صدام أمامي أصلي لهوندا أكورد 2020',
      price: 1500,
      oldPrice: 1800,
      category: 'قطع هيكل',
      imageUrl: 'assets/images/image100_100.png',
      freeShipping: true
    }
  ];

  filteredProducts: any[] = [];

  ngOnInit(): void {
    this.filteredProducts = [...this.sellerProducts];
  }

  calculateDiscount(product: any): number {
    if (product.oldPrice <= product.price) return 0;
    const discount = ((product.oldPrice - product.price) / product.oldPrice) * 100;
    return Math.round(discount);
  }

  filterByCategory(category: string) {
    if (category === 'all') {
      this.filteredProducts = [...this.sellerProducts];
    } else {
      this.filteredProducts = this.sellerProducts.filter(p => p.category === category);
    }
  }
}
