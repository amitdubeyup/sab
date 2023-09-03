import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RtSummaryComponent } from './rt-summary.component';

describe('RtSummaryComponent', () => {
  let component: RtSummaryComponent;
  let fixture: ComponentFixture<RtSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RtSummaryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RtSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
