import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, interval, takeUntil } from 'rxjs';

export interface OrderItem {
  id: string;
  productName: string;
  quantity: number;
  price: number;
  image: string;
  category?: string;
  brand?: string;
  model?: string;
  warranty?: string;
  availability?: 'available' | 'limited' | 'out_of_stock';
}

export interface Order {
  id: string;
  orderNumber: string;
  customerName: string;
  customerPhone: string;
  customerAddress: string;
  customerEmail?: string;
  items: OrderItem[];
  totalAmount: number;
  status: 'pending' | 'confirmed' | 'preparing' | 'ready' | 'delivering' | 'delivered' | 'cancelled';
  orderDate: Date;
  estimatedDelivery?: Date;
  notes?: string;
  paymentMethod: 'cash' | 'card' | 'online';
  deliveryFee: number;
  discount?: number;
  trackingNumber?: string;
  lastUpdated?: Date;
  merchantNotes?: string;
  priority?: 'high' | 'medium' | 'low';
  customerType?: 'new' | 'regular' | 'vip';
}

export interface OrderStats {
  total: number;
  pending: number;
  confirmed: number;
  preparing: number;
  ready: number;
  delivering: number;
  delivered: number;
  cancelled: number;
  todayRevenue: number;
  weekRevenue: number;
  monthRevenue: number;
  averageOrderValue: number;
}

export interface StatusConfig {
  value: string;
  label: string;
  color: string;
  icon: string;
  nextActions?: string[];
}

export type OrderStatus = 'pending' | 'confirmed' | 'preparing' | 'ready' | 'delivering' | 'delivered' | 'cancelled';
export type PaymentMethod = 'cash' | 'card' | 'online';
export type CustomerType = 'new' | 'regular' | 'vip';
export type OrderPriority = 'high' | 'medium' | 'low';
export type ProductAvailability = 'available' | 'limited' | 'out_of_stock';

@Component({
  selector: 'app-merchant-orders',
  templateUrl: './merchant-orders.component.html',
  styleUrls: ['./merchant-orders.component.scss']
})
// export class MerchantOrdersComponent implements OnInit, OnDestroy {
//   private destroy$ = new Subject<void>();

//   // بيانات الطلبات
//   allOrders: Order[] = [];
//   filteredOrders: Order[] = [];

//   // إعدادات التصفية والبحث
//   selectedStatus: string = 'all';
//   searchTerm: string = '';
//   selectedDate: string = '';
//   selectedPriority: string = 'all';
//   sortBy: 'date' | 'amount' | 'customer' = 'date';
//   sortDirection: 'asc' | 'desc' = 'desc';

//   // إحصائيات محسّنة
//   stats: OrderStats = {
//     total: 0,
//     pending: 0,
//     confirmed: 0,
//     preparing: 0,
//     ready: 0,
//     delivering: 0,
//     delivered: 0,
//     cancelled: 0,
//     todayRevenue: 0,
//     weekRevenue: 0,
//     monthRevenue: 0,
//     averageOrderValue: 0
//   };

//   // حالات الطلبات المحسّنة
//   orderStatuses: StatusConfig[] = [
//     { 
//       value: 'all', 
//       label: 'جميع الطلبات', 
//       color: '#6c757d', 
//       icon: 'fas fa-list' 
//     },
//     { 
//       value: 'pending', 
//       label: 'في الانتظار', 
//       color: '#ffc107', 
//       icon: 'fas fa-clock',
//       nextActions: ['confirmed', 'cancelled']
//     },
//     { 
//       value: 'confirmed', 
//       label: 'مؤكد', 
//       color: '#17a2b8', 
//       icon: 'fas fa-check',
//       nextActions: ['preparing', 'cancelled']
//     },
//     { 
//       value: 'preparing', 
//       label: 'قيد التحضير', 
//       color: '#007bff', 
//       icon: 'fas fa-cog',
//       nextActions: ['ready', 'cancelled']
//     },
//     { 
//       value: 'ready', 
//       label: 'جاهز للتسليم', 
//       color: '#28a745', 
//       icon: 'fas fa-box',
//       nextActions: ['delivering']
//     },
//     { 
//       value: 'delivering', 
//       label: 'في الطريق', 
//       color: '#fd7e14', 
//       icon: 'fas fa-truck',
//       nextActions: ['delivered']
//     },
//     { 
//       value: 'delivered', 
//       label: 'تم التسليم', 
//       color: '#198754', 
//       icon: 'fas fa-check-circle',
//       nextActions: []
//     },
//     { 
//       value: 'cancelled', 
//       label: 'ملغي', 
//       color: '#dc3545', 
//       icon: 'fas fa-times-circle',
//       nextActions: []
//     }
//   ];

//   // عرض التفاصيل
//   selectedOrder: Order | null = null;
//   showOrderDetails = false;

//   // حالة التحميل والأخطاء
//   isLoading = false;
//   error: string | null = null;

//   // إعدادات الصفحة
//   pageSize = 10;
//   currentPage = 1;
//   totalPages = 1;

//   constructor(private router: Router) { }

//   ngOnInit(): void {
//     this.initializeComponent();
//   }

//   ngOnDestroy(): void {
//     this.destroy$.next();
//     this.destroy$.complete();
//   }

//   // تهيئة المكون
//   private initializeComponent(): void {
//     this.loadOrders();
//     this.calculateStats();
//     this.startAutoRefresh();
//     this.loadUserPreferences();
//   }

//   // تحميل الطلبات
//   loadOrders(): void {
//     this.isLoading = true;
//     this.error = null;

//     try {
//       // في التطبيق الحقيقي، هذه ستكون API call
//       this.allOrders = this.generateEnhancedMockOrders();
//       this.applyFiltersAndSort();
//       this.calculateStats();
//       this.updatePagination();
//     } catch (error) {
//       this.error = 'حدث خطأ في تحميل الطلبات';
//       console.error('Error loading orders:', error);
//     } finally {
//       this.isLoading = false;
//     }
//   }

