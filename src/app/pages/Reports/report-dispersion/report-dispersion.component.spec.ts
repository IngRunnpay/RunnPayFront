import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportDispersionComponent } from './report-dispersion.component';

describe('ReportTransacrtionComponent', () => {
  let component: ReportDispersionComponent;
  let fixture: ComponentFixture<ReportDispersionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReportDispersionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReportDispersionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
