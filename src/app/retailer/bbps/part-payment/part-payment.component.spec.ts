import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartPaymentComponent } from './part-payment.component';

describe('PartPaymentComponent', () => {
  let component: PartPaymentComponent;
  let fixture: ComponentFixture<PartPaymentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PartPaymentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PartPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