//   // إنشاء طلبات تجريبية محسّنة
//   generateEnhancedMockOrders(): Order[] {
//     const mockOrders: Order[] = [
//       {
//         id: '1',
//         orderNumber: 'ORD-2025-001',
//         customerName: 'أحمد محمد علي',
//         customerPhone: '01234567890',
//         customerEmail: 'ahmed@example.com',
//         customerAddress: 'شارع النيل، المعادي، القاهرة',
//         items: [
//           {
//             id: '1',
//             productName: 'فلتر هواء تويوتا كامري',
//             quantity: 2,
//             price: 150,
//             image: 'https://via.placeholder.com/100',
//             category: 'فلاتر',
//             brand: 'تويوتا',
//             model: 'كامري 2020-2023',
//             warranty: '6 شهور',
//             availability: 'available'
//           },
//           {
//             id: '2',
//             productName: 'زيت موتور موبيل 1',
//             quantity: 1,
//             price: 280,
//             image: 'https://via.placeholder.com/100',
//             category: 'زيوت',
//             brand: 'Mobil',
//             model: '5W-30',
//             warranty: '12 شهر',
//             availability: 'available'
//           }
//         ],
//         totalAmount: 580,
//         status: 'pending',
//         orderDate: new Date(),
//         estimatedDelivery: new Date(Date.now() + 24 * 60 * 60 * 1000),
//         paymentMethod: 'cash',
//         deliveryFee: 50,
//         notes: 'التسليم بعد الساعة 2 ظهراً',
//         trackingNumber: 'TRK-001-2025',
//         lastUpdated: new Date(),
//         priority: 'medium',
//         customerType: 'regular'
//       },
//       {
//         id: '2',
//         orderNumber: 'ORD-2025-002',
//         customerName: 'سارة أحمد محمود',
//         customerPhone: '01123456789',
//         customerEmail: 'sara@example.com',
//         customerAddress: 'شارع التحرير، وسط البلد، القاهرة',
//         items: [
//           {
//             id: '3',
//             productName: 'إطارات ميشلين 195/65R15',
//             quantity: 4,
//             price: 800,
//             image: 'https://via.placeholder.com/100',
//             category: 'إطارات',
//             brand: 'Michelin',
//             model: 'Energy Saver',
//             warranty: '24 شهر',
//             availability: 'limited'
//           }
//         ],
//         totalAmount: 3300,
//         status: 'confirmed',
//         orderDate: new Date(Date.now() - 1000 * 60 * 30),
//         estimatedDelivery: new Date(Date.now() + 48 * 60 * 60 * 1000),
//         paymentMethod: 'card',
//         deliveryFee: 100,
//         notes: 'عميل مهم - أولوية عالية',
//         trackingNumber: 'TRK-002-2025',
//         lastUpdated: new Date(Date.now() - 1000 * 60 * 15),
//         priority: 'high',
//         customerType: 'vip'
//       },
//       {
//         id: '3',
//         orderNumber: 'ORD-2025-003',
//         customerName: 'محمد عبدالله حسن',
//         customerPhone: '01012345678',
//         customerEmail: 'mohamed@example.com',
//         customerAddress: 'شارع الهرم، الجيزة',
//         items: [
//           {
//             id: '4',
//             productName: 'بطارية السيارة 70 أمبير',
//             quantity: 1,
//             price: 450,
//             image: 'https://via.placeholder.com/100',
//             category: 'كهرباء',
//             brand: 'Varta',
//             model: 'Blue Dynamic',
//             warranty: '12 شهر',
//             availability: 'available'
//           },
//           {
//             id: '5',
//             productName: 'لمبات LED للمصابيح الأمامية',
//             quantity: 2,
//             price: 120,
//             image: 'https://via.placeholder.com/100',
//             category: 'إضاءة',
//             brand: 'Philips',
//             model: 'X-tremeUltinon',
//             warranty: '6 شهور',
//             availability: 'available'
//           }
//         ],
//         totalAmount: 750,
//         status: 'ready',
//         orderDate: new Date(Date.now() - 1000 * 60 * 60 * 2),
//         estimatedDelivery: new Date(Date.now() + 6 * 60 * 60 * 1000),
//         paymentMethod: 'online',
//         deliveryFee: 60,
//         notes: 'طلب سريع - نفس اليوم',
//         trackingNumber: 'TRK-003-2025',
//         lastUpdated: new Date(Date.now() - 1000 * 60 * 30),
//         priority: 'low',
//         customerType: 'new'
//       },
//       {
//         id: '4',
//         orderNumber: 'ORD-2025-004',
//         customerName: 'فاطمة السيد',
//         customerPhone: '01555666777',
//         customerEmail: 'fatima@example.com',
//         customerAddress: 'مدينة نصر، القاهرة',
//         items: [
//           {
//             id: '6',
//             productName: 'فرامل أمامية تويوتا',
//             quantity: 1,
//             price: 320,
//             image: 'https://via.placeholder.com/100',
//             category: 'فرامل',
//             brand: 'تويوتا',
//             model: 'أصلي',
//             warranty: '18 شهر',
//             availability: 'available'
//           }
//         ],
//         totalAmount: 370,
//         status: 'delivering',
//         orderDate: new Date(Date.now() - 1000 * 60 * 60 * 4),
//         estimatedDelivery: new Date(Date.now() + 2 * 60 * 60 * 1000),
//         paymentMethod: 'cash',
//         deliveryFee: 50,
//         notes: 'في الطريق - سيصل خلال ساعتين',
//         trackingNumber: 'TRK-004-2025',
//         lastUpdated: new Date(Date.now() - 1000 * 60 * 10),
//         priority: 'medium',
//         customerType: 'regular'
//       },
//       {
//         id: '5',
//         orderNumber: 'ORD-2025-005',
//         customerName: 'خالد يوسف',
//         customerPhone: '01777888999',
//         customerEmail: 'khaled@example.com',
//         customerAddress: 'الإسكندرية',
//         items: [
//           {
//             id: '7',
//             productName: 'كشافات ضباب LED',
//             quantity: 2,
//             price: 180,
//             image: 'https://via.placeholder.com/100',
//             category: 'إضاءة',
//             brand: 'Osram',
//             model: 'LEDriving',
//             warranty: '24 شهر',
//             availability: 'available'
//           }
//         ],
//         totalAmount: 430,
//         status: 'delivered',
//         orderDate: new Date(Date.now() - 1000 * 60 * 60 * 24),
//         estimatedDelivery: new Date(Date.now() - 1000 * 60 * 60 * 2),
//         paymentMethod: 'online',
//         deliveryFee: 70,
//         notes: 'تم التسليم بنجاح',
//         trackingNumber: 'TRK-005-2025',
//         lastUpdated: new Date(Date.now() - 1000 * 60 * 60 * 2),
//         priority: 'low',
//         customerType: 'new'
//       }
//     ];

//     return mockOrders;
//   }

//   // تطبيق الفلاتر والترتيب
//   applyFiltersAndSort(): void {
//     let filtered = [...this.allOrders];

//     // فلتر حسب الحالة
//     if (this.selectedStatus !== 'all') {
//       filtered = filtered.filter(order => order.status === this.selectedStatus);
//     }

//     // فلتر حسب الأولوية
//     if (this.selectedPriority !== 'all') {
//       filtered = filtered.filter(order => order.priority === this.selectedPriority);
//     }

//     // فلتر حسب البحث
//     if (this.searchTerm) {
//       const searchLower = this.searchTerm.toLowerCase();
//       filtered = filtered.filter(order =>
//         order.customerName.toLowerCase().includes(searchLower) ||
//         order.orderNumber.toLowerCase().includes(searchLower) ||
//         order.customerPhone.includes(this.searchTerm) ||
//         order.trackingNumber?.toLowerCase().includes(searchLower) ||
//         order.items.some(item => item.productName.toLowerCase().includes(searchLower))
//       );
//     }

//     // فلتر حسب التاريخ
//     if (this.selectedDate) {
//       const selectedDate = new Date(this.selectedDate);
//       filtered = filtered.filter(order =>
//         order.orderDate.toDateString() === selectedDate.toDateString()
//       );
//     }

//     // ترتيب النتائج
//     filtered.sort((a, b) => {
//       let comparison = 0;

//       switch (this.sortBy) {
//         case 'date':
//           comparison = a.orderDate.getTime() - b.orderDate.getTime();
//           break;
//         case 'amount':
//           comparison = a.totalAmount - b.totalAmount;
//           break;
//         case 'customer':
//           comparison = a.customerName.localeCompare(b.customerName, 'ar');
//           break;
//       }

//       return this.sortDirection === 'desc' ? -comparison : comparison;
//     });

//     this.filteredOrders = filtered;
//   }

//   // حساب الإحصائيات المحسّنة
//   calculateStats(): void {
//     const orders = this.allOrders;
    
//     this.stats.total = orders.length;
//     this.stats.pending = orders.filter(o => o.status === 'pending').length;
//     this.stats.confirmed = orders.filter(o => o.status === 'confirmed').length;
//     this.stats.preparing = orders.filter(o => o.status === 'preparing').length;
//     this.stats.ready = orders.filter(o => o.status === 'ready').length;
//     this.stats.delivering = orders.filter(o => o.status === 'delivering').length;
//     this.stats.delivered = orders.filter(o => o.status === 'delivered').length;
//     this.stats.cancelled = orders.filter(o => o.status === 'cancelled').length;

//     // حساب الإيرادات
//     const today = new Date();
//     const todayStart = new Date(today.getFullYear(), today.getMonth(), today.getDate());
//     const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
//     const monthAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);

//     const deliveredOrders = orders.filter(o => o.status === 'delivered');

//     this.stats.todayRevenue = deliveredOrders
//       .filter(o => o.orderDate >= todayStart)
//       .reduce((sum, o) => sum + o.totalAmount, 0);

//     this.stats.weekRevenue = deliveredOrders
//       .filter(o => o.orderDate >= weekAgo)
//       .reduce((sum, o) => sum + o.totalAmount, 0);

//     this.stats.monthRevenue = deliveredOrders
//       .filter(o => o.orderDate >= monthAgo)
//       .reduce((sum, o) => sum + o.totalAmount, 0);

//     this.stats.averageOrderValue = orders.length > 0 
//       ? orders.reduce((sum, o) => sum + o.totalAmount, 0) / orders.length 
//       : 0;
//   }

//   // تحديث الترقيم
//   updatePagination(): void {
//     this.totalPages = Math.ceil(this.filteredOrders.length / this.pageSize);
//     if (this.currentPage > this.totalPages) {
//       this.currentPage = 1;
//     }
//   }

