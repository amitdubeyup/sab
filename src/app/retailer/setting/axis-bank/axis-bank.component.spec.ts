import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AxisBankComponent } from './axis-bank.component';

describe('AxisBankComponent', () => {
  let component: AxisBankComponent;
  let fixture: ComponentFixture<AxisBankComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AxisBankComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AxisBankComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
