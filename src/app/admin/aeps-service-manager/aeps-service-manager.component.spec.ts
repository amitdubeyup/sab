import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AepsServiceManagerComponent } from './aeps-service-manager.component';

describe('AepsServiceManagerComponent', () => {
  let component: AepsServiceManagerComponent;
  let fixture: ComponentFixture<AepsServiceManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AepsServiceManagerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AepsServiceManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
