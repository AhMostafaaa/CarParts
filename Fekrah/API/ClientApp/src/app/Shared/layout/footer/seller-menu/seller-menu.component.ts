import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-seller-menu',
  templateUrl: './seller-menu.component.html',
  styleUrls: ['./seller-menu.component.scss']
})
export class SellerMenuComponent {
  sellerForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.sellerForm = this.fb.group({
      companyName: ['', Validators.required],
      businessType: ['', Validators.required],
      location: ['', Validators.required],
      partsType: ['', Validators.required],
      fullName: ['', Validators.required],
      phone: ['', [Validators.required, Validators.pattern(/^01[0-9]{9}$/)]],
      email: ['', [Validators.required, Validators.email]],
      address: ['', Validators.required],
      notes: [''],
      agreeTerms: [false, Validators.requiredTrue]
    });
  }

  onSubmit(): void {
    if (this.sellerForm.valid) {
      alert('تم إرسال طلبك بنجاح! سيتم التواصل معك قريباً.');
      this.sellerForm.reset();
    }
  }
}
