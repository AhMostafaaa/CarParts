import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-seller-page',
  templateUrl: './seller-page.component.html',
  styleUrls: ['./seller-page.component.scss']
})
export class SellerPageComponent implements OnInit {

  seller: any;
  stars = Array(5).fill(0);

  sellerProducts = [
    {
      id: 201,
      name: 'فلتر هواء تويوتا',
      description: 'فلتر هواء أصلي للسيارات تويوتا.',
      price: 320,
      oldPrice: 390,
      imageUrl: 'assets/images/image100_100.png'
    },
    {
      id: 202,
      name: 'بطارية فارتا ألمانية',
      description: 'بطارية قوية بتقنية AGM تدوم طويلاً.',
      price: 1200,
      oldPrice: 1350,
      imageUrl: 'assets/images/image100_100.png'
    },
    {
      id: 203,
      name: 'ردياتير مياه هيونداي',
      description: 'ردياتير أصلي يوفر تبريد فائق.',
      price: 850,
      oldPrice: 920,
      imageUrl: 'assets/images/image100_100.png'
    },
    // أضف المزيد حسب الحاجة
  ];


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
  }

}
