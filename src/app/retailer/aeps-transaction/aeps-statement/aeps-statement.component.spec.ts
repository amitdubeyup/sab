import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AepsStatementComponent } from './aeps-statement.component';

describe('AepsStatementComponent', () => {
  let component: AepsStatementComponent;
  let fixture: ComponentFixture<AepsStatementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AepsStatementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AepsStatementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
