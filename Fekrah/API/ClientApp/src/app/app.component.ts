import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';

// إذا لم يتم إنشاء Service بعد، استخدم هذا التعريف المؤقت:
interface UserData {
  isLoggedIn: boolean;
  isMerchant: boolean;
  isDriver: boolean;
  userName: string;
  userAvatar: string;
  userType: 'customer' | 'merchant' | 'driver' | 'admin';
  pendingOrdersCount: number;
  deliveryOrdersCount: number;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'قطع غيار';

  private destroy$ = new Subject<void>();

  // بيانات المستخدم (مؤقتة حتى يتم إنشاء Service)
  userData: UserData = {
    isLoggedIn: false,
    isMerchant: true,
    isDriver: false,
    userName: '',
    userAvatar: '',
    userType: 'customer',
    pendingOrdersCount: 0,
    deliveryOrdersCount: 0
  };

  promoOffers = [
    { id: 1, title: 'خصم خاص على فلاتر الهواء' },
    { id: 2, title: 'عروض بطاريات السيارات - ضمان سنة' },
    { id: 3, title: 'مساعدين بأسعار خاصة لفترة محدودة' },
    { id: 4, title: 'ردياتيرات أصلية بنصف السعر' },
    { id: 5, title: 'قطع غيار كهرباء بخصومات ضخمة' },
    { id: 6, title: 'أكسسوارات أصلية بأفضل الأسعار' },
    { id: 7, title: 'أطقم فرامل بضمان سنتين' }
  ];

  constructor() {}

  ngOnInit(): void {
    // تحميل البيانات من localStorage
    this.loadUserData();

    // تحديث دوري للطلبات
    setInterval(() => {
      this.updateOrdersCounts();
    }, 30000);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  // تحميل بيانات المستخدم
  loadUserData(): void {
    try {
      const authToken = localStorage.getItem('auth_token');
      const userDataStr = localStorage.getItem('user_data');

      if (authToken && userDataStr) {
        const user = JSON.parse(userDataStr);
        this.userData = {
          ...this.userData,
          isLoggedIn: true,
          userName: user.name || 'المستخدم',
          userAvatar: user.avatar || '',
          userType: user.type || 'customer',
          isMerchant: user.type === 'merchant',
          isDriver: user.type === 'driver'
        };

        this.updateOrdersCounts();
      }
    } catch (error) {
      console.error('Error loading user data:', error);
    }
  }

  // تحديث عدد الطلبات
  updateOrdersCounts(): void {
    if (this.userData.isMerchant) {
      const pendingOrders = localStorage.getItem('pending_orders_count');
      this.userData.pendingOrdersCount = pendingOrders ? parseInt(pendingOrders) : 0;
    }

    if (this.userData.isDriver) {
      const deliveryOrders = localStorage.getItem('delivery_orders_count');
      this.userData.deliveryOrdersCount = deliveryOrders ? parseInt(deliveryOrders) : 0;
    }
  }

  // وظائف للتجربة
  debugSimulateMerchant(): void {
    const mockUser = {
      id: '1',
      name: 'محمد التاجر',
      email: 'merchant@example.com',
      type: 'merchant',
      avatar: ''
    };

    localStorage.setItem('auth_token', 'mock_token_' + Date.now());
    localStorage.setItem('user_data', JSON.stringify(mockUser));
    localStorage.setItem('pending_orders_count', '5');

    this.loadUserData();
    console.log('تم محاكاة تسجيل دخول تاجر');
  }

  debugSimulateDriver(): void {
    const mockUser = {
      id: '2',
      name: 'أحمد المراسل',
      email: 'driver@example.com',
      type: 'driver',
      avatar: ''
    };

    localStorage.setItem('auth_token', 'mock_token_' + Date.now());
    localStorage.setItem('user_data', JSON.stringify(mockUser));
    localStorage.setItem('delivery_orders_count', '3');

    this.loadUserData();
    console.log('تم محاكاة تسجيل دخول مراسل');
  }

  debugAddOrder(): void {
    if (this.userData.isMerchant) {
      this.userData.pendingOrdersCount += 1;
      localStorage.setItem('pending_orders_count', this.userData.pendingOrdersCount.toString());
      console.log('تم إضافة طلب جديد:', this.userData.pendingOrdersCount);
    }
  }

  debugAddDelivery(): void {
    if (this.userData.isDriver) {
      this.userData.deliveryOrdersCount += 1;
      localStorage.setItem('delivery_orders_count', this.userData.deliveryOrdersCount.toString());
      console.log('تم إضافة طلب توصيل:', this.userData.deliveryOrdersCount);
    }
  }

  debugLogout(): void {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user_data');
    localStorage.removeItem('pending_orders_count');
    localStorage.removeItem('delivery_orders_count');

    this.userData = {
      isLoggedIn: false,
      isMerchant: false,
      isDriver: false,
      userName: '',
      userAvatar: '',
      userType: 'customer',
      pendingOrdersCount: 0,
      deliveryOrdersCount: 0
    };

    console.log('تم تسجيل الخروج');
  }
}
