import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryPartsComponent } from './category-parts.component';

describe('CategoryPartsComponent', () => {
  let component: CategoryPartsComponent;
  let fixture: ComponentFixture<CategoryPartsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CategoryPartsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryPartsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
