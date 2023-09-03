import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepositeBankManagerComponent } from './deposite-bank-manager.component';

describe('DepositeBankManagerComponent', () => {
  let component: DepositeBankManagerComponent;
  let fixture: ComponentFixture<DepositeBankManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DepositeBankManagerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DepositeBankManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
