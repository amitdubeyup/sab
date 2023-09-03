import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrintBoundComponent } from './print-bound.component';

describe('PrintBoundComponent', () => {
  let component: PrintBoundComponent;
  let fixture: ComponentFixture<PrintBoundComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrintBoundComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrintBoundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