//   // بدء التحديث التلقائي
//   startAutoRefresh(): void {
//     interval(30000)
//       .pipe(takeUntil(this.destroy$))
//       .subscribe(() => {
//         this.loadOrders();
//       });
//   }

//   // تحميل تفضيلات المستخدم
//   loadUserPreferences(): void {
//     const preferences = localStorage.getItem('merchantOrdersPreferences');
//     if (preferences) {
//       try {
//         const prefs = JSON.parse(preferences);
//         this.pageSize = prefs.pageSize || 10;
//         this.sortBy = prefs.sortBy || 'date';
//         this.sortDirection = prefs.sortDirection || 'desc';
//       } catch (error) {
//         console.warn('Failed to load user preferences:', error);
//       }
//     }
//   }

//   // حفظ تفضيلات المستخدم
//   saveUserPreferences(): void {
//     const preferences = {
//       pageSize: this.pageSize,
//       sortBy: this.sortBy,
//       sortDirection: this.sortDirection
//     };
//     localStorage.setItem('merchantOrdersPreferences', JSON.stringify(preferences));
//   }

//   // تحديث حالة الطلب
//   updateOrderStatus(orderId: string, newStatus: string): void {
//     const order = this.allOrders.find(o => o.id === orderId);
//     if (!order) return;

//     // التحقق من صحة التحديث
//     if (!this.isValidStatusTransition(order.status, newStatus)) {
//       this.showError('لا يمكن تحديث الحالة من ' + this.getStatusLabel(order.status) + ' إلى ' + this.getStatusLabel(newStatus));
//       return;
//     }

//     const oldStatus = order.status;
//     order.status = newStatus as Order['status'];
//     order.lastUpdated = new Date();

//     // تحديث الموعد المتوقع للتسليم حسب الحالة
//     this.updateEstimatedDelivery(order, newStatus);

//     // حفظ في التخزين المحلي للمحاكاة
//     this.saveOrdersToStorage();

//     // إعادة حساب الإحصائيات والفلاتر
//     this.applyFiltersAndSort();
//     this.calculateStats();

//     // إشعار النجاح
//     this.showSuccess(`تم تحديث حالة الطلب ${order.orderNumber} من ${this.getStatusLabel(oldStatus)} إلى ${this.getStatusLabel(newStatus)}`);

//     // تحديث الطلب المحدد إذا كان مفتوحاً
//     if (this.selectedOrder && this.selectedOrder.id === orderId) {
//       this.selectedOrder = { ...order };
//     }
//   }

//   // التحقق من صحة انتقال الحالة
//   isValidStatusTransition(currentStatus: string, newStatus: string): boolean {
//     const statusConfig = this.orderStatuses.find(s => s.value === currentStatus);
//     return statusConfig?.nextActions?.includes(newStatus) || 
//            ['cancelled'].includes(newStatus) || // يمكن الإلغاء من أي حالة
//            currentStatus === newStatus; // نفس الحالة
//   }

//   // تحديث الموعد المتوقع للتسليم
//   updateEstimatedDelivery(order: Order, status: string): void {
//     const now = new Date();
    
//     switch (status) {
//       case 'confirmed':
//         order.estimatedDelivery = new Date(now.getTime() + 24 * 60 * 60 * 1000); // يوم واحد
//         break;
//       case 'preparing':
//         order.estimatedDelivery = new Date(now.getTime() + 12 * 60 * 60 * 1000); // 12 ساعة
//         break;
//       case 'ready':
//         order.estimatedDelivery = new Date(now.getTime() + 6 * 60 * 60 * 1000); // 6 ساعات
//         break;
//       case 'delivering':
//         order.estimatedDelivery = new Date(now.getTime() + 2 * 60 * 60 * 1000); // ساعتان
//         break;
//       case 'delivered':
//         order.estimatedDelivery = now; // تم التسليم الآن
//         break;
//     }
//   }

//   // حفظ الطلبات في التخزين المحلي
//   saveOrdersToStorage(): void {
//     localStorage.setItem('merchant_orders', JSON.stringify(this.allOrders));
//   }

//   // عرض تفاصيل الطلب
//   viewOrderDetails(order: Order): void {
//     this.selectedOrder = { ...order }; // نسخة للتأكد من عدم التأثير على البيانات الأصلية
//     this.showOrderDetails = true;
//   }

//   // إغلاق تفاصيل الطلب
//   closeOrderDetails(): void {
//     this.showOrderDetails = false;
//     this.selectedOrder = null;
//   }

//   // معالجة أحداث تفاصيل الطلب
//   onCloseDetails(): void {
//     this.closeOrderDetails();
//   }

//   onStatusUpdate(event: { orderId: string, newStatus: string }): void {
//     this.updateOrderStatus(event.orderId, event.newStatus);
//   }

//   onOrderPrint(order: Order): void {
//     this.printOrder(order);
//   }

//   // طباعة الطلب
//   printOrder(order: Order): void {
//     const printWindow = window.open('', '_blank');
//     if (!printWindow) return;

//     const printContent = this.generatePrintContent(order);
//     printWindow.document.write(printContent);
//     printWindow.document.close();
//     printWindow.print();
    
//     this.showSuccess('تم إعداد الطلب للطباعة');
//   }

//   // إنشاء محتوى الطباعة
//   generatePrintContent(order: Order): string {
//     const subtotal = order.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
//     return `
//       <!DOCTYPE html>
//       <html dir="rtl">
//       <head>
//         <meta charset="UTF-8">
//         <title>طلب رقم ${order.orderNumber}</title>
//         <style>
//           body { font-family: Arial, sans-serif; margin: 20px; }
//           .header { text-align: center; margin-bottom: 30px; }
//           .order-info { margin-bottom: 20px; }
//           .items-table { width: 100%; border-collapse: collapse; margin: 20px 0; }
//           .items-table th, .items-table td { border: 1px solid #ddd; padding: 8px; text-align: right; }
//           .items-table th { background-color: #f5f5f5; }
//           .total-section { margin-top: 20px; text-align: left; }
//         </style>
//       </head>
//       <body>
//         <div class="header">
//           <h1>تفاصيل الطلب</h1>
//           <h2>${order.orderNumber}</h2>
//         </div>
        
//         <div class="order-info">
//           <p><strong>العميل:</strong> ${order.customerName}</p>
//           <p><strong>التليفون:</strong> ${order.customerPhone}</p>
//           <p><strong>العنوان:</strong> ${order.customerAddress}</p>
//           <p><strong>تاريخ الطلب:</strong> ${order.orderDate.toLocaleDateString('ar-EG')}</p>
//           <p><strong>الحالة:</strong> ${this.getStatusLabel(order.status)}</p>
//         </div>

//         <table class="items-table">
//           <thead>
//             <tr>
//               <th>المنتج</th>
//               <th>الكمية</th>
//               <th>السعر</th>
//               <th>المجموع</th>
//             </tr>
//           </thead>
//           <tbody>
//             ${order.items.map(item => `
//               <tr>
//                 <td>${item.productName}</td>
//                 <td>${item.quantity}</td>
//                 <td>${item.price} ج.م</td>
//                 <td>${item.price * item.quantity} ج.م</td>
//               </tr>
//             `).join('')}
//           </tbody>
//         </table>

//         <div class="total-section">
//           <p><strong>المجموع الفرعي:</strong> ${subtotal} ج.م</p>
//           <p><strong>رسوم التوصيل:</strong> ${order.deliveryFee} ج.م</p>
//           ${order.discount ? `<p><strong>خصم:</strong> ${order.discount} ج.م</p>` : ''}
//           <p><strong>المجموع الإجمالي:</strong> ${order.totalAmount} ج.م</p>
//         </div>

//         ${order.notes ? `<div><strong>ملاحظات:</strong> ${order.notes}</div>` : ''}
//       </body>
//       </html>
//     `;
//   }

//   // Helper Methods
//   getStatusColor(status: string): string {
//     const statusObj = this.orderStatuses.find(s => s.value === status);
//     return statusObj?.color || '#6c757d';
//   }

//   getStatusIcon(status: string): string {
//     const statusObj = this.orderStatuses.find(s => s.value === status);
//     return statusObj?.icon || 'fas fa-question';
//   }

//   getStatusLabel(status: string): string {
//     const statusObj = this.orderStatuses.find(s => s.value === status);
//     return statusObj?.label || status;
//   }

