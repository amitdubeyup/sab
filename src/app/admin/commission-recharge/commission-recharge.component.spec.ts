import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommissionRechargeComponent } from './commission-recharge.component';

describe('CommissionRechargeComponent', () => {
  let component: CommissionRechargeComponent;
  let fixture: ComponentFixture<CommissionRechargeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommissionRechargeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CommissionRechargeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
