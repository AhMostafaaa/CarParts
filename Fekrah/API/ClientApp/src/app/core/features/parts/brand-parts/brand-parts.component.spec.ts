import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrandPartsComponent } from './brand-parts.component';

describe('BrandPartsComponent', () => {
  let component: BrandPartsComponent;
  let fixture: ComponentFixture<BrandPartsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BrandPartsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BrandPartsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
