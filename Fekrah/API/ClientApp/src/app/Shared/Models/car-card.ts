export interface CarPart {
    id: string; // رقم مميز للقطعة
    name: string; // اسم القطعة
    subtitle: any; // وصف قصير أو ملاحظات إضافية
    condition: 'جديد' | 'مستعمل'; // حالة القطعة
    store: {
      name: string; // اسم المتجر أو الورشة
      phone: string; // رقم التواصل
    };
    car: {
      brand: string; // ماركة السيارة
      model: string; // موديل السيارة
      year: string; // سنة الصنع
    };
    price: number; // السعر الأصلي
    priceAfterDiscount: number; // السعر بعد الخصم
    discount: number; // نسبة الخصم %
    isFavorite: boolean; // هل مضاف للمفضلة؟
    hasDelivery: boolean; // هل يوفر توصيل؟
    grade: 'فرز أول' | 'فرز تاني'; // جودة القطعة
    partType: 'كوري' | 'ياباني' | 'صيني'; // نوع القطعة
    origin:string
  }
  