import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FundReverseComponent } from './fund-reverse.component';

describe('FundReverseComponent', () => {
  let component: FundReverseComponent;
  let fixture: ComponentFixture<FundReverseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FundReverseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FundReverseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
