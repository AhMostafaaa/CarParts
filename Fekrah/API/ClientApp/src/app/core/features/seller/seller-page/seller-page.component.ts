import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-seller-page',
  templateUrl: './seller-page.component.html',
  styleUrls: ['./seller-page.component.scss']
})
export class SellerPageComponent implements OnInit {

  seller: any;
  stars = Array(5).fill(0);
  categories = ['فلاتر', 'بطاريات', 'زيوت', 'إطارات', 'قطع كهربائية'];

  searchFilters = {
    name: '',
    category: '',
    maxPrice: null
  };

  sellerProducts = [
    {
      id: 201,
      name: 'فلتر هواء تويوتا',
      description: 'فلتر هواء أصلي للسيارات تويوتا.',
      price: 320,
      oldPrice: 390,
      category: 'فلاتر',
      imageUrl: 'assets/images/image100_100.png'
    },
    {
      id: 202,
      name: 'بطارية فارتا ألمانية',
      description: 'بطارية قوية بتقنية AGM تدوم طويلاً.',
      price: 1200,
      oldPrice: 1350,
      category: 'بطاريات',
      imageUrl: 'assets/images/image100_100.png'
    },
    {
      id: 203,
      name: 'ردياتير مياه هيونداي',
      description: 'ردياتير أصلي يوفر تبريد فائق.',
      price: 850,
      oldPrice: 920,
      category: 'قطع كهربائية',
      imageUrl: 'assets/images/image100_100.png'
    },
    // أضف المزيد حسب الحاجة
  ];

  filteredProducts: any[] = [];

  ngOnInit(): void {
    this.seller = {
      name: 'مؤسسة البطاريات',
      rating: 4,
      phone: '201234567890',
      description: 'متخصصون في بيع قطع الغيار الأصلية بأفضل جودة وسعر.',
      reviews: [
        { customer: 'أحمد علي', rating: 5, comment: 'خدمة ممتازة وسرعة في التسليم!' },
        { customer: 'سارة محمد', rating: 4, comment: 'جودة القطع رائعة ولكن السعر عالي قليلاً.' },
        { customer: 'مصطفى فؤاد', rating: 5, comment: 'أوصي بالتعامل معهم بشدة.' },
        { customer: 'نهى خالد', rating: 3, comment: 'كان ممكن يكون التواصل أسرع شوية.' }
      ]
    };
    
    // تهيئة المنتجات المعروضة
    this.filteredProducts = [...this.sellerProducts];
  }

  applyFilters() {
    this.filteredProducts = this.sellerProducts.filter(product => {
      // تصفية حسب الاسم
      const nameMatch = !this.searchFilters.name || 
        product.name.toLowerCase().includes(this.searchFilters.name.toLowerCase());
      
      // تصفية حسب الفئة
      const categoryMatch = !this.searchFilters.category || 
        product.category === this.searchFilters.category;
      
      // تصفية حسب السعر الأقصى
      const priceMatch = !this.searchFilters.maxPrice || 
        product.price <= this.searchFilters.maxPrice;
      
      return nameMatch && categoryMatch && priceMatch;
    });
  }

  resetFilters() {
    this.searchFilters = {
      name: '',
      category: '',
      maxPrice: null
    };
    this.filteredProducts = [...this.sellerProducts];
  }
  
  calculateDiscount(product: any): number {
    if (product.oldPrice <= product.price) return 0;
    const discount = ((product.oldPrice - product.price) / product.oldPrice) * 100;
    return Math.round(discount);
  }
}