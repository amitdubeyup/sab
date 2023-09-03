import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommissionVendorComponent } from './commission-vendor.component';

describe('CommissionVendorComponent', () => {
  let component: CommissionVendorComponent;
  let fixture: ComponentFixture<CommissionVendorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommissionVendorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CommissionVendorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