//   // تصدير الطلبات
//   exportOrders(): void {
//     const csvContent = this.generateCSV();
//     const blob = new Blob(['\ufeff' + csvContent], { type: 'text/csv;charset=utf-8;' });
//     const link = document.createElement('a');
//     const url = URL.createObjectURL(blob);
//     link.setAttribute('href', url);
//     link.setAttribute('download', `orders_${new Date().toISOString().split('T')[0]}.csv`);
//     document.body.appendChild(link);
//     link.click();
//     document.body.removeChild(link);
//     URL.revokeObjectURL(url);
    
//     this.showSuccess('تم تصدير الطلبات بنجاح');
//   }

//   // إنشاء CSV محسّن
//   generateCSV(): string {
//     const headers = [
//       'رقم الطلب', 'اسم العميل', 'التليفون', 'العنوان', 
//       'المبلغ الإجمالي', 'الحالة', 'تاريخ الطلب', 'الأولوية', 
//       'طريقة الدفع', 'رسوم التوصيل', 'رقم التتبع'
//     ];
    
//     const rows = this.filteredOrders.map(order => [
//       order.orderNumber,
//       order.customerName,
//       order.customerPhone,
//       order.customerAddress,
//       order.totalAmount.toString(),
//       this.getStatusLabel(order.status),
//       order.orderDate.toLocaleDateString('ar-EG'),
//       this.getPriorityLabel(order.priority || 'medium'),
//       this.getPaymentMethodLabel(order.paymentMethod),
//       order.deliveryFee.toString(),
//       order.trackingNumber || ''
//     ]);

//     return [headers, ...rows].map(row => row.join(',')).join('\n');
//   }

//   // الحصول على تسمية الأولوية
//   getPriorityLabel(priority: string): string {
//     const priorities = {
//       'high': 'عالية',
//       'medium': 'متوسطة',
//       'low': 'منخفضة'
//     };
//     return priorities[priority as keyof typeof priorities] || priority;
//   }

//   // الحصول على تسمية طريقة الدفع
//   getPaymentMethodLabel(method: string): string {
//     const methods = {
//       'cash': 'نقداً عند الاستلام',
//       'card': 'بطاقة ائتمان',
//       'online': 'دفع إلكتروني'
//     };
//     return methods[method as keyof typeof methods] || method;
//   }

//   // تحديث الفلاتر عند التغيير
//   onFilterChange(): void {
//     this.currentPage = 1; // العودة للصفحة الأولى عند التصفية
//     this.applyFiltersAndSort();
//     this.updatePagination();
//   }

//   // إعادة تعيين الفلاتر
//   resetFilters(): void {
//     this.selectedStatus = 'all';
//     this.selectedPriority = 'all';
//     this.searchTerm = '';
//     this.selectedDate = '';
//     this.currentPage = 1;
//     this.applyFiltersAndSort();
//     this.updatePagination();
//     this.showSuccess('تم إعادة تعيين جميع الفلاتر');
//   }

//   // تغيير الترتيب
//   changeSorting(sortBy: 'date' | 'amount' | 'customer'): void {
//     if (this.sortBy === sortBy) {
//       this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
//     } else {
//       this.sortBy = sortBy;
//       this.sortDirection = 'desc';
//     }
    
//     this.applyFiltersAndSort();
//     this.saveUserPreferences();
//   }

//   // تغيير الصفحة
//   changePage(page: number): void {
//     if (page >= 1 && page <= this.totalPages) {
//       this.currentPage = page;
//     }
//   }

//   // الحصول على الطلبات للصفحة الحالية
//   getPaginatedOrders(): Order[] {
//     const startIndex = (this.currentPage - 1) * this.pageSize;
//     const endIndex = startIndex + this.pageSize;
//     return this.filteredOrders.slice(startIndex, endIndex);
//   }

//   // إدارة أولوية الطلب
//   updateOrderPriority(orderId: string, priority: 'high' | 'medium' | 'low'): void {
//     const order = this.allOrders.find(o => o.id === orderId);
//     if (order) {
//       order.priority = priority;
//       order.lastUpdated = new Date();
//       this.saveOrdersToStorage();
//       this.applyFiltersAndSort();
//       this.showSuccess(`تم تحديث أولوية الطلب ${order.orderNumber} إلى ${this.getPriorityLabel(priority)}`);
//     }
//   }

//   // إضافة ملاحظات التاجر
//   addMerchantNote(orderId: string, note: string): void {
//     const order = this.allOrders.find(o => o.id === orderId);
//     if (order) {
//       order.merchantNotes = note;
//       order.lastUpdated = new Date();
//       this.saveOrdersToStorage();
//       this.showSuccess('تم إضافة ملاحظة التاجر بنجاح');
//     }
//   }

//   // تحديث موعد التسليم المتوقع
//   updateEstimatedDeliveryDate(orderId: string, deliveryDate: Date): void {
//     const order = this.allOrders.find(o => o.id === orderId);
//     if (order) {
//       order.estimatedDelivery = deliveryDate;
//       order.lastUpdated = new Date();
//       this.saveOrdersToStorage();
//       this.showSuccess('تم تحديث موعد التسليم المتوقع');
//     }
//   }

//   // البحث المتقدم
//   advancedSearch(criteria: {
//     customerName?: string;
//     phoneNumber?: string;
//     orderNumber?: string;
//     trackingNumber?: string;
//     dateFrom?: Date;
//     dateTo?: Date;
//     minAmount?: number;
//     maxAmount?: number;
//     priority?: string;
//     paymentMethod?: string;
//   }): void {
//     let filtered = [...this.allOrders];

//     if (criteria.customerName) {
//       filtered = filtered.filter(o => 
//         o.customerName.toLowerCase().includes(criteria.customerName!.toLowerCase())
//       );
//     }

//     if (criteria.phoneNumber) {
//       filtered = filtered.filter(o => o.customerPhone.includes(criteria.phoneNumber!));
//     }

//     if (criteria.orderNumber) {
//       filtered = filtered.filter(o => 
//         o.orderNumber.toLowerCase().includes(criteria.orderNumber!.toLowerCase())
//       );
//     }

//     if (criteria.trackingNumber) {
//       filtered = filtered.filter(o => 
//         o.trackingNumber?.toLowerCase().includes(criteria.trackingNumber!.toLowerCase())
//       );
//     }

//     if (criteria.dateFrom) {
//       filtered = filtered.filter(o => o.orderDate >= criteria.dateFrom!);
//     }

//     if (criteria.dateTo) {
//       filtered = filtered.filter(o => o.orderDate <= criteria.dateTo!);
//     }

//     if (criteria.minAmount) {
//       filtered = filtered.filter(o => o.totalAmount >= criteria.minAmount!);
//     }

//     if (criteria.maxAmount) {
//       filtered = filtered.filter(o => o.totalAmount <= criteria.maxAmount!);
//     }

//     if (criteria.priority && criteria.priority !== 'all') {
//       filtered = filtered.filter(o => o.priority === criteria.priority);
//     }

//     if (criteria.paymentMethod && criteria.paymentMethod !== 'all') {
//       filtered = filtered.filter(o => o.paymentMethod === criteria.paymentMethod);
//     }

//     this.filteredOrders = filtered;
//     this.currentPage = 1;
//     this.updatePagination();
//   }

//   // إحصائيات متقدمة
//   getAdvancedStats(): {
//     averageProcessingTime: number;
//     topCustomers: { name: string; orders: number; total: number }[];
//     popularProducts: { name: string; quantity: number }[];
//     hourlyOrderDistribution: { hour: number; count: number }[];
//     conversionRate: number;
//   } {
//     const orders = this.allOrders;
    
//     // متوسط وقت المعالجة
//     const processedOrders = orders.filter(o => o.status === 'delivered' && o.lastUpdated);
//     const averageProcessingTime = processedOrders.length > 0
//       ? processedOrders.reduce((sum, o) => {
//           const processingTime = o.lastUpdated!.getTime() - o.orderDate.getTime();
//           return sum + processingTime;
//         }, 0) / processedOrders.length / (1000 * 60 * 60) // بالساعات
//       : 0;

//     // أفضل العملاء
//     const customerStats = new Map<string, { orders: number; total: number }>();
//     orders.forEach(order => {
//       const existing = customerStats.get(order.customerName) || { orders: 0, total: 0 };
//       existing.orders += 1;
//       existing.total += order.totalAmount;
//       customerStats.set(order.customerName, existing);
//     });
    
