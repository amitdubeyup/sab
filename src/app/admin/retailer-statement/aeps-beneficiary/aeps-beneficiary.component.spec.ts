import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AepsBeneficiaryComponent } from './aeps-beneficiary.component';

describe('AepsBeneficiaryComponent', () => {
  let component: AepsBeneficiaryComponent;
  let fixture: ComponentFixture<AepsBeneficiaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AepsBeneficiaryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AepsBeneficiaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
