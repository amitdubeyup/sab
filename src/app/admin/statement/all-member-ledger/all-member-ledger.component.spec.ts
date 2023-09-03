import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllMemberLedgerComponent } from './all-member-ledger.component';

describe('AllMemberLedgerComponent', () => {
  let component: AllMemberLedgerComponent;
  let fixture: ComponentFixture<AllMemberLedgerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllMemberLedgerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllMemberLedgerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
