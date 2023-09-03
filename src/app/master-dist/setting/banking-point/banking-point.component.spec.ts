import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BankingPointComponent } from './banking-point.component';

describe('BankingPointComponent', () => {
  let component: BankingPointComponent;
  let fixture: ComponentFixture<BankingPointComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BankingPointComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BankingPointComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
