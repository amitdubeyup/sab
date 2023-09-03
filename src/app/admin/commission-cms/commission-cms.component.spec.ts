import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommissionCmsComponent } from './commission-cms.component';

describe('CommissionCmsComponent', () => {
  let component: CommissionCmsComponent;
  let fixture: ComponentFixture<CommissionCmsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommissionCmsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CommissionCmsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
