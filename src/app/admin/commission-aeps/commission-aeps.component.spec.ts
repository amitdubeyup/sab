import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommissionAepsComponent } from './commission-aeps.component';

describe('CommissionAepsComponent', () => {
  let component: CommissionAepsComponent;
  let fixture: ComponentFixture<CommissionAepsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommissionAepsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CommissionAepsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
