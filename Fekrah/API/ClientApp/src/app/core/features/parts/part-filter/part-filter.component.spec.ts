import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartFilterComponent } from './part-filter.component';

describe('PartFilterComponent', () => {
  let component: PartFilterComponent;
  let fixture: ComponentFixture<PartFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PartFilterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PartFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
