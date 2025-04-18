import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentResumeComponent } from './payment-resume.component';

describe('PaymentResumeComponent', () => {
  let component: PaymentResumeComponent;
  let fixture: ComponentFixture<PaymentResumeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaymentResumeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaymentResumeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
