import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-part-details',
  templateUrl: './part-details.component.html',
  styleUrls: ['./part-details.component.scss']
})
export class PartDetailsComponent implements OnInit {

  partId: number = 0;
  part: any;
  relatedParts: any[] = [];

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.partId = Number(params.get('id'));
      this.loadPartDetails();
    });
  }

  loadPartDetails(): void {
    // القطعة الأساسية
    this.part = {
      id: this.partId,
      name: 'فلتر زيت أصلي تويوتا',
      description: 'فلتر زيت عالي الجودة يناسب سيارات تويوتا كورولا موديل 2015 إلى 2020.',
      price: 150,
      condition: 'New',
      sellerShopName: 'مركز التوفيق لقطع الغيار',
      imageUrl: 'assets/images/image100_100.png',
      categoryName: 'الفلاتر'
    };

    // منتجات مرتبطة (مؤقتة)
    this.relatedParts = [
      { id: 2, name: 'فلتر زيت بديل تويوتا', price: 120, imageUrl: 'assets/images/image100_100.png' },
      { id: 3, name: 'فلتر هواء تويوتا', price: 180, imageUrl: 'assets/images/image100_100.png' },
      { id: 4, name: 'فلتر بنزين تويوتا', price: 200, imageUrl: 'assets/images/image100_100.png' },
    ];
  }
}
