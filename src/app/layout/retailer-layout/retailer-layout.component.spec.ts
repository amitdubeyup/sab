import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RetailerLayoutComponent } from './retailer-layout.component';

describe('RetailerLayoutComponent', () => {
  let component: RetailerLayoutComponent;
  let fixture: ComponentFixture<RetailerLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RetailerLayoutComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RetailerLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
