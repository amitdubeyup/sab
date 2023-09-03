import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RetailerCommisionComponent } from './retailer-commision.component';

describe('RetailerCommisionComponent', () => {
  let component: RetailerCommisionComponent;
  let fixture: ComponentFixture<RetailerCommisionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RetailerCommisionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RetailerCommisionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
