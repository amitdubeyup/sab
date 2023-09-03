import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KycDetailsApproveComponent } from './kyc-details-approve.component';

describe('KycDetailsApproveComponent', () => {
  let component: KycDetailsApproveComponent;
  let fixture: ComponentFixture<KycDetailsApproveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KycDetailsApproveComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KycDetailsApproveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
