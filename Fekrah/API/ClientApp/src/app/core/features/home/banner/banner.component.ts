import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss']
})
export class BannerComponent implements OnInit {

  slides: (string | null)[] = [
    null, // صورة مش موجودة
    null // صورة مش موجودة
  ];

  currentSlide = 0;

  ngOnInit(): void {
    this.autoSlide();
  }

  nextSlide() {
    this.currentSlide = (this.currentSlide + 1) % this.slides.length;
  }

  prevSlide() {
    this.currentSlide = (this.currentSlide - 1 + this.slides.length) % this.slides.length;
  }

  autoSlide() {
    setInterval(() => {
      this.nextSlide();
    }, 4000);
  }

  goToSlide(index: number) {
    this.currentSlide = index;
  }

  
}
