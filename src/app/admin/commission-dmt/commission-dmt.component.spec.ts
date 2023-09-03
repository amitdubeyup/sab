import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommissionDmtComponent } from './commission-dmt.component';

describe('CommissionDmtComponent', () => {
  let component: CommissionDmtComponent;
  let fixture: ComponentFixture<CommissionDmtComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommissionDmtComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CommissionDmtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
