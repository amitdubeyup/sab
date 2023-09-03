import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreditmoneyComponent } from './creditmoney.component';

describe('CreditmoneyComponent', () => {
  let component: CreditmoneyComponent;
  let fixture: ComponentFixture<CreditmoneyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreditmoneyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreditmoneyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
