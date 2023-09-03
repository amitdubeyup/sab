import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommissionKycComponent } from './commission-kyc.component';

describe('CommissionKycComponent', () => {
  let component: CommissionKycComponent;
  let fixture: ComponentFixture<CommissionKycComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommissionKycComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CommissionKycComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