//     const topCustomers = Array.from(customerStats.entries())
//       .map(([name, stats]) => ({ name, ...stats }))
//       .sort((a, b) => b.total - a.total)
//       .slice(0, 5);

//     // المنتجات الأكثر طلباً
//     const productStats = new Map<string, number>();
//     orders.forEach(order => {
//       order.items.forEach(item => {
//         const existing = productStats.get(item.productName) || 0;
//         productStats.set(item.productName, existing + item.quantity);
//       });
//     });
    
//     const popularProducts = Array.from(productStats.entries())
//       .map(([name, quantity]) => ({ name, quantity }))
//       .sort((a, b) => b.quantity - a.quantity)
//       .slice(0, 5);

//     // توزيع الطلبات حسب الساعة
//     const hourlyDistribution = new Array(24).fill(0);
//     orders.forEach(order => {
//       const hour = order.orderDate.getHours();
//       hourlyDistribution[hour]++;
//     });
    
//     const hourlyOrderDistribution = hourlyDistribution.map((count, hour) => ({ hour, count }));

//     // معدل التحويل (نسبة الطلبات المكتملة)
//     const completedOrders = orders.filter(o => o.status === 'delivered').length;
//     const conversionRate = orders.length > 0 ? (completedOrders / orders.length) * 100 : 0;

//     return {
//       averageProcessingTime,
//       topCustomers,
//       popularProducts,
//       hourlyOrderDistribution,
//       conversionRate
//     };
//   }

//   // طرق المساعدة للتنقل
//   goToAddProduct(): void {
//     this.router.navigate(['/merchant/products/add']);
//   }

//   goToSettings(): void {
//     this.router.navigate(['/merchant/settings']);
//   }

//   goToCustomers(): void {
//     this.router.navigate(['/merchant/customers']);
//   }

//   goToInventory(): void {
//     this.router.navigate(['/merchant/inventory']);
//   }

//   goToReports(): void {
//     this.router.navigate(['/merchant/reports']);
//   }

//   // إدارة الإشعارات
//   private showSuccess(message: string): void {
//     this.showNotification(message, 'success');
//   }

//   private showError(message: string): void {
//     this.showNotification(message, 'error');
//   }

//   private showWarning(message: string): void {
//     this.showNotification(message, 'warning');
//   }

//   private showInfo(message: string): void {
//     this.showNotification(message, 'info');
//   }

//   private showNotification(message: string, type: 'success' | 'error' | 'warning' | 'info'): void {
//     // في تطبيق Angular حقيقي، يمكن استخدام مكتبة مثل ngx-toastr
//     console.log(`${type.toUpperCase()}: ${message}`);
    
//     // محاكاة إشعار بسيط
//     if (typeof window !== 'undefined') {
//       const colors = {
//         success: '#28a745',
//         error: '#dc3545',
//         warning: '#ffc107',
//         info: '#17a2b8'
//       };

//       const notification = document.createElement('div');
//       notification.style.cssText = `
//         position: fixed;
//         top: 20px;
//         right: 20px;
//         background: ${colors[type]};
//         color: white;
//         padding: 15px 20px;
//         border-radius: 8px;
//         box-shadow: 0 4px 12px rgba(0,0,0,0.15);
//         z-index: 9999;
//         max-width: 300px;
//         font-family: Arial, sans-serif;
//         font-size: 14px;
//         animation: slideIn 0.3s ease-out;
//       `;
//       notification.textContent = message;

//       document.body.appendChild(notification);

//       setTimeout(() => {
//         notification.style.animation = 'slideOut 0.3s ease-in forwards';
//         setTimeout(() => {
//           if (notification.parentNode) {
//             notification.remove();
//           }
//         }, 300);
//       }, 3000);
//     }
//   }

//   // إدارة تحديث البيانات في الوقت الفعلي
//   simulateRealTimeUpdates(): void {
//     // محاكاة استلام طلب جديد
//     setTimeout(() => {
//       const newOrder: Order = {
//         id: 'new-' + Date.now(),
//         orderNumber: 'ORD-2025-' + (1000 + this.allOrders.length + 1),
//         customerName: 'عميل جديد',
//         customerPhone: '01999888777',
//         customerAddress: 'عنوان جديد',
//         items: [{
//           id: 'new-item-1',
//           productName: 'منتج جديد',
//           quantity: 1,
//           price: 200,
//           image: 'https://via.placeholder.com/100',
//           availability: 'available'
//         }],
//         totalAmount: 250,
//         status: 'pending',
//         orderDate: new Date(),
//         paymentMethod: 'cash',
//         deliveryFee: 50,
//         priority: 'medium',
//         customerType: 'new',
//         trackingNumber: 'TRK-NEW-' + Date.now()
//       };

//       this.allOrders.unshift(newOrder);
//       this.applyFiltersAndSort();
//       this.calculateStats();
//       this.showInfo('تم استلام طلب جديد!');
//     }, 10000); // بعد 10 ثوانٍ
//   }

//   // تصدير تقرير شامل
//   exportDetailedReport(): void {
//     const stats = this.getAdvancedStats();
//     const reportData = {
//       generatedAt: new Date().toISOString(),
//       summary: this.stats,
//       orders: this.filteredOrders,
//       analytics: stats
//     };

//     const jsonContent = JSON.stringify(reportData, null, 2);
//     const blob = new Blob([jsonContent], { type: 'application/json' });
//     const link = document.createElement('a');
//     const url = URL.createObjectURL(blob);
    
//     link.href = url;
//     link.download = `detailed-orders-report-${new Date().toISOString().split('T')[0]}.json`;
//     document.body.appendChild(link);
//     link.click();
//     document.body.removeChild(link);
//     URL.revokeObjectURL(url);

//     this.showSuccess('تم تصدير التقرير الشامل بنجاح');
//   }

//   // طباعة تقرير يومي
//   printDailyReport(): void {
//     const today = new Date();
//     const todayOrders = this.allOrders.filter(order => 
//       order.orderDate.toDateString() === today.toDateString()
//     );

//     const printContent = this.generateDailyReportContent(todayOrders, today);
//     const printWindow = window.open('', '_blank');
    
//     if (printWindow) {
//       printWindow.document.write(printContent);
//       printWindow.document.close();
//       printWindow.print();
//       this.showSuccess('تم إعداد التقرير اليومي للطباعة');
//     }
//   }

//   // إنشاء محتوى التقرير اليومي
//   private generateDailyReportContent(orders: Order[], date: Date): string {
//     const revenue = orders.filter(o => o.status === 'delivered')
//       .reduce((sum, o) => sum + o.totalAmount, 0);
    
//     const statusCounts = {
//       pending: orders.filter(o => o.status === 'pending').length,
//       confirmed: orders.filter(o => o.status === 'confirmed').length,
//       delivered: orders.filter(o => o.status === 'delivered').length,
//       cancelled: orders.filter(o => o.status === 'cancelled').length
//     };

//     return `
//       <!DOCTYPE html>
//       <html dir="rtl">
//       <head>
//         <meta charset="UTF-8">
//         <title>التقرير اليومي - ${date.toLocaleDateString('ar-EG')}</title>
//         <style>
//           body { font-family: Arial, sans-serif; margin: 20px; }
//           .header { text-align: center; margin-bottom: 30px; }
//           .summary { display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px; margin: 20px 0; }
//           .summary-item { padding: 15px; border: 1px solid #ddd; border-radius: 8px; }
//           .orders-table { width: 100%; border-collapse: collapse; margin: 20px 0; }
//           .orders-table th, .orders-table td { border: 1px solid #ddd; padding: 8px; text-align: right; }
//           .orders-table th { background-color: #f5f5f5; }
//         </style>
//       </head>
//       <body>
//         <div class="header">
//           <h1>التقرير اليومي للطلبات</h1>
//           <h2>${date.toLocaleDateString('ar-EG')}</h2>
//         </div>
        
//         <div class="summary">
//           <div class="summary-item">
//             <h3>إجمالي الطلبات: ${orders.length}</h3>
//           </div>
//           <div class="summary-item">
//             <h3>الإيرادات: ${revenue} ج.م</h3>
//           </div>
//           <div class="summary-item">
//             <h3>في الانتظار: ${statusCounts.pending}</h3>
//           </div>
//           <div class="summary-item">
//             <h3>تم التسليم: ${statusCounts.delivered}</h3>
//           </div>
//         </div>

