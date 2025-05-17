// contact-us.component.ts
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.scss']
})
export class ContactUsComponent {
  contactForm: FormGroup;
  submitted = false;
  success = false;
  loading = false;
  errorMessage = '';

  constructor(private formBuilder: FormBuilder) {
    this.contactForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: [''],
      subject: ['', Validators.required],
      message: ['', Validators.required]
    });
  }

  get f() { return this.contactForm.controls; }

  onSubmit() {
    this.submitted = true;
    this.errorMessage = '';

    // Stop if form is invalid
    if (this.contactForm.invalid) {
      return;
    }

    this.loading = true;

    // Simulate API call
    setTimeout(() => {
      this.loading = false;
      this.success = true;
      this.contactForm.reset();
      this.submitted = false;
    }, 1500);
  }

  faqs = [
    {
      question: 'ما هي سياسة الإرجاع؟',
      answer:
        'يمكنك إرجاع المنتجات غير المستخدمة في غضون 14 يومًا من تاريخ الشراء مع تقديم إيصال الشراء الأصلي.'
    },
    {
      question: 'كم تستغرق عملية التوصيل؟',
      answer:
        'يتم التوصيل عادةً خلال 2-3 أيام عمل داخل المدن الرئيسية و 4-7 أيام للمناطق البعيدة.'
    },
    {
      question: 'هل تقدمون ضمانًا على المنتجات؟',
      answer:
        'نعم، تأتي جميع منتجاتنا مع ضمان المصنّع الأصلي ونقدم أيضًا ضمانًا إضافيًا على بعض المنتجات المختارة.'
    },
    {
      question: 'هل توفرون خدمة تركيب قطع الغيار؟',
      answer:
        'نعم، نقدم خدمة التركيب في مراكز الخدمة المعتمدة لدينا. يمكنك حجز موعد من خلال الاتصال بخدمة العملاء.'
    }
  ];
}
