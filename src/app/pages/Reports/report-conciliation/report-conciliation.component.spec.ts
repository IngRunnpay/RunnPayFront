import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportConciliationComponent } from './report-conciliation.component';

describe('ReportConciliationComponent', () => {
  let component: ReportConciliationComponent;
  let fixture: ComponentFixture<ReportConciliationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReportConciliationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReportConciliationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
