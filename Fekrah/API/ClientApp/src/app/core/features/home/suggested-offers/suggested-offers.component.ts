import { AfterViewInit, Component, OnInit } from '@angular/core';
import Swiper from 'swiper';

@Component({
  selector: 'app-suggested-offers',
  templateUrl: './suggested-offers.component.html',
  styleUrls: ['./suggested-offers.component.scss']
})
export class SuggestedOffersComponent implements OnInit, AfterViewInit {
  suggestedParts = [
    {
      id: 109,
      name: 'حساس شكمان مستعمل',
      price: 270,
      oldPrice: 0,
      discount: 0,
      condition: 'Used',
      sellerName: 'ورشة البيئة الذكية',
      sellerId: '110',
      description: 'حساس شكمان أصلي تم اختباره ويعمل بكفاءة.',
      imageUrl: 'assets/images/image100_100.png'
    },
    {
      id: 110,
      name: 'ردياتير مستعمل نيسان',
      price: 520,
      oldPrice: 0,
      discount: 0,
      condition: 'Used',
      sellerName: 'ورشة التبريد العالمية',
      sellerId: '111',
      description: 'ردياتير نيسان نظيف، بدون تسريبات، أداء ممتاز.',
      imageUrl: 'assets/images/image100_100.png'
    },
    {
      id: 111,
      name: 'كارتة كهرباء',
      price: 780,
      oldPrice: 950,
      discount: 18,
      condition: 'New',
      sellerName: 'محل الإلكترونيات الأصلية',
      sellerId: '112',
      description: 'كارتة تشغيل عالية الكفاءة لمعالجة أعطال الكهرباء.',
      imageUrl: 'assets/images/image100_100.png'
    },
    {
      id: 112,
      name: 'فلتر مكيف داخلي',
      price: 130,
      oldPrice: 160,
      discount: 19,
      condition: 'New',
      sellerName: 'تكييف السيارات الحديث',
      sellerId: '113',
      description: 'فلتر داخلي يحافظ على الهواء النقي داخل السيارة.',
      imageUrl: 'assets/images/image100_100.png'
    },
    {
      id: 113,
      name: 'زمارة هواء مستعملة',
      price: 80,
      oldPrice: 0,
      discount: 0,
      condition: 'Used',
      sellerName: 'الصوت العالي لقطع الغيار',
      sellerId: '114',
      description: 'زمارة صوت عالي تعمل بكفاءة وبدون أعطال.',
      imageUrl: 'assets/images/image100_100.png'
    },
    {
      id: 100,
      name: 'فلتر هواء',
      price: 350,
      oldPrice: 0,
      discount: 0,
      condition: 'New',
      sellerName: 'قطع الغيار الممتازة',
      sellerId: '101',
      description: 'فلتر هواء أصلي لأداء محرك مثالي.',
      imageUrl: 'assets/images/image100_100.png'
    },
    {
      id: 101,
      name: 'ردياتير نيسان',
      price: 680,
      oldPrice: 0,
      discount: 0,
      condition: 'New',
      sellerName: 'العفشة العالمية',
      sellerId: '102',
      description: 'ردياتير تبريد عالي الجودة.',
      imageUrl: 'assets/images/image100_100.png'
    },
    {
      id: 102,
      name: 'بطارية فارتا',
      price: 1150,
      oldPrice: 1300,
      discount: 12,
      condition: 'New',
      sellerName: 'مؤسسة البطاريات الحديثة',
      sellerId: '103',
      description: 'بطارية ألمانية قوية تناسب السيارات الأوروبية.',
      imageUrl: 'assets/images/image100_100.png'
    },
    {
      id: 103,
      name: 'كمبيوتر سيارة مستعمل',
      price: 2200,
      oldPrice: 2900,
      discount: 24,
      condition: 'Used',
      sellerName: 'الإلكترونيات الحديثة',
      sellerId: '104',
      description: 'كمبيوتر سيارة بحالة ممتازة مع ضمان لمدة شهر.',
      imageUrl: 'assets/images/image100_100.png'
    },
    {
      id: 104,
      name: 'كمبروسر تكييف مستعمل',
      price: 850,
      oldPrice: 1050,
      discount: 19,
      condition: 'Used',
      sellerName: 'ورشة التبريد الشامل',
      sellerId: '105',
      description: 'كمبروسر تكييف مجدد يعمل بكفاءة.',
      imageUrl: 'assets/images/image100_100.png'
    },
    {
      id: 105,
      name: 'مساعدين أمامي تويوتا',
      price: 950,
      oldPrice: 1150,
      discount: 17,
      condition: 'New',
      sellerName: 'العفشة الأصلية',
      sellerId: '106',
      description: 'مساعدين يوفرون ثبات وراحة أثناء القيادة.',
      imageUrl: 'assets/images/image100_100.png'
    },
    {
      id: 106,
      name: 'كشاف أمامي مستعمل',
      price: 400,
      oldPrice: 0,
      discount: 0,
      condition: 'Used',
      sellerName: 'كهرباء نور الطريق',
      sellerId: '107',
      description: 'كشاف مستعمل نظيف مناسب لهونداي النترا.',
      imageUrl: 'assets/images/image100_100.png'
    },
    {
      id: 107,
      name: 'طرمبة بنزين',
      price: 375,
      oldPrice: 450,
      discount: 17,
      condition: 'New',
      sellerName: 'قطع الوقود الأصلية',
      sellerId: '108',
      description: 'طرمبة قوية تضمن ضخ وقود مستمر للمحرك.',
      imageUrl: 'assets/images/image100_100.png'
    },
    {
      id: 108,
      name: 'فلتر زيت مستعمل بحالة ممتازة',
      price: 90,
      oldPrice: 0,
      discount: 0,
      condition: 'Used',
      sellerName: 'ورشة الصيانة السريعة',
      sellerId: '109',
      description: 'فلتر زيت مستخدم نظيف بسعر اقتصادي.',
      imageUrl: 'assets/images/image100_100.png'
    }
  ];

  pagedParts = this.suggestedParts;

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    new Swiper('.suggested-offers-swiper', {
      slidesPerView: 6,
      spaceBetween: 30,
      centeredSlides: false,
      loop: true,
      autoplay: {
        delay: 4000,
        disableOnInteraction: false
      },
      pagination: {
        el: '.swiper-pagination',
        clickable: true
      },
      breakpoints: {
        320: { slidesPerView: 2, spaceBetween: 10 },
        768: { slidesPerView: 4, spaceBetween: 20 },
        1024: { slidesPerView: 5, spaceBetween: 30 }
      }
    });
  }

  trackByPartId(index: number, part: { id: number }): number {
    return part.id;
  }

  onAddToCart(part: any): void {
    console.log('✅ Add to cart:', part);
  }

  onFavoriteToggled(part: any): void {
    console.log('❤️ Favorite toggled:', part);
  }
}
