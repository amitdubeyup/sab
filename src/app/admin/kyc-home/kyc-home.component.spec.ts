import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KycHomeComponent } from './kyc-home.component';

describe('KycHomeComponent', () => {
  let component: KycHomeComponent;
  let fixture: ComponentFixture<KycHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KycHomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KycHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
