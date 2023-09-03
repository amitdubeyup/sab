import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageFundReportComponent } from './manage-fund-report.component';

describe('ManageFundReportComponent', () => {
  let component: ManageFundReportComponent;
  let fixture: ComponentFixture<ManageFundReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageFundReportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageFundReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
