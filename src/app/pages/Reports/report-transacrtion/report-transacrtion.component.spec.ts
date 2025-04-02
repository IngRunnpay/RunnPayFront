import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportTransacrtionComponent } from './report-transacrtion.component';

describe('ReportTransacrtionComponent', () => {
  let component: ReportTransacrtionComponent;
  let fixture: ComponentFixture<ReportTransacrtionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReportTransacrtionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReportTransacrtionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
