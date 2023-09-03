import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RefundPendingComponent } from './refund-pending.component';

describe('RefundPendingComponent', () => {
  let component: RefundPendingComponent;
  let fixture: ComponentFixture<RefundPendingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RefundPendingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RefundPendingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
