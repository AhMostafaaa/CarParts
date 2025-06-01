import { Component, OnInit } from '@angular/core';

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  oldPrice: number;
  category: string;
  imageUrl: string;
  freeShipping: boolean;
  brand?: string;
  model?: string;
  year?: string;
}

interface Seller {
  name: string;
  rating: number;
  phone: string;
  description: string;
  location: string;
  workingHours: string;
  reviews: { customer: string; rating: number; comment: string }[];
}

@Component({
  selector: 'app-seller-page',
  templateUrl: './seller-page.component.html',
  styleUrls: ['./seller-page.component.scss']
})
export class SellerPageComponent implements OnInit {
  seller: Seller = {
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
  sellerRoundedRating = 0;

  categories = ['فلاتر', 'بطاريات', 'زيوت', 'إطارات', 'قطع كهربائية', 'قطع ميكانيكية', 'إكسسوارات', 'قطع هيكل'];
  carBrands = ['تويوتا', 'هوندا', 'بي إم دبليو'];
  years = [2022, 2021, 2020, 2019, 2018];

  filters: { brand?: string; model?: string; year?: string; category?: string } = {};

  sellerProducts: Product[] = [
    {
      id: 201,
      name: 'فلتر هواء تويوتا كامري',
      description: 'فلتر هواء أصلي لسيارات تويوتا كامري 2018-2022',
      price: 320,
      oldPrice: 390,
      category: 'فلاتر',
      imageUrl: 'assets/images/image100_100.png',
      freeShipping: false,
      brand: 'تويوتا',
      model: 'كامري',
      year: '2018-2022'
    },
    {
      id: 202,
      name: 'بطارية فارتا AGM 80 أمبير',
      description: 'بطارية ألمانية عالية الأداء مع ضمان 3 سنوات',
      price: 1200,
      oldPrice: 1350,
      category: 'بطاريات',
      imageUrl: 'assets/images/image100_100.png',
      freeShipping: true,
      brand: 'مرسيدس',
      model: 'C-Class',
      year: '2020'
    },
    {
      id: 201,
      name: 'فلتر هواء تويوتا كامري',
      description: 'فلتر هواء أصلي لسيارات تويوتا كامري 2018-2022',
      price: 320,
      oldPrice: 390,
      category: 'فلاتر',
      imageUrl: 'assets/images/image100_100.png',
      freeShipping: false,
      brand: 'تويوتا',
      model: 'كامري',
      year: '2018-2022'
    },
    {
      id: 202,
      name: 'بطارية فارتا AGM 80 أمبير',
      description: 'بطارية ألمانية عالية الأداء مع ضمان 3 سنوات',
      price: 1200,
      oldPrice: 1350,
      category: 'بطاريات',
      imageUrl: 'assets/images/image100_100.png',
      freeShipping: true,
      brand: 'مرسيدس',
      model: 'C-Class',
      year: '2020'
    },
    {
      id: 201,
      name: 'فلتر هواء تويوتا كامري',
      description: 'فلتر هواء أصلي لسيارات تويوتا كامري 2018-2022',
      price: 320,
      oldPrice: 390,
      category: 'فلاتر',
      imageUrl: 'assets/images/image100_100.png',
      freeShipping: false,
      brand: 'تويوتا',
      model: 'كامري',
      year: '2018-2022'
    },
    {
      id: 202,
      name: 'بطارية فارتا AGM 80 أمبير',
      description: 'بطارية ألمانية عالية الأداء مع ضمان 3 سنوات',
      price: 1200,
      oldPrice: 1350,
      category: 'بطاريات',
      imageUrl: 'assets/images/image100_100.png',
      freeShipping: true,
      brand: 'مرسيدس',
      model: 'C-Class',
      year: '2020'
    },
    {
      id: 201,
      name: 'فلتر هواء تويوتا كامري',
      description: 'فلتر هواء أصلي لسيارات تويوتا كامري 2018-2022',
      price: 320,
      oldPrice: 390,
      category: 'فلاتر',
      imageUrl: 'assets/images/image100_100.png',
      freeShipping: false,
      brand: 'تويوتا',
      model: 'كامري',
      year: '2018-2022'
    },
    {
      id: 202,
      name: 'بطارية فارتا AGM 80 أمبير',
      description: 'بطارية ألمانية عالية الأداء مع ضمان 3 سنوات',
      price: 1200,
      oldPrice: 1350,
      category: 'بطاريات',
      imageUrl: 'assets/images/image100_100.png',
      freeShipping: true,
      brand: 'مرسيدس',
      model: 'C-Class',
      year: '2020'
    },
    {
      id: 201,
      name: 'فلتر هواء تويوتا كامري',
      description: 'فلتر هواء أصلي لسيارات تويوتا كامري 2018-2022',
      price: 320,
      oldPrice: 390,
      category: 'فلاتر',
      imageUrl: 'assets/images/image100_100.png',
      freeShipping: false,
      brand: 'تويوتا',
      model: 'كامري',
      year: '2018-2022'
    },
    {
      id: 202,
      name: 'بطارية فارتا AGM 80 أمبير',
      description: 'بطارية ألمانية عالية الأداء مع ضمان 3 سنوات',
      price: 1200,
      oldPrice: 1350,
      category: 'بطاريات',
      imageUrl: 'assets/images/image100_100.png',
      freeShipping: true,
      brand: 'مرسيدس',
      model: 'C-Class',
      year: '2020'
    },
    {
      id: 201,
      name: 'فلتر هواء تويوتا كامري',
      description: 'فلتر هواء أصلي لسيارات تويوتا كامري 2018-2022',
      price: 320,
      oldPrice: 390,
      category: 'فلاتر',
      imageUrl: 'assets/images/image100_100.png',
      freeShipping: false,
      brand: 'تويوتا',
      model: 'كامري',
      year: '2018-2022'
    },
    {
      id: 202,
      name: 'بطارية فارتا AGM 80 أمبير',
      description: 'بطارية ألمانية عالية الأداء مع ضمان 3 سنوات',
      price: 1200,
      oldPrice: 1350,
      category: 'بطاريات',
      imageUrl: 'assets/images/image100_100.png',
      freeShipping: true,
      brand: 'مرسيدس',
      model: 'C-Class',
      year: '2020'
    },
    {
      id: 201,
      name: 'فلتر هواء تويوتا كامري',
      description: 'فلتر هواء أصلي لسيارات تويوتا كامري 2018-2022',
      price: 320,
      oldPrice: 390,
      category: 'فلاتر',
      imageUrl: 'assets/images/image100_100.png',
      freeShipping: false,
      brand: 'تويوتا',
      model: 'كامري',
      year: '2018-2022'
    },
    {
      id: 202,
      name: 'بطارية فارتا AGM 80 أمبير',
      description: 'بطارية ألمانية عالية الأداء مع ضمان 3 سنوات',
      price: 1200,
      oldPrice: 1350,
      category: 'بطاريات',
      imageUrl: 'assets/images/image100_100.png',
      freeShipping: true,
      brand: 'مرسيدس',
      model: 'C-Class',
      year: '2020'
    },
    {
      id: 201,
      name: 'فلتر هواء تويوتا كامري',
      description: 'فلتر هواء أصلي لسيارات تويوتا كامري 2018-2022',
      price: 320,
      oldPrice: 390,
      category: 'فلاتر',
      imageUrl: 'assets/images/image100_100.png',
      freeShipping: false,
      brand: 'تويوتا',
      model: 'كامري',
      year: '2018-2022'
    },
    {
      id: 202,
      name: 'بطارية فارتا AGM 80 أمبير',
      description: 'بطارية ألمانية عالية الأداء مع ضمان 3 سنوات',
      price: 1200,
      oldPrice: 1350,
      category: 'بطاريات',
      imageUrl: 'assets/images/image100_100.png',
      freeShipping: true,
      brand: 'مرسيدس',
      model: 'C-Class',
      year: '2020'
    },
    {
      id: 201,
      name: 'فلتر هواء تويوتا كامري',
      description: 'فلتر هواء أصلي لسيارات تويوتا كامري 2018-2022',
      price: 320,
      oldPrice: 390,
      category: 'فلاتر',
      imageUrl: 'assets/images/image100_100.png',
      freeShipping: false,
      brand: 'تويوتا',
      model: 'كامري',
      year: '2018-2022'
    },
    {
      id: 202,
      name: 'بطارية فارتا AGM 80 أمبير',
      description: 'بطارية ألمانية عالية الأداء مع ضمان 3 سنوات',
      price: 1200,
      oldPrice: 1350,
      category: 'بطاريات',
      imageUrl: 'assets/images/image100_100.png',
      freeShipping: true,
      brand: 'مرسيدس',
      model: 'C-Class',
      year: '2020'
    },
    {
      id: 201,
      name: 'فلتر هواء تويوتا كامري',
      description: 'فلتر هواء أصلي لسيارات تويوتا كامري 2018-2022',
      price: 320,
      oldPrice: 390,
      category: 'فلاتر',
      imageUrl: 'assets/images/image100_100.png',
      freeShipping: false,
      brand: 'تويوتا',
      model: 'كامري',
      year: '2018-2022'
    },
    {
      id: 202,
      name: 'بطارية فارتا AGM 80 أمبير',
      description: 'بطارية ألمانية عالية الأداء مع ضمان 3 سنوات',
      price: 1200,
      oldPrice: 1350,
      category: 'بطاريات',
      imageUrl: 'assets/images/image100_100.png',
      freeShipping: true,
      brand: 'مرسيدس',
      model: 'C-Class',
      year: '2020'
    },
    {
      id: 201,
      name: 'فلتر هواء تويوتا كامري',
      description: 'فلتر هواء أصلي لسيارات تويوتا كامري 2018-2022',
      price: 320,
      oldPrice: 390,
      category: 'فلاتر',
      imageUrl: 'assets/images/image100_100.png',
      freeShipping: false,
      brand: 'تويوتا',
      model: 'كامري',
      year: '2018-2022'
    },
    {
      id: 202,
      name: 'بطارية فارتا AGM 80 أمبير',
      description: 'بطارية ألمانية عالية الأداء مع ضمان 3 سنوات',
      price: 1200,
      oldPrice: 1350,
      category: 'بطاريات',
      imageUrl: 'assets/images/image100_100.png',
      freeShipping: true,
      brand: 'مرسيدس',
      model: 'C-Class',
      year: '2020'
    },
    {
      id: 201,
      name: 'فلتر هواء تويوتا كامري',
      description: 'فلتر هواء أصلي لسيارات تويوتا كامري 2018-2022',
      price: 320,
      oldPrice: 390,
      category: 'فلاتر',
      imageUrl: 'assets/images/image100_100.png',
      freeShipping: false,
      brand: 'تويوتا',
      model: 'كامري',
      year: '2018-2022'
    },
    {
      id: 202,
      name: 'بطارية فارتا AGM 80 أمبير',
      description: 'بطارية ألمانية عالية الأداء مع ضمان 3 سنوات',
      price: 1200,
      oldPrice: 1350,
      category: 'بطاريات',
      imageUrl: 'assets/images/image100_100.png',
      freeShipping: true,
      brand: 'مرسيدس',
      model: 'C-Class',
      year: '2020'
    },
    {
      id: 201,
      name: 'فلتر هواء تويوتا كامري',
      description: 'فلتر هواء أصلي لسيارات تويوتا كامري 2018-2022',
      price: 320,
      oldPrice: 390,
      category: 'فلاتر',
      imageUrl: 'assets/images/image100_100.png',
      freeShipping: false,
      brand: 'تويوتا',
      model: 'كامري',
      year: '2018-2022'
    },
    {
      id: 202,
      name: 'بطارية فارتا AGM 80 أمبير',
      description: 'بطارية ألمانية عالية الأداء مع ضمان 3 سنوات',
      price: 1200,
      oldPrice: 1350,
      category: 'بطاريات',
      imageUrl: 'assets/images/image100_100.png',
      freeShipping: true,
      brand: 'مرسيدس',
      model: 'C-Class',
      year: '2020'
    },
    {
      id: 201,
      name: 'فلتر هواء تويوتا كامري',
      description: 'فلتر هواء أصلي لسيارات تويوتا كامري 2018-2022',
      price: 320,
      oldPrice: 390,
      category: 'فلاتر',
      imageUrl: 'assets/images/image100_100.png',
      freeShipping: false,
      brand: 'تويوتا',
      model: 'كامري',
      year: '2018-2022'
    },
    {
      id: 202,
      name: 'بطارية فارتا AGM 80 أمبير',
      description: 'بطارية ألمانية عالية الأداء مع ضمان 3 سنوات',
      price: 1200,
      oldPrice: 1350,
      category: 'بطاريات',
      imageUrl: 'assets/images/image100_100.png',
      freeShipping: true,
      brand: 'مرسيدس',
      model: 'C-Class',
      year: '2020'
    },
    {
      id: 201,
      name: 'فلتر هواء تويوتا كامري',
      description: 'فلتر هواء أصلي لسيارات تويوتا كامري 2018-2022',
      price: 320,
      oldPrice: 390,
      category: 'فلاتر',
      imageUrl: 'assets/images/image100_100.png',
      freeShipping: false,
      brand: 'تويوتا',
      model: 'كامري',
      year: '2018-2022'
    },
    {
      id: 202,
      name: 'بطارية فارتا AGM 80 أمبير',
      description: 'بطارية ألمانية عالية الأداء مع ضمان 3 سنوات',
      price: 1200,
      oldPrice: 1350,
      category: 'بطاريات',
      imageUrl: 'assets/images/image100_100.png',
      freeShipping: true,
      brand: 'مرسيدس',
      model: 'C-Class',
      year: '2020'
    },
    {
      id: 201,
      name: 'فلتر هواء تويوتا كامري',
      description: 'فلتر هواء أصلي لسيارات تويوتا كامري 2018-2022',
      price: 320,
      oldPrice: 390,
      category: 'فلاتر',
      imageUrl: 'assets/images/image100_100.png',
      freeShipping: false,
      brand: 'تويوتا',
      model: 'كامري',
      year: '2018-2022'
    },
    {
      id: 202,
      name: 'بطارية فارتا AGM 80 أمبير',
      description: 'بطارية ألمانية عالية الأداء مع ضمان 3 سنوات',
      price: 1200,
      oldPrice: 1350,
      category: 'بطاريات',
      imageUrl: 'assets/images/image100_100.png',
      freeShipping: true,
      brand: 'مرسيدس',
      model: 'C-Class',
      year: '2020'
    },
    {
      id: 201,
      name: 'فلتر هواء تويوتا كامري',
      description: 'فلتر هواء أصلي لسيارات تويوتا كامري 2018-2022',
      price: 320,
      oldPrice: 390,
      category: 'فلاتر',
      imageUrl: 'assets/images/image100_100.png',
      freeShipping: false,
      brand: 'تويوتا',
      model: 'كامري',
      year: '2018-2022'
    },
    {
      id: 202,
      name: 'بطارية فارتا AGM 80 أمبير',
      description: 'بطارية ألمانية عالية الأداء مع ضمان 3 سنوات',
      price: 1200,
      oldPrice: 1350,
      category: 'بطاريات',
      imageUrl: 'assets/images/image100_100.png',
      freeShipping: true,
      brand: 'مرسيدس',
      model: 'C-Class',
      year: '2020'
    },
    // يمكن إضافة المزيد من المنتجات بنفس الهيكل
  ];

  filteredProducts: Product[] = [];
  showFilters = true;

  ngOnInit(): void {
    this.filteredProducts = [...this.sellerProducts];
    this.sellerRoundedRating = Math.round(this.seller.rating);
  }

  calculateDiscount(product: Product): number {
    if (product.oldPrice <= product.price) return 0;
    return Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100);
  }

  toggleFilters(): void {
    this.showFilters = !this.showFilters;
  }

  clearFilters(): void {
    this.filters = {};
    this.filteredProducts = [...this.sellerProducts];
  }

  onFilterChange(filterKey: keyof typeof this.filters, value: string): void {
    this.filters[filterKey] = value;
    this.applyFilters();
  }

  applyFilters(): void {
    this.filteredProducts = this.sellerProducts.filter(product => {
      return (!this.filters.brand || product.brand === this.filters.brand) &&
             (!this.filters.model || product.model === this.filters.model) &&
             (!this.filters.year || product.year?.includes(this.filters.year)) &&
             (!this.filters.category || product.category === this.filters.category);
    });
  }

  getModelsForBrand(brand?: string): string[] {
    const brandModels: Record<string, string[]> = {
      'تويوتا': ['كامري', 'كورولا', 'راف4'],
      'هوندا': ['أكورد', 'سيفيك'],
      'بي إم دبليو': ['X5', 'الفئة الثالثة']
    };
    return brand ? brandModels[brand] || [] : [];
  }

 
}
