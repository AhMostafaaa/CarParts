import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

export interface SupportOption {
  id: number;
  title: string;
  description: string;
  icon: string;
  contactMethod: string;
  contactValue: string;
  available: string;
  color: string;
}

export interface ContactFormData {
  fullName: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}

@Component({
  selector: 'app-support',
  templateUrl: './support.component.html',
  styleUrls: ['./support.component.scss']
})
export class SupportComponent implements OnInit {

  supportOptions: SupportOption[] = [
    {
      id: 1,
      title: 'الأسئلة الشائعة',
      description: 'ابحث عن إجابات سريعة للأسئلة الأكثر شيوعاً حول قطع غيار السيارات',
      icon: 'faq',
      contactMethod: 'رابط',
      contactValue: '/faq',
      available: 'متاح 24/7',
      color: '#4285f4'
    },
    {
      id: 2,
      title: 'مركز المساعدة',
      description: 'دليل شامل لاستخدام الموقع، البحث عن القطع، وإتمام الطلبات',
      icon: 'help',
      contactMethod: 'رابط',
      contactValue: '/help-center',
      available: 'متاح 24/7',
      color: '#34a853'
    },
    {
      id: 3,
      title: 'الدردشة المباشرة',
      description: 'تحدث مع خبراء قطع غيار السيارات للحصول على استشارة فورية',
      icon: 'chat',
      contactMethod: 'دردشة',
      contactValue: 'بدء المحادثة',
      available: 'السبت-الخميس 9ص-6م',
      color: '#ea4335'
    },
    {
      id: 4,
      title: 'البريد الإلكتروني',
      description: 'أرسل استفسارك التفصيلي وسنرد عليك مع كافة المعلومات المطلوبة',
      icon: 'email',
      contactMethod: 'إيميل',
      contactValue: 'support@autoparts-eg.com',
      available: 'الرد خلال 24 ساعة',
      color: '#fbbc04'
    },
    {
      id: 5,
      title: 'الهاتف',
      description: 'اتصل بنا مباشرة للحصول على مساعدة فورية في اختيار القطع المناسبة',
      icon: 'phone',
      contactMethod: 'هاتف',
      contactValue: '+20-100-123-4567',
      available: 'السبت-الخميس 9ص-6م',
      color: '#9c27b0'
    },
    {
      id: 6,
      title: 'واتساب',
      description: 'تواصل معنا عبر واتساب لإرسال صور القطع والحصول على عروض أسعار',
      icon: 'whatsapp',
      contactMethod: 'واتساب',
      contactValue: '+20-100-123-4567',
      available: 'السبت-الخميس 9ص-6م',
      color: '#25d366'
    }
  ];

  contactForm!: FormGroup;
  showContactForm = false;
  isSubmitting = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initializeContactForm();
  }

  private initializeContactForm(): void {
    this.contactForm = this.formBuilder.group({
      fullName: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      phone: [''],
      subject: ['', Validators.required],
      message: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  contactSupport(option: SupportOption): void {
    switch (option.contactMethod) {
      case 'رابط':
        this.router.navigate([option.contactValue]);
        break;

      case 'إيميل':
        const subject = encodeURIComponent('استفسار من موقع قطع غيار السيارات');
        const body = encodeURIComponent('مرحباً،\n\nأحتاج للمساعدة في:\n\n');
        window.location.href = `mailto:${option.contactValue}?subject=${subject}&body=${body}`;
        break;

      case 'هاتف':
        window.location.href = `tel:${option.contactValue}`;
        break;

      case 'واتساب':
        this.openWhatsApp();
        break;

      case 'دردشة':
        this.openChat();
        break;

      default:
        console.log('Unknown contact method:', option.contactMethod);
    }
  }

  toggleContactForm(): void {
    this.showContactForm = !this.showContactForm;
    if (!this.showContactForm) {
      this.contactForm.reset();
    }
  }

  async submitContactForm(): Promise<void> {
    if (this.contactForm.valid && !this.isSubmitting) {
      this.isSubmitting = true;

      try {
        const formData: ContactFormData = this.contactForm.value;

        // Here you would typically send the data to your backend service
        // For now, we'll simulate an API call
        await this.simulateFormSubmission(formData);

        // Show success message
        alert('تم إرسال رسالتك بنجاح! سنتواصل معك قريباً.');

        // Reset form and hide it
        this.contactForm.reset();
        this.showContactForm = false;

      } catch (error) {
        console.error('Error submitting form:', error);
        alert('حدث خطأ أثناء إرسال الرسالة. يرجى المحاولة مرة أخرى.');
      } finally {
        this.isSubmitting = false;
      }
    } else {
      // Mark all fields as touched to show validation errors
      Object.keys(this.contactForm.controls).forEach(key => {
        this.contactForm.get(key)?.markAsTouched();
      });
    }
  }

  private simulateFormSubmission(formData: ContactFormData): Promise<void> {
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log('Form submitted:', formData);
        resolve();
      }, 2000);
    });
  }

  callSupport(): void {
    window.location.href = 'tel:+20-100-123-4567';
  }

  openWhatsApp(): void {
    const phoneNumber = '201001234567'; // Remove special characters
    const message = encodeURIComponent('مرحباً، أحتاج للمساعدة في قطع غيار السيارات');
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
    window.open(whatsappUrl, '_blank');
  }

  openChat(): void {
    // Here you would typically initialize your chat widget
    // For example, if using Intercom, Zendesk Chat, or similar
    console.log('Opening chat widget...');

    // Example implementation:
    // if (window.Intercom) {
    //   window.Intercom('show');
    // }

    // Or for a custom chat solution:
    // this.chatService.openChat();

    // For now, we'll show an alert
    alert('ميزة الدردشة المباشرة ستكون متاحة قريباً!');
  }

  // Utility method to check if form field has error
  hasError(fieldName: string, errorType: string): boolean {
    const field = this.contactForm.get(fieldName);
    return !!(field?.errors?.[errorType] && field?.touched);
  }

  // Utility method to get error message for a field
  getErrorMessage(fieldName: string): string {
    const field = this.contactForm.get(fieldName);
    if (!field?.errors || !field?.touched) return '';

    const errors = field.errors;

    if (errors['required']) {
      const fieldLabels: { [key: string]: string } = {
        fullName: 'الاسم الكامل',
        email: 'البريد الإلكتروني',
        subject: 'الموضوع',
        message: 'الرسالة'
      };
      return `${fieldLabels[fieldName]} مطلوب`;
    }

    if (errors['email']) {
      return 'صيغة البريد الإلكتروني غير صحيحة';
    }

    if (errors['minlength']) {
      const requiredLength = errors['minlength'].requiredLength;
      if (fieldName === 'fullName') {
        return `الاسم يجب أن يكون أكثر من ${requiredLength - 1} أحرف`;
      }
      if (fieldName === 'message') {
        return `الرسالة يجب أن تكون أكثر من ${requiredLength - 1} أحرف`;
      }
    }

    return 'يرجى التحقق من البيانات المدخلة';
  }
}
