import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuSummaryComponent } from './bu-summary.component';

describe('BuSummaryComponent', () => {
  let component: BuSummaryComponent;
  let fixture: ComponentFixture<BuSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BuSummaryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BuSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
