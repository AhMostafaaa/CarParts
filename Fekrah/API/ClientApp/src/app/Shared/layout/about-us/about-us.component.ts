import { Component, OnInit } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.scss']
})
export class AboutUsComponent implements OnInit {

  // محتوى الصفحة
  hero = {
    title: 'من نحن',
    subtitle: 'شريكك الموثوق في عالم قطع غيار السيارات'
  };

  story = {
    icon: 'fas fa-history',
    title: 'قصتنا',
    paragraphs: [
      'تأسست شركة قطع غيار في عام 2020 بهدف توفير قطع غيار عالية الجودة لجميع أنواع السيارات. بدأنا كمشروع صغير وتوسعنا لنصبح واحدة من أكبر منصات بيع قطع غيار السيارات في المنطقة. خلال مسيرتنا، قمنا ببناء شبكة قوية من الموردين والمصنعين لنضمن توفير أفضل المنتجات لعملائنا.',
      'مع التزامنا المستمر بالجودة والخدمة المتميزة، نفخر اليوم بخدمة آلاف العملاء شهرياً وتوفير أكثر من 50,000 قطعة غيار مختلفة عبر منصتنا الإلكترونية.'
    ]
  };

  vision = {
    icon: 'fas fa-bullseye',
    title: 'رؤيتنا',
    paragraphs: [
      'نسعى لأن نكون المنصة الرائدة في توفير قطع غيار السيارات عالية الجودة، مع تقديم تجربة تسوق سلسة وممتعة لعملائنا. هدفنا هو تبسيط عملية العثور على قطع الغيار المناسبة لكل سيارة، بأسعار تنافسية وبأفضل جودة ممكنة.',
      'كما نطمح لتوسيع نطاق خدماتنا لتشمل جميع أنحاء المنطقة، ولنكون الخيار الأول للمستهلكين والمحترفين في مجال السيارات.'
    ]
  };

  values = {
    icon: 'fas fa-handshake',
    title: 'قيمنا',
    items: [
      { label: 'الجودة', description: 'نلتزم بتوفير قطع غيار ذات جودة عالية تضمن أداء وسلامة سيارتك.' },
      { label: 'الأمانة', description: 'نؤمن بالشفافية في التعامل مع عملائنا وموردينا.' },
      { label: 'خدمة العملاء', description: 'نهتم برضا العملاء ونسعى دائماً لتقديم أفضل تجربة ممكنة.' },
      { label: 'الابتكار', description: 'نواكب التطور التكنولوجي لتحسين خدماتنا وتبسيط تجربة التسوق.' },
      { label: 'الالتزام', description: 'نلتزم بمواعيد التسليم وضمان توفر المنتجات التي نعرضها.' }
    ]
  };

  stats = [
    { icon: 'fas fa-users', number: '10,000+', title: 'عميل راضٍ' },
    { icon: 'fas fa-box-open', number: '50,000+', title: 'قطعة غيار' },
    { icon: 'fas fa-car', number: '500+', title: 'طراز سيارة' },
    { icon: 'fas fa-store', number: '100+', title: 'متجر شريك' }
  ];

  team = {
    title: 'فريق العمل',
    intro: 'نحن فريق متكامل من الخبراء في مجال قطع غيار السيارات، نسعى دائماً لتقديم أفضل خدمة لعملائنا.',
    members: [
      { name: '', title: '', bio: '' },
      { name: '', title: '', bio: '' },
      { name: '', title: '', bio: '' },
      { name: '', title: '', bio: '' }
    ]
  };

  partners = {
    title: 'شركاؤنا',
    description: 'نتعاون مع أفضل الموردين والمصنعين  لتوفير منتجات عالية الجودة:',
    list: ['بوش', 'دينسو', 'NGK', 'فالو', 'موبيل', 'كاسترول']
  };

  cta = {
    title: 'انضم إلينا اليوم',
    description: 'ابدأ رحلتك مع قطع غيار واحصل على أفضل القطع لسيارتك بأسعار تنافسية',
    button: 'تسجيل حساب جديد'
  };

  constructor(private titleService: Title, private metaService: Meta) {}

  ngOnInit(): void {
    this.titleService.setTitle('من نحن | قطع غيار');

    this.metaService.updateTag({
      name: 'description',
      content: 'تعرف على شركة قطع غيار، المتخصصة في توفير قطع غيار سيارات أصلية وعالية الجودة. رؤيتنا، قيمنا، وفريق العمل المتخصص.'
    });
  }
}
