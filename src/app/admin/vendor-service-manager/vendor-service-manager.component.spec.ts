import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorServiceManagerComponent } from './vendor-service-manager.component';

describe('VendorServiceManagerComponent', () => {
  let component: VendorServiceManagerComponent;
  let fixture: ComponentFixture<VendorServiceManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VendorServiceManagerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VendorServiceManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
