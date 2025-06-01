import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PromoTickerComponent } from './promo-ticker.component';

describe('PromoTickerComponent', () => {
  let component: PromoTickerComponent;
  let fixture: ComponentFixture<PromoTickerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PromoTickerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PromoTickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
