import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommissionBbpsLiveComponent } from './commission-bbps-live.component';

describe('CommissionBbpsLiveComponent', () => {
  let component: CommissionBbpsLiveComponent;
  let fixture: ComponentFixture<CommissionBbpsLiveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommissionBbpsLiveComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CommissionBbpsLiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