//         <table class="orders-table">
//           <thead>
//             <tr>
//               <th>رقم الطلب</th>
//               <th>العميل</th>
//               <th>المبلغ</th>
//               <th>الحالة</th>
//               <th>الوقت</th>
//             </tr>
//           </thead>
//           <tbody>
//             ${orders.map(order => `
//               <tr>
//                 <td>${order.orderNumber}</td>
//                 <td>${order.customerName}</td>
//                 <td>${order.totalAmount} ج.م</td>
//                 <td>${this.getStatusLabel(order.status)}</td>
//                 <td>${order.orderDate.toLocaleTimeString('ar-EG')}</td>
//               </tr>
//             `).join('')}
//           </tbody>
//         </table>
//       </body>
//       </html>
//     `;
//   }

//   // تنظيف الذاكرة والموارد
//   private cleanup(): void {
//     this.destroy$.next();
//     this.destroy$.complete();
//   }

//   // متابعة أداء التطبيق
//   trackPerformance(): void {
//     const performanceData = {
//       ordersCount: this.allOrders.length,
//       filteredCount: this.filteredOrders.length,
//       currentPage: this.currentPage,
//       timestamp: new Date()
//     };

//     console.log('Performance metrics:', performanceData);
//   }
// }








export class MerchantOrdersComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();

  // Data properties
  allOrders: Order[] = [];
  filteredOrders: Order[] = [];
  paginatedOrders: Order[] = [];

  // Filter properties
  searchTerm: string = '';
  selectedStatus: string = 'all';
  selectedDate: string = '';

  // Pagination properties
  currentPage: number = 1;
  ordersPerPage: number = 5;
  totalPages: number = 1;

  // State properties
  isLoading: boolean = false;
  error: string | null = null;

  // Notification properties
  notificationMessage: string = '';
  notificationType: string = '';

  // Statistics
  stats: OrderStats = {
    total: 0,
    pending: 0,
    confirmed: 0,
    preparing: 0,
    ready: 0,
    delivering: 0,
    delivered: 0,
    cancelled: 0,
    todayRevenue: 0,
    weekRevenue: 0,
    monthRevenue: 0,
    averageOrderValue: 0
  };

  // Order statuses configuration
  orderStatuses: StatusConfig[] = [
    { value: 'all', label: 'جميع الطلبات', color: '#6c757d', icon: 'fas fa-list' },
    { value: 'pending', label: 'في الانتظار', color: '#ffc107', icon: 'fas fa-clock' },
    { value: 'confirmed', label: 'مؤكد', color: '#17a2b8', icon: 'fas fa-check' },
    { value: 'preparing', label: 'قيد التحضير', color: '#007bff', icon: 'fas fa-cog' },
    { value: 'ready', label: 'جاهز للتسليم', color: '#28a745', icon: 'fas fa-box' },
    { value: 'delivering', label: 'في الطريق', color: '#fd7e14', icon: 'fas fa-truck' },
    { value: 'delivered', label: 'تم التسليم', color: '#198754', icon: 'fas fa-check-circle' },
    { value: 'cancelled', label: 'ملغي', color: '#dc3545', icon: 'fas fa-times-circle' }
  ];

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.initializeComponent();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  // Initialization
  private initializeComponent(): void {
    this.isLoading = true;
    
    try {
      this.loadOrders();
      this.calculateStats();
      this.applyFilters();
      this.startAutoRefresh();
      
      // Show welcome message
      setTimeout(() => {
        this.showNotification('مرحباً بك في نظام إدارة الطلبات! 👋', 'info');
      }, 1000);
    } catch (error) {
      this.handleError(error, 'تهيئة النظام');
    } finally {
      this.isLoading = false;
    }
  }

  // Data Loading
  loadOrders(): void {
    this.allOrders = this.generateMockOrders();
    this.filteredOrders = [...this.allOrders];
  }

  private generateMockOrders(): Order[] {
    return [
      {
        id: 'ORD-2025-001',
        orderNumber: 'ORD-2025-001',
        customerName: 'أحمد محمد علي',
        customerPhone: '01012345678',
        customerEmail: 'ahmed@example.com',
        customerAddress: 'شارع الثورة، مصر الجديدة، القاهرة',
        orderDate: new Date('2025-06-22T10:30:00'),
        estimatedDelivery: new Date('2025-06-23T14:00:00'),
        status: 'pending',
        paymentMethod: 'cash',
        deliveryFee: 50,
        discount: 0,
        priority: 'medium',
        customerType: 'regular',
        trackingNumber: 'TRK-456789',
        notes: 'في الطريق - سيصل خلال ساعتين',
        merchantNotes: 'تم إرسال السائق',
        items: [
          {
            id: 'item-06',
            productName: 'فرامل أمامية تويوتا',
            quantity: 1,
            price: 320,
            image: 'https://via.placeholder.com/50x50/fd7e14/ffffff?text=فرامل',
            category: 'فرامل',
            brand: 'تويوتا',
            model: 'أصلي',
            warranty: '18 شهر',
            availability: 'available'
          }
        ],
        totalAmount: 370,
        lastUpdated: new Date()
      },
      {
        id: 'ORD-2025-005',
        orderNumber: 'ORD-2025-005',
        customerName: 'خالد يوسف',
        customerPhone: '01777888999',
        customerEmail: 'khaled@example.com',
        customerAddress: 'الإسكندرية',
        orderDate: new Date('2025-06-21T18:20:00'),
        estimatedDelivery: new Date('2025-06-21T20:00:00'),
        status: 'delivered',
        paymentMethod: 'online',
        deliveryFee: 70,
        discount: 0,
        priority: 'low',
        customerType: 'new',
        trackingNumber: 'TRK-345678',
        notes: 'تم التسليم بنجاح',
        merchantNotes: 'راضي عن الخدمة',
        items: [
          {
            id: 'item-07',
            productName: 'كشافات ضباب LED',
            quantity: 2,
            price: 180,
            image: 'https://via.placeholder.com/50x50/198754/ffffff?text=كشاف',
            category: 'إضاءة',
            brand: 'Osram',
            model: 'LEDriving',
            warranty: '24 شهر',
            availability: 'available'
          }
        ],
        totalAmount: 430,
        lastUpdated: new Date()
      }
    ];
  }

  // Statistics Calculation
  calculateStats(): void {
    this.stats.total = this.allOrders.length;
    this.stats.pending = this.allOrders.filter(o => o.status === 'pending').length;
    this.stats.confirmed = this.allOrders.filter(o => o.status === 'confirmed').length;
    this.stats.preparing = this.allOrders.filter(o => o.status === 'preparing').length;
    this.stats.ready = this.allOrders.filter(o => o.status === 'ready').length;
    this.stats.delivering = this.allOrders.filter(o => o.status === 'delivering').length;
    this.stats.delivered = this.allOrders.filter(o => o.status === 'delivered').length;
    this.stats.cancelled = this.allOrders.filter(o => o.status === 'cancelled').length;

    // Calculate revenue
    const today = new Date();
    const todayStart = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
    const monthAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);

    const deliveredOrders = this.allOrders.filter(o => o.status === 'delivered');

    this.stats.todayRevenue = deliveredOrders
      .filter(o => o.orderDate >= todayStart)
      .reduce((sum, o) => sum + o.totalAmount, 0);

    this.stats.weekRevenue = deliveredOrders
      .filter(o => o.orderDate >= weekAgo)
      .reduce((sum, o) => sum + o.totalAmount, 0);

    this.stats.monthRevenue = deliveredOrders
      .filter(o => o.orderDate >= monthAgo)
      .reduce((sum, o) => sum + o.totalAmount, 0);

    this.stats.averageOrderValue = this.allOrders.length > 0 
      ? this.allOrders.reduce((sum, o) => sum + o.totalAmount, 0) / this.allOrders.length 
      : 0;
  }

  // Filtering and Search
  applyFilters(): void {
    let filtered = [...this.allOrders];

    // Status filter
    if (this.selectedStatus !== 'all') {
      filtered = filtered.filter(order => order.status === this.selectedStatus);
    }

    // Search filter
    if (this.searchTerm) {
      const searchLower = this.searchTerm.toLowerCase();
      filtered = filtered.filter(order =>
        order.customerName.toLowerCase().includes(searchLower) ||
        order.orderNumber.toLowerCase().includes(searchLower) ||
        order.customerPhone.includes(this.searchTerm) ||
        order.trackingNumber?.toLowerCase().includes(searchLower) ||
        order.items.some(item => item.productName.toLowerCase().includes(searchLower))
      );
    }

    // Date filter
    if (this.selectedDate) {
      const selectedDate = new Date(this.selectedDate);
      filtered = filtered.filter(order =>
        this.isSameDay(order.orderDate, selectedDate)
      );
    }

    this.filteredOrders = filtered;
    this.currentPage = 1;
    this.updatePagination();
  }

  resetFilters(): void {
    this.searchTerm = '';
    this.selectedStatus = 'all';
    this.selectedDate = '';
    this.applyFilters();
    this.showNotification('تم إعادة تعيين جميع الفلاتر', 'info');
  }

  // Pagination
  updatePagination(): void {
    this.totalPages = Math.ceil(this.filteredOrders.length / this.ordersPerPage);
    
    if (this.currentPage > this.totalPages && this.totalPages > 0) {
      this.currentPage = this.totalPages;
    }
    
    this.updatePaginatedOrders();
  }

  private updatePaginatedOrders(): void {
    const startIndex = (this.currentPage - 1) * this.ordersPerPage;
    const endIndex = startIndex + this.ordersPerPage;
    this.paginatedOrders = this.filteredOrders.slice(startIndex, endIndex);
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.updatePaginatedOrders();
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePaginatedOrders();
    }
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePaginatedOrders();
    }
  }

  getPageNumbers(): number[] {
    const pages: number[] = [];
    const maxVisible = 5;
    
    if (this.totalPages <= maxVisible) {
      for (let i = 1; i <= this.totalPages; i++) {
        pages.push(i);
      }
    } else {
      const start = Math.max(1, this.currentPage - Math.floor(maxVisible / 2));
      const end = Math.min(this.totalPages, start + maxVisible - 1);
      
      for (let i = start; i <= end; i++) {
        pages.push(i);
      }
    }
    
    return pages;
  }

  getStartIndex(): number {
    return (this.currentPage - 1) * this.ordersPerPage;
  }

  getEndIndex(): number {
    return Math.min(this.getStartIndex() + this.ordersPerPage, this.filteredOrders.length);
  }

  // Order Management
  updateOrderStatus(orderId: string, newStatus: string): void {
    const order = this.allOrders.find(o => o.id === orderId);
    if (!order) {
      this.showNotification('الطلب غير موجود', 'error');
      return;
    }

    if (!this.isValidStatusTransition(order.status, newStatus)) {
      this.showNotification('لا يمكن تحديث الحالة من ' + this.getStatusLabel(order.status) + ' إلى ' + this.getStatusLabel(newStatus), 'error');
      return;
    }

    const oldStatus = order.status;
    order.status = newStatus as Order['status'];
    order.lastUpdated = new Date();

    // Update estimated delivery
    this.updateEstimatedDelivery(order, newStatus);

    // Save changes
    this.saveOrdersToStorage();

    // Recalculate and update
    this.calculateStats();
    this.applyFilters();

    this.showNotification(`تم تحديث حالة الطلب ${order.orderNumber} من ${this.getStatusLabel(oldStatus)} إلى ${this.getStatusLabel(newStatus)}`, 'success');
  }

  private isValidStatusTransition(currentStatus: string, newStatus: string): boolean {
    const validTransitions: { [key: string]: string[] } = {
      'pending': ['confirmed', 'cancelled'],
      'confirmed': ['preparing', 'cancelled'],
      'preparing': ['ready', 'cancelled'],
      'ready': ['delivering'],
      'delivering': ['delivered'],
      'delivered': [],
      'cancelled': []
    };

    return validTransitions[currentStatus]?.includes(newStatus) || false;
  }

  private updateEstimatedDelivery(order: Order, status: string): void {
    const now = new Date();
    
    switch (status) {
      case 'confirmed':
        order.estimatedDelivery = new Date(now.getTime() + 24 * 60 * 60 * 1000);
        break;
      case 'preparing':
        order.estimatedDelivery = new Date(now.getTime() + 12 * 60 * 60 * 1000);
        break;
      case 'ready':
        order.estimatedDelivery = new Date(now.getTime() + 6 * 60 * 60 * 1000);
        break;
      case 'delivering':
        order.estimatedDelivery = new Date(now.getTime() + 2 * 60 * 60 * 1000);
        break;
      case 'delivered':
        order.estimatedDelivery = now;
        break;
    }
  }

  cancelOrder(order: Order): void {
    const confirmMessage = `هل أنت متأكد من إلغاء الطلب ${order.orderNumber}؟`;
    
    if (confirm(confirmMessage)) {
      this.updateOrderStatus(order.id, 'cancelled');
    }
  }

  canCancelOrder(order: Order): boolean {
    return !['delivered', 'cancelled'].includes(order.status);
  }

  // Helper Methods
  getStatusColor(status: string): string {
    const statusConfig = this.orderStatuses.find(s => s.value === status);
    return statusConfig?.color || '#6c757d';
  }

  getStatusIcon(status: string): string {
    const statusConfig = this.orderStatuses.find(s => s.value === status);
    return statusConfig?.icon || 'fas fa-question';
  }

  getStatusLabel(status: string): string {
    const statusConfig = this.orderStatuses.find(s => s.value === status);
    return statusConfig?.label || status;
  }

  calculateOrderTotal(order: Order): number {
    const subtotal = order.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    return subtotal + order.deliveryFee - (order.discount || 0);
  }

  // Actions
  viewOrderDetails(order: Order): void {
    this.showNotification('سيتم فتح تفاصيل الطلب في المودال', 'info');
    // This will be implemented with the modal component
    console.log('Opening order details for:', order.id);
  }

  printOrder(order: Order): void {
    this.showNotification(`جاري تحضير طلب ${order.orderNumber} للطباعة...`, 'info');
    
    setTimeout(() => {
      const printContent = this.generatePrintContent(order);
      const printWindow = window.open('', '_blank');
      
      if (printWindow) {
        printWindow.document.write(printContent);
        printWindow.document.close();
        printWindow.focus();
        printWindow.print();
        this.showNotification('تم إعداد الطلب للطباعة بنجاح!', 'success');
      } else {
        this.showNotification('تعذر فتح نافذة الطباعة. يرجى التحقق من إعدادات المتصفح.', 'error');
      }
    }, 1000);
  }

  private generatePrintContent(order: Order): string {
    const subtotal = order.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const total = subtotal + order.deliveryFee - (order.discount || 0);

    return `
      <!DOCTYPE html>
      <html dir="rtl">
      <head>
        <meta charset="UTF-8">
        <title>طلب رقم ${order.orderNumber}</title>
        <style>
          body { font-family: Arial, sans-serif; margin: 20px; direction: rtl; }
          .header { text-align: center; margin-bottom: 30px; border-bottom: 2px solid #333; padding-bottom: 20px; }
          .order-info { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 30px; }
          .info-section { background: #f8f9fa; padding: 15px; border-radius: 8px; }
          .items-table { width: 100%; border-collapse: collapse; margin: 20px 0; }
          .items-table th, .items-table td { border: 1px solid #ddd; padding: 12px; text-align: right; }
          .items-table th { background-color: #007bff; color: white; }
          .total-section { margin-top: 30px; text-align: left; background: #f8f9fa; padding: 20px; border-radius: 8px; }
          .footer { margin-top: 30px; text-align: center; font-size: 0.9rem; color: #666; }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>فاتورة طلب قطع الغيار</h1>
          <h2>${order.orderNumber}</h2>
          <p>تاريخ الطباعة: ${new Date().toLocaleDateString('ar-EG')}</p>
        </div>
        
        <div class="order-info">
          <div class="info-section">
            <h3>بيانات العميل</h3>
            <p><strong>الاسم:</strong> ${order.customerName}</p>
            <p><strong>التليفون:</strong> ${order.customerPhone}</p>
            <p><strong>العنوان:</strong> ${order.customerAddress}</p>
          </div>
          
          <div class="info-section">
            <h3>بيانات الطلب</h3>
            <p><strong>رقم الطلب:</strong> ${order.orderNumber}</p>
            <p><strong>تاريخ الطلب:</strong> ${order.orderDate.toLocaleDateString('ar-EG')}</p>
            <p><strong>الحالة:</strong> ${this.getStatusLabel(order.status)}</p>
            <p><strong>رقم التتبع:</strong> ${order.trackingNumber}</p>
          </div>
        </div>

        <table class="items-table">
          <thead>
            <tr>
              <th>المنتج</th>
              <th>الكمية</th>
              <th>السعر</th>
              <th>المجموع</th>
            </tr>
          </thead>
          <tbody>
            ${order.items.map(item => `
              <tr>
                <td>${item.productName}</td>
                <td>${item.quantity}</td>
                <td>${item.price} ج.م</td>
                <td>${item.price * item.quantity} ج.م</td>
              </tr>
            `).join('')}
          </tbody>
        </table>

        <div class="total-section">
          <p><strong>المجموع الفرعي:</strong> ${subtotal} ج.م</p>
          <p><strong>رسوم التوصيل:</strong> ${order.deliveryFee} ج.م</p>
          ${order.discount ? `<p><strong>خصم:</strong> ${order.discount} ج.م</p>` : ''}
          <p style="font-size: 1.2rem; font-weight: bold; border-top: 2px solid #333; padding-top: 10px;"><strong>المجموع الإجمالي:</strong> ${total} ج.م</p>
        </div>

        <div class="footer">
          <p>شكراً لتعاملكم معنا</p>
          <p>نظام إدارة طلبات قطع الغيار</p>
        </div>
      </body>
      </html>
    `;
  }

  contactCustomer(phone: string): void {
    if (confirm(`هل تريد الاتصال بالعميل على الرقم ${phone}؟`)) {
      window.open(`tel:${phone}`);
    }
  }

  addNewOrder(): void {
    this.showNotification('سيتم فتح نموذج إضافة طلب جديد', 'info');
    // Navigate to add order form or open modal
    console.log('Opening add new order form');
  }

  // Export functionality
  exportOrders(): void {
    const csvContent = this.generateCSV();
    this.downloadCSV(csvContent, `orders-${new Date().toISOString().split('T')[0]}.csv`);
    this.showNotification('تم تصدير البيانات بنجاح!', 'success');
  }

  private generateCSV(): string {
    const headers = [
      'رقم الطلب', 'اسم العميل', 'التليفون', 'العنوان', 
      'المبلغ الإجمالي', 'الحالة', 'تاريخ الطلب', 'طريقة الدفع', 
      'رسوم التوصيل', 'رقم التتبع'
    ];
    
    const rows = this.filteredOrders.map(order => [
      order.orderNumber,
      order.customerName,
      order.customerPhone,
      order.customerAddress,
      this.calculateOrderTotal(order),
      this.getStatusLabel(order.status),
      order.orderDate.toLocaleDateString('ar-EG'),
      this.getPaymentMethodLabel(order.paymentMethod),
      order.deliveryFee,
      order.trackingNumber || ''
    ]);

    return [headers, ...rows].map(row => row.join(',')).join('\n');
  }

  private downloadCSV(content: string, filename: string): void {
    const BOM = '\uFEFF'; // UTF-8 BOM for proper Arabic encoding
    const blob = new Blob([BOM + content], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    
    link.href = url;
    link.download = filename;
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }

  private getPaymentMethodLabel(method: string): string {
    const methods: { [key: string]: string } = {
      'cash': 'نقداً عند الاستلام',
      'card': 'بطاقة ائتمان',
      'online': 'دفع إلكتروني'
    };
    return methods[method] || method;
  }

  // Utility methods
  trackByOrderId(index: number, order: Order): string {
    return order.id;
  }

  trackByItemId(index: number, item: OrderItem): string {
    return item.id;
  }

  onImageError(event: any): void {
    // event.target.src = 'https://via.placeholder.com/50x50/cccccc/666666?text=صورة';
  }

  private isSameDay(date1: Date, date2: Date): boolean {
    return date1.getFullYear() === date2.getFullYear() &&
           date1.getMonth() === date2.getMonth() &&
           date1.getDate() === date2.getDate();
  }

  // Notification system
  showNotification(message: string, type: 'success' | 'error' | 'warning' | 'info'): void {
    this.notificationMessage = message;
    this.notificationType = type;

    // Auto dismiss notification after 4 seconds
    setTimeout(() => {
      this.dismissNotification();
    }, 4000);
  }

  dismissNotification(): void {
    this.notificationMessage = '';
    this.notificationType = '';
  }

  getNotificationIcon(): string {
    const icons: { [key: string]: string } = {
      'success': 'fas fa-check-circle',
      'error': 'fas fa-exclamation-circle',
      'warning': 'fas fa-exclamation-triangle',
      'info': 'fas fa-info-circle'
    };
    return icons[this.notificationType] || 'fas fa-info-circle';
  }

  // Auto refresh
  private startAutoRefresh(): void {
    interval(30000) // 30 seconds
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.calculateStats();
        console.log('📊 تحديث تلقائي للإحصائيات...');
      });

    // Simulate new orders occasionally
    interval(120000) // 2 minutes
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        if (Math.random() > 0.7) { // 30% chance
          this.simulateNewOrder();
        }
      });
  }

  private simulateNewOrder(): void {
    const newOrderNumber = `ORD-2025-${String(this.allOrders.length + 1).padStart(3, '0')}`;
    
    const newOrder: Order = {
      id: newOrderNumber,
      orderNumber: newOrderNumber,
      customerName: 'عميل جديد',
      customerPhone: '01999888777',
      customerEmail: 'new@example.com',
      customerAddress: 'عنوان جديد، القاهرة',
      orderDate: new Date(),
      status: 'pending',
      paymentMethod: 'cash',
      deliveryFee: 50,
      discount: 0,
      priority: 'medium',
      customerType: 'new',
      trackingNumber: `TRK-${Date.now()}`,
      notes: 'طلب جديد تم إنشاؤه تلقائياً',
      merchantNotes: '',
      items: [
        {
          id: `item-${Date.now()}`,
          productName: 'منتج تجريبي جديد',
          quantity: 1,
          price: 200,
          image: 'https://via.placeholder.com/50x50/6c757d/ffffff?text=جديد',
          category: 'أخرى',
          brand: 'عام',
          model: 'تجريبي',
          warranty: '3 شهور',
          availability: 'available'
        }
      ],
      totalAmount: 250,
      lastUpdated: new Date()
    };

    this.allOrders.unshift(newOrder);
    this.calculateStats();
    this.applyFilters();
    this.saveOrdersToStorage();
    
    this.showNotification('تم استلام طلب جديد! 🎉', 'success');
  }

  // Storage management
  private saveOrdersToStorage(): void {
    try {
      localStorage.setItem('merchant_orders', JSON.stringify(this.allOrders));
    } catch (error) {
      console.warn('Failed to save orders to localStorage:', error);
    }
  }

  private loadOrdersFromStorage(): void {
    try {
      const saved = localStorage.getItem('merchant_orders');
      if (saved) {
        const orders = JSON.parse(saved);
        // Convert date strings back to Date objects
        orders.forEach((order: any) => {
          order.orderDate = new Date(order.orderDate);
          if (order.estimatedDelivery) {
            order.estimatedDelivery = new Date(order.estimatedDelivery);
          }
          if (order.lastUpdated) {
            order.lastUpdated = new Date(order.lastUpdated);
          }
        });
        this.allOrders = orders;
      }
    } catch (error) {
      console.warn('Failed to load orders from localStorage:', error);
      this.loadOrders(); // Fallback to mock data
    }
  }

  // Error handling
  private handleError(error: any, action: string): void {
    console.error(`Error in ${action}:`, error);
    this.error = error.message || `حدث خطأ أثناء ${action}`;
    this.showNotification(this.error ?? 'حدث خطأ غير معروف', 'error');
  }

  // Navigation methods
  goToAddProduct(): void {
    this.router.navigate(['/merchant/products/add']);
  }

  goToSettings(): void {
    this.router.navigate(['/merchant/settings']);
  }

  goToCustomers(): void {
    this.router.navigate(['/merchant/customers']);
  }

  goToReports(): void {
    this.router.navigate(['/merchant/reports']);
  }
}