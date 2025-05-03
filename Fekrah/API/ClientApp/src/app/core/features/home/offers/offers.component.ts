import { AfterViewInit, Component, OnInit } from '@angular/core';
import Swiper from 'swiper';

@Component({
  selector: 'app-offers',
  templateUrl: './offers.component.html',
  styleUrls: ['./offers.component.scss']
})
export class OffersComponent implements OnInit, AfterViewInit {

  bestOffers: any[] = [];

  constructor() { }

  ngOnInit(): void {
    this.bestOffers = [
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
      }
    ];








  }
  ngAfterViewInit(): void {
    new Swiper('.offers-swiper', {
      slidesPerView: 6,
      spaceBetween: 30,
      loop: true,
      autoplay: {
        delay: 4000,
        disableOnInteraction: true,
        reverseDirection: true, // ✅ الحركة من اليمين لليسار
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
      speed: 800,
      breakpoints: {
        320: {
          slidesPerView: 2,
          spaceBetween: 10,
        },
        768: {
          slidesPerView: 4,
          spaceBetween: 20,
        },
        1024: {
          slidesPerView: 5,
          spaceBetween: 30,
        },
      }
    });
  }




}
