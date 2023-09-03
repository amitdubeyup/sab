import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RechargeUtilityComponent } from './recharge-utility.component';

describe('RechargeUtilityComponent', () => {
  let component: RechargeUtilityComponent;
  let fixture: ComponentFixture<RechargeUtilityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RechargeUtilityComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RechargeUtilityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
