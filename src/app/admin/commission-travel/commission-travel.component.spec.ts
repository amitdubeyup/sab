import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommissionTravelComponent } from './commission-travel.component';

describe('CommissionTravelComponent', () => {
  let component: CommissionTravelComponent;
  let fixture: ComponentFixture<CommissionTravelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommissionTravelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CommissionTravelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
