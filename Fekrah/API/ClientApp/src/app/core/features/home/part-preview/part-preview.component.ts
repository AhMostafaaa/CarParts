import { Component, OnInit, AfterViewInit } from '@angular/core';
import Swiper from 'swiper';

@Component({
  selector: 'app-part-preview',
  templateUrl: './part-preview.component.html',
  styleUrls: ['./part-preview.component.scss']
})
export class PartPreviewComponent implements OnInit, AfterViewInit {
  latestParts = [
    {
      id: 1,
      name: 'بطارية AC Delco',
      price: 950,
      oldPrice: 1200,
      discount: 21,
      condition: 'New',
      sellerName: 'مؤسسة البطاريات',
      sellerId: '1',
      description: 'بطارية قوية تدوم طويلاً مناسبة لجميع أنواع السيارات.',
      imageUrl: 'assets/images/image100_100.png'
    },
    {
      id: 2,
      name: 'فلتر زيت تويوتا',
      price: 160,
      oldPrice: 200,
      discount: 20,
      condition: 'New',
      sellerName: 'مركز الفلاتر الأصلي',
      sellerId: '2',
      description: 'فلتر زيت أصلي لتنقية الزيت لأقصى كفاءة للموتور.',
      imageUrl: 'assets/images/image100_100.png'
    },
    {
      id: 3,
      name: 'بوجيهات NGK',
      price: 385,
      oldPrice: 551,
      discount: 30,
      condition: 'New',
      sellerName: 'محل الكهرباء الحديثة',
      sellerId: '3',
      description: 'بوجيهات أصلية NGK تعطي أداء مميز واحتراق كامل.',
      imageUrl: 'assets/images/image100_100.png'
    },
    {
      id: 4,
      name: 'كشاف أمامي هونداي',
      price: 409,
      oldPrice: 489,
      discount: 16,
      condition: 'New',
      sellerName: 'متجر الإنارة للسيارات',
      sellerId: '4',
      description: 'كشاف عالي الجودة للقيادة الآمنة ليلاً ونهارًا.',
      imageUrl: 'assets/images/image100_100.png'
    },
    {
      id: 5,
      name: 'ردياتير نيسان',
      price: 781,
      oldPrice: 920,
      discount: 15,
      condition: 'New',
      sellerName: 'شركة التبريد الحديثة',
      sellerId: '5',
      description: 'ردياتير تبريد أصلي للسيارات النيسان لتحكم مثالي في الحرارة.',
      imageUrl: 'assets/images/image100_100.png'
    },
    {
      id: 6,
      name: 'طرمبة بنزين',
      price: 368,
      oldPrice: 434,
      discount: 15,
      condition: 'New',
      sellerName: 'ورشة الجودة',
      sellerId: '6',
      description: 'طرمبة بنزين قوية لضخ الوقود بكفاءة وثبات.',
      imageUrl: 'assets/images/image100_100.png'
    },
    {
      id: 7,
      name: 'كمبروسر تكييف',
      price: 947,
      oldPrice: 1354,
      discount: 30,
      condition: 'New',
      sellerName: 'التبريد المركزي',
      sellerId: '7',
      description: 'كمبروسر تبريد عالي الأداء للجو الحار.',
      imageUrl: 'assets/images/image100_100.png'
    },
    {
      id: 8,
      name: 'زيت محرك شل',
      price: 843,
      oldPrice: 1032,
      discount: 18,
      condition: 'New',
      sellerName: 'محل زيوت السيارات',
      sellerId: '8',
      description: 'زيت شل الأصلي لأداء ممتاز للمحرك.',
      imageUrl: 'assets/images/image100_100.png'
    },
    {
      id: 9,
      name: 'مساعدين امامي تويوتا',
      price: 1125,
      oldPrice: 1300,
      discount: 14,
      condition: 'New',
      sellerName: 'العفشة الأصلية',
      sellerId: '9',
      description: 'مساعدين أمامي لتوفير راحة وثبات في القيادة.',
      imageUrl: 'assets/images/image100_100.png'
    },
    {
      id: 10,
      name: 'كمبيوتر السيارة',
      price: 2850,
      oldPrice: 3200,
      discount: 11,
      condition: 'Used',
      sellerName: 'الورشة الإلكترونية',
      sellerId: '10',
      description: 'وحدة تحكم إلكترونية شاملة لكل أنظمة السيارة.',
      imageUrl: 'assets/images/image100_100.png'
    },
    {
      id: 11,
      name: 'فلتر كابينة هيونداي',
      price: 240,
      oldPrice: 300,
      discount: 20,
      condition: 'New',
      sellerName: 'هواء نقي',
      sellerId: '11',
      description: 'فلتر كابينة لتنقية الهواء داخل السيارة.',
      imageUrl: 'assets/images/image100_100.png'
    },
    {
      id: 12,
      name: 'كاوتش بريدجستون',
      price: 1650,
      oldPrice: 1800,
      discount: 8,
      condition: 'New',
      sellerName: 'عجلات المدينة',
      sellerId: '12',
      description: 'كاوتش أصلي من بريدجستون بجودة عالية وثبات.',
      imageUrl: 'assets/images/image100_100.png'
    },
    {
      id: 13,
      name: 'شمعات إضاءة LED',
      price: 320,
      oldPrice: 390,
      discount: 18,
      condition: 'New',
      sellerName: 'إضاءات المستقبل',
      sellerId: '13',
      description: 'شمعات LED عالية الإضاءة وسهلة التركيب.',
      imageUrl: 'assets/images/image100_100.png'
    },
    {
      id: 14,
      name: 'مرايا جانبية نيسان',
      price: 680,
      oldPrice: 750,
      discount: 9,
      condition: 'New',
      sellerName: 'أجزاء الجسم',
      sellerId: '14',
      description: 'مرايا أصلية للسيارات النيسان مع مؤشرات مدمجة.',
      imageUrl: 'assets/images/image100_100.png'
    },
    {
      id: 15,
      name: 'رادياتير مياه هونداي',
      price: 850,
      oldPrice: 920,
      discount: 8,
      condition: 'New',
      sellerName: 'مبردات العرب',
      sellerId: '15',
      description: 'تبريد مثالي للسيارة مع رادياتير عالي الكفاءة.',
      imageUrl: 'assets/images/image100_100.png'
    },
    {
      id: 16,
      name: 'ردياتير تيوتا كورولا',
      price: 830,
      oldPrice: 1000,
      discount: 17,
      condition: 'New',
      sellerName: 'قطع تبريد ممتازة',
      sellerId: '16',
      description: 'ردياتير أصلي مخصص لسيارات كورولا.',
      imageUrl: 'assets/images/image100_100.png'
    },
    {
      id: 17,
      name: 'دينامو شحن',
      price: 900,
      oldPrice: 1100,
      discount: 18,
      condition: 'New',
      sellerName: 'محركات الجودة',
      sellerId: '17',
      description: 'دينامو عالي الأداء لشحن بطارية السيارة بكفاءة.',
      imageUrl: 'assets/images/image100_100.png'
    },
    {
      id: 18,
      name: 'حساس أكسجين',
      price: 441,
      oldPrice: 552,
      discount: 20,
      condition: 'New',
      sellerName: 'القطع الدقيقة',
      sellerId: '18',
      description: 'حساس أكسجين دقيق لتحسين أداء المحرك وتقليل الانبعاثات.',
      imageUrl: 'assets/images/image100_100.png'
    },
    {
      id: 19,
      name: 'لمبة زينون',
      price: 1059,
      oldPrice: 1412,
      discount: 25,
      condition: 'New',
      sellerName: 'زينون برو',
      sellerId: '19',
      description: 'إضاءة زينون فائقة الوضوح والرؤية الليلية.',
      imageUrl: 'assets/images/image100_100.png'
    },
    {
      id: 20,
      name: 'فلتر وقود',
      price: 190,
      oldPrice: 250,
      discount: 24,
      condition: 'New',
      sellerName: 'الفلاتر الحديثة',
      sellerId: '20',
      description: 'فلتر وقود فعال لتنقية البنزين وضمان احتراق مثالي.',
      imageUrl: 'assets/images/image100_100.png'
    }
  ];


  ngOnInit(): void {}

  ngAfterViewInit(): void {
    new Swiper('.latest-parts-swiper', {
      slidesPerView: 5,
      spaceBetween: 30,
      loop: true,
      autoplay: {
        delay: 4000,
        disableOnInteraction: false
      },
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
      speed: 800,
      breakpoints: {
        320: { slidesPerView: 2, spaceBetween: 10 },
        768: { slidesPerView: 3, spaceBetween: 15 },
        1024: { slidesPerView: 5, spaceBetween: 30 }
      }
    });
  }
}
