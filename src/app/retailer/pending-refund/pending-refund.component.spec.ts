import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingRefundComponent } from './pending-refund.component';

describe('PendingRefundComponent', () => {
  let component: PendingRefundComponent;
  let fixture: ComponentFixture<PendingRefundComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PendingRefundComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PendingRefundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
