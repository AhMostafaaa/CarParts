import { Component } from '@angular/core';

export interface FAQ {
  id: number;
  question: string;
  answer: string;
  isExpanded?: boolean;
}

@Component({
  selector: 'app-common-questions',
  templateUrl: './common-questions.component.html',
  styleUrls: ['./common-questions.component.scss']
})
export class CommonQuestionsComponent {
  faqs: FAQ[] = [
    {
      id: 1,
      question: 'كيف يمكنني البحث عن قطع الغيار المناسبة لسيارتي؟',
      answer: 'يمكنك البحث باستخدام رقم الشاسيه أو موديل السيارة وسنة الصنع للحصول على قطع الغيار المتوافقة.',
      isExpanded: false
    },
    {
      id: 2,
      question: 'ما هي طرق الدفع المتاحة؟',
      answer: 'نوفر عدة طرق للدفع منها الدفع عند الاستلام، التحويل البنكي، والدفع الإلكتروني.',
      isExpanded: false
    },
    {
      id: 3,
      question: 'كم مدة التوصيل؟',
      answer: 'مدة التوصيل تتراوح من 2-5 أيام عمل حسب موقعك الجغرافي.',
      isExpanded: false
    },
    {
      id: 4,
      question: 'هل يمكنني إرجاع أو استبدال المنتج؟',
      answer: 'نعم، يمكنك إرجاع أو استبدال المنتج خلال 14 يوم من تاريخ الشراء بشرط أن يكون في حالته الأصلية.',
      isExpanded: false
    },
    {
      id: 5,
      question: 'هل تقدمون ضمان على قطع الغيار؟',
      answer: 'نعم، نقدم ضمان على جميع قطع الغيار الأصلية حسب نوع القطعة والشركة المصنعة.',
      isExpanded: false
    },
    {
      id: 6,
      question: 'كيف أتأكد من أن القطعة أصلية؟',
      answer: 'جميع القطع المعروضة لدينا أصلية ويتم توضيح ذلك في وصف كل منتج. يمكنك التواصل مع خدمة العملاء لأي استفسار.',
      isExpanded: false
    },
    {
      id: 7,
      question: 'هل يمكنني تتبع طلبي بعد الشراء؟',
      answer: 'نعم، بعد إتمام الطلب ستصلك رسالة برقم التتبع ويمكنك متابعة حالة الطلب من حسابك في الموقع.',
      isExpanded: false
    },
    {
      id: 8,
      question: 'هل الشحن متاح لجميع المدن؟',
      answer: 'نعم، نوفر خدمة الشحن لجميع مناطق ومدن المملكة.',
      isExpanded: false
    },
    {
      id: 9,
      question: 'هل أستطيع إلغاء طلبي بعد الدفع؟',
      answer: 'يمكنك إلغاء الطلب قبل الشحن، يرجى التواصل مع خدمة العملاء في أقرب وقت.',
      isExpanded: false
    },
    {
      id: 10,
      question: 'ماذا أفعل إذا وصلتني قطعة غير مطابقة أو تالفة؟',
      answer: 'يرجى التواصل فوراً مع خدمة العملاء مع إرفاق صورة للمنتج، وسيتم معالجة الأمر في أسرع وقت.',
      isExpanded: false
    },
    {
      id: 11,
      question: 'هل يمكنني طلب قطعة غير متوفرة في الموقع؟',
      answer: 'نعم، يمكنك استخدام خدمة "طلب خاص" وسنبحث لك عن القطعة المطلوبة ونعلمك فور توفرها.',
      isExpanded: false
    },
    {
      id: 12,
      question: 'هل أسعار القطع تشمل ضريبة القيمة المضافة؟',
      answer: 'نعم، جميع الأسعار المعروضة شاملة لضريبة القيمة المضافة.',
      isExpanded: false
    },
    {
      id: 13,
      question: 'ما هي سياسة استرداد المبالغ؟',
      answer: 'في حال استرجاع أو إلغاء الطلب، سيتم استرداد المبلغ إلى نفس وسيلة الدفع خلال 5-7 أيام عمل.',
      isExpanded: false
    },
    {
      id: 14,
      question: 'هل أستطيع الشراء كعميل فردي أو كشركة؟',
      answer: 'نعم، يمكنك الشراء كعميل فردي أو فتح حساب كشركة والاستفادة من العروض الخاصة للشركات.',
      isExpanded: false
    },
    {
      id: 15,
      question: 'ما هي طرق التواصل معكم؟',
      answer: 'يمكنك التواصل معنا عبر الهاتف، الواتساب، أو نموذج الاتصال في الموقع، وفريق الدعم متواجد يومياً من 9 صباحاً حتى 10 مساءً.',
      isExpanded: false
    }
  ];


  toggleFAQ(index: number): void {
    this.faqs.forEach((faq, i) => faq.isExpanded = i === index ? !faq.isExpanded : false);
  }
}
