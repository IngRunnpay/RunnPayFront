import { ComponentFixture, TestBed } from '@angular/core/testing';

import { paymentInformation } from './payment-information.component';

describe('payment-information.component', () => {
  let component: paymentInformation;
  let fixture: ComponentFixture<paymentInformation>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [paymentInformation]
    })
    .compileComponents();

    fixture = TestBed.createComponent(paymentInformation);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
