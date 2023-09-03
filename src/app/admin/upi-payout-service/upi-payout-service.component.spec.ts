import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpiPayoutServiceComponent } from './upi-payout-service.component';

describe('UpiPayoutServiceComponent', () => {
  let component: UpiPayoutServiceComponent;
  let fixture: ComponentFixture<UpiPayoutServiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpiPayoutServiceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpiPayoutServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
