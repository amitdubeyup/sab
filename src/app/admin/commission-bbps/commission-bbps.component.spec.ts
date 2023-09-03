import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommissionBbpsComponent } from './commission-bbps.component';

describe('CommissionBbpsComponent', () => {
  let component: CommissionBbpsComponent;
  let fixture: ComponentFixture<CommissionBbpsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommissionBbpsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CommissionBbpsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
