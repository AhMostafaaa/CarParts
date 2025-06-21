import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, interval, takeUntil } from 'rxjs';

// Interface للطلبات
interface OrderItem {
  id: string;
  productName: string;
  quantity: number;
  price: number;
  image: string;
}

interface Order {
  id: string;
  orderNumber: string;
  customerName: string;
  customerPhone: string;
  customerAddress: string;
  items: OrderItem[];
  totalAmount: number;
  status: 'pending' | 'confirmed' | 'preparing' | 'ready' | 'delivering' | 'delivered' | 'cancelled';
  orderDate: Date;
  estimatedDelivery?: Date;
  notes?: string;
  paymentMethod: 'cash' | 'card' | 'online';
  deliveryFee: number;
}

@Component({
  selector: 'app-merchant-orders',
  templateUrl: './merchant-orders.component.html',
  styleUrls: ['./merchant-orders.component.scss']
})
export class MerchantOrdersComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();

  // بيانات الطلبات
  allOrders: Order[] = [];
  filteredOrders: Order[] = [];

  // إعدادات التصفية
  selectedStatus: string = 'all';
  searchTerm: string = '';
  selectedDate: string = '';

  // إحصائيات
  stats = {
    total: 0,
    pending: 0,
    confirmed: 0,
    delivered: 0,
    cancelled: 0,
    todayRevenue: 0,
    weekRevenue: 0
  };

  // حالات الطلبات
  orderStatuses = [
    { value: 'all', label: 'جميع الطلبات', color: '#6c757d', icon: 'fas fa-list' },
    { value: 'pending', label: 'في الانتظار', color: '#ffc107', icon: 'fas fa-clock' },
    { value: 'confirmed', label: 'مؤكد', color: '#17a2b8', icon: 'fas fa-check' },
    { value: 'preparing', label: 'قيد التحضير', color: '#007bff', icon: 'fas fa-cog' },
    { value: 'ready', label: 'جاهز للتسليم', color: '#28a745', icon: 'fas fa-box' },
    { value: 'delivering', label: 'في الطريق', color: '#fd7e14', icon: 'fas fa-truck' },
    { value: 'delivered', label: 'تم التسليم', color: '#198754', icon: 'fas fa-check-circle' },
    { value: 'cancelled', label: 'ملغي', color: '#dc3545', icon: 'fas fa-times-circle' }
  ];

  // عرض التفاصيل
  selectedOrder: Order | null = null;
  showOrderDetails = false;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.loadOrders();
    this.calculateStats();

    // تحديث الطلبات كل 30 ثانية
    interval(30000).pipe(takeUntil(this.destroy$)).subscribe(() => {
      this.loadOrders();
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }


  // تحميل الطلبات (محاكاة)
  loadOrders(): void {
    // في التطبيق الحقيقي، هذه ستكون API call
    this.allOrders = this.generateMockOrders();
    this.applyFilters();
    this.calculateStats();
  }

  // إنشاء طلبات تجريبية
  generateMockOrders(): Order[] {
    const mockOrders: Order[] = [
      {
        id: '1',
        orderNumber: 'ORD-2025-001',
        customerName: 'أحمد محمد',
        customerPhone: '01234567890',
        customerAddress: 'شارع النيل، المعادي، القاهرة',
        items: [
          {
            id: '1',
            productName: 'فلتر هواء تويوتا كامري',
            quantity: 2,
            price: 150,
            image: 'assets/parts/air-filter.jpg'
          },
          {
            id: '2',
            productName: 'زيت موتور موبيل 1',
            quantity: 1,
            price: 280,
            image: 'assets/parts/engine-oil.jpg'
          }
        ],
        totalAmount: 580,
        status: 'pending',
        orderDate: new Date(),
        paymentMethod: 'cash',
        deliveryFee: 50,
        notes: 'التسليم بعد الساعة 2 ظهراً'
      },
      {
        id: '2',
        orderNumber: 'ORD-2025-002',
        customerName: 'سارة أحمد',
        customerPhone: '01123456789',
        customerAddress: 'شارع التحرير، وسط البلد، القاهرة',
        items: [
          {
            id: '3',
            productName: 'اطارات ميشلين 195/65R15',
            quantity: 4,
            price: 800,
            image: 'assets/parts/tires.jpg'
          }
        ],
        totalAmount: 3200,
        status: 'confirmed',
        orderDate: new Date(Date.now() - 1000 * 60 * 30), // منذ 30 دقيقة
        paymentMethod: 'card',
        deliveryFee: 100
      },
      {
        id: '3',
        orderNumber: 'ORD-2025-003',
        customerName: 'محمد عبدالله',
        customerPhone: '01012345678',
        customerAddress: 'شارع الهرم، الجيزة',
        items: [
          {
            id: '4',
            productName: 'بطارية السيارة 70 أمبير',
            quantity: 1,
            price: 450,
            image: 'assets/parts/battery.jpg'
          },
          {
            id: '5',
            productName: 'لمبات LED للمصابيح الأمامية',
            quantity: 2,
            price: 120,
            image: 'assets/parts/led-lights.jpg'
          }
        ],
        totalAmount: 690,
        status: 'ready',
        orderDate: new Date(Date.now() - 1000 * 60 * 60 * 2), // منذ ساعتين
        paymentMethod: 'online',
        deliveryFee: 60
      }
    ];

    return mockOrders;
  }

  // تطبيق الفلاتر
  applyFilters(): void {
    this.filteredOrders = this.allOrders.filter(order => {
      // فلتر حسب الحالة
      const statusMatch = this.selectedStatus === 'all' || order.status === this.selectedStatus;

      // فلتر حسب البحث
      const searchMatch = !this.searchTerm ||
        order.customerName.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        order.orderNumber.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        order.customerPhone.includes(this.searchTerm);

      // فلتر حسب التاريخ
      const dateMatch = !this.selectedDate ||
        order.orderDate.toDateString() === new Date(this.selectedDate).toDateString();

      return statusMatch && searchMatch && dateMatch;
    });
  }

  // حساب الإحصائيات
  calculateStats(): void {
    this.stats.total = this.allOrders.length;
    this.stats.pending = this.allOrders.filter(o => o.status === 'pending').length;
    this.stats.confirmed = this.allOrders.filter(o => o.status === 'confirmed').length;
    this.stats.delivered = this.allOrders.filter(o => o.status === 'delivered').length;
    this.stats.cancelled = this.allOrders.filter(o => o.status === 'cancelled').length;

    // حساب الإيرادات
    const today = new Date().toDateString();
    const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);

    this.stats.todayRevenue = this.allOrders
      .filter(o => o.orderDate.toDateString() === today && o.status === 'delivered')
      .reduce((sum, o) => sum + o.totalAmount, 0);

    this.stats.weekRevenue = this.allOrders
      .filter(o => o.orderDate >= weekAgo && o.status === 'delivered')
      .reduce((sum, o) => sum + o.totalAmount, 0);
  }

  // تغيير حالة الطلب
  updateOrderStatus(orderId: string, newStatus: string): void {
    const order = this.allOrders.find(o => o.id === orderId);
    if (order) {
      order.status = newStatus as any;

      // تحديث localStorage للمحاكاة
      localStorage.setItem('merchant_orders', JSON.stringify(this.allOrders));

      this.applyFilters();
      this.calculateStats();

      // إشعار نجاح
      console.log(`تم تحديث حالة الطلب ${order.orderNumber} إلى ${newStatus}`);
    }
  }

  // عرض تفاصيل الطلب
  viewOrderDetails(order: Order): void {
    this.selectedOrder = order;
    this.showOrderDetails = true;
  }

  // إغلاق تفاصيل الطلب
  closeOrderDetails(): void {
    this.showOrderDetails = false;
    this.selectedOrder = null;
  }

  // طباعة الطلب
  printOrder(order: Order): void {
    console.log('طباعة الطلب:', order.orderNumber);
    // هنا يمكن إضافة منطق الطباعة
  }

  // الحصول على لون الحالة
  getStatusColor(status: string): string {
    const statusObj = this.orderStatuses.find(s => s.value === status);
    return statusObj?.color || '#6c757d';
  }

  // الحصول على أيقونة الحالة
  getStatusIcon(status: string): string {
    const statusObj = this.orderStatuses.find(s => s.value === status);
    return statusObj?.icon || 'fas fa-question';
  }

  // الحصول على تسمية الحالة
  getStatusLabel(status: string): string {
    const statusObj = this.orderStatuses.find(s => s.value === status);
    return statusObj?.label || status;
  }

  // تصدير الطلبات
  exportOrders(): void {
    const csvContent = this.generateCSV();
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `orders_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  // إنشاء CSV
  generateCSV(): string {
    const headers = ['رقم الطلب', 'اسم العميل', 'التليفون', 'المبلغ الإجمالي', 'الحالة', 'تاريخ الطلب'];
    const rows = this.filteredOrders.map(order => [
      order.orderNumber,
      order.customerName,
      order.customerPhone,
      order.totalAmount.toString(),
      this.getStatusLabel(order.status),
      order.orderDate.toLocaleDateString('ar-EG')
    ]);

    return [headers, ...rows].map(row => row.join(',')).join('\n');
  }

  // الانتقال لإضافة منتج جديد
  goToAddProduct(): void {
    this.router.navigate(['/merchant/products/add']);
  }

  // الانتقال لإعدادات المتجر
  goToSettings(): void {
    this.router.navigate(['/merchant/settings']);
  }

  // تحديث الفلاتر عند التغيير
  onFilterChange(): void {
    this.applyFilters();
  }

  // إعادة تعيين الفلاتر
  resetFilters(): void {
    this.selectedStatus = 'all';
    this.searchTerm = '';
    this.selectedDate = '';
    this.applyFilters();
  }
}
