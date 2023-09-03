import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DistributorStatementComponent } from './distributor-statement.component';

describe('DistributorStatementComponent', () => {
  let component: DistributorStatementComponent;
  let fixture: ComponentFixture<DistributorStatementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DistributorStatementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DistributorStatementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
