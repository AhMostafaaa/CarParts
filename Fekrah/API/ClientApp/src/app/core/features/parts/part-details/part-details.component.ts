import { Component, OnInit } from '@angular/core';

interface Comment {
  user: string;
  rating: number;
  text: string;
  date?: Date;
}

interface PartDto {
  id: number;
  name: string;
  description: string;
  price: number;
  condition: string;
  type: string;
  imageUrl: string;
  thumbnails: string[];
  comments: Comment[];
  offers: string[];
  shippingDetails: string;
}

interface RelatedPart {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
}

@Component({
  selector: 'app-part-details',
  templateUrl: './part-details.component.html',
  styleUrls: ['./part-details.component.scss']
})
export class PartDetailsComponent implements OnInit {
  part!: PartDto;
  selectedImage: string = '';
  newComment: string = '';
  newRating: number = 0;
  activeTab: string = 'shipping';
  relatedParts: RelatedPart[] = [];
  
  // إضافة خاصية متوسط التقييم
  get averageRating(): number {
    if (!this.part?.comments || this.part.comments.length === 0) return 0;
    const total = this.part.comments.reduce((sum, comment) => sum + comment.rating, 0);
    return +(total / this.part.comments.length).toFixed(1);
  }

  ngOnInit() {
    // جلب بيانات القطعة (يمكن استبدالها بجلب البيانات من الخادم)
    this.fetchPartDetails();
    
    // جلب المنتجات ذات الصلة
    this.fetchRelatedParts();
  }

  fetchPartDetails() {
    // محاكاة جلب البيانات من واجهة برمجة التطبيقات
    this.part = {
      id: 1,
      name: 'بطارية سيارة فارتا 70 أمبير',
      description: 'بطارية عالية الجودة تدوم طويلاً مناسبة لمعظم السيارات. صناعة ألمانية بمعايير عالمية تضمن الأداء المتميز وعمر طويل بدون صيانة. مثالية للسيارات الحديثة ذات الأنظمة الإلكترونية المتطورة.',
      price: 1350,
      condition: 'جديد',
      type: 'بطاريات',
      imageUrl: '../../assets/images/battery.jpg',
      thumbnails: [
        '../../assets/images/battery.jpg',
        '../../assets/images/battery_side.jpg',
        '../../assets/images/battery_top.jpg'
      ],
      comments: [
        { 
          user: 'أحمد خالد', 
          rating: 4, 
          text: 'ممتازة وخدمة سريعة. استخدمتها لسيارتي منذ شهرين وأداؤها رائع.', 
          date: new Date('2025-04-15') 
        },
        { 
          user: 'محمد علي', 
          rating: 5, 
          text: 'البطارية قوية وأنصح بها. تحملت درجات الحرارة العالية هذا الصيف بدون مشاكل.', 
          date: new Date('2025-04-02') 
        }
      ],
      offers: [
        'خصم 10% عند شراء بطاريتين معًا',
        'شحن مجاني داخل القاهرة الكبرى',
        'كفالة 24 شهر على المنتج'
      ],
      shippingDetails: 'الشحن خلال 2-3 أيام عمل لجميع المحافظات. الإرجاع مجاني خلال 14 يوم بشرط عدم التركيب أو الاستخدام. نقدم خدمة التوصيل والتركيب المجاني داخل القاهرة والجيزة.'
    };
    
    this.selectedImage = this.part.imageUrl;
  }

  fetchRelatedParts() {
    // محاكاة جلب المنتجات ذات الصلة
    this.relatedParts = [
      {
        id: 2,
        name: 'بطارية سيارة بوش 80 أمبير',
        price: 1550,
        imageUrl: '../../assets/images/battery_bosch.jpg'
      },
      {
        id: 3,
        name: 'شاحن بطارية سيارة',
        price: 450,
        imageUrl: '../../assets/images/charger.jpg'
      },
      {
        id: 4,
        name: 'كابلات توصيل بطارية',
        price: 180,
        imageUrl: '../../assets/images/cables.jpg'
      }
    ];
  }

  changeImage(img: string) {
    this.selectedImage = img;
  }

  submitComment() {
    if (this.newComment && this.newRating > 0) {
      this.part.comments.unshift({
        user: 'المستخدم الحالي',
        rating: this.newRating,
        text: this.newComment,
        date: new Date()
      });
      this.newComment = '';
      this.newRating = 0;
      
      // عرض إشعار بنجاح إضافة التقييم
      this.showNotification('تم إضافة تقييمك بنجاح، شكرًا لك!');
    } else {
      // عرض رسالة خطأ إذا كانت البيانات غير مكتملة
      this.showNotification('يرجى إدخال تقييم وتعليق لإكمال العملية', 'error');
    }
  }

  setRating(rating: number) {
    this.newRating = rating;
  }

  setActiveTab(tab: string) {
    this.activeTab = tab;
  }

  viewProduct(productId: number) {
    // التنقل إلى صفحة المنتج المحدد
    console.log(`Navigating to product: ${productId}`);
    // يمكن استبدالها بـ Router.navigate
  }

  contactViaWhatsApp() {
    const message = encodeURIComponent(`أرغب في الاستعلام عن ${this.part.name} (رقم القطعة: ${this.part.id})`);
    window.open(`https://wa.me/201234567890?text=${message}`, '_blank');
  }

  addToCart() {
    // إضافة المنتج إلى سلة التسوق
    // يمكن استبدالها بخدمة سلة التسوق الفعلية
    this.showNotification(`تمت إضافة ${this.part.name} إلى سلة التسوق`);
  }

  // دالة مساعدة لإنشاء مصفوفة النجوم المملوءة
  getStars(rating: number): number[] {
    return Array(Math.floor(rating)).fill(0);
  }

  // دالة مساعدة لإنشاء مصفوفة النجوم الفارغة
  getEmptyStars(rating: number): number[] {
    return Array(5 - Math.floor(rating)).fill(0);
  }

  // دالة لعرض إشعارات للمستخدم
  showNotification(message: string, type: 'success' | 'error' = 'success') {
    // هنا يمكن استبدالها بمكتبة إشعارات حقيقية
    alert(message);
  }
}