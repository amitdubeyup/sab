import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccWhitelistedComponent } from './acc-whitelisted.component';

describe('AccWhitelistedComponent', () => {
  let component: AccWhitelistedComponent;
  let fixture: ComponentFixture<AccWhitelistedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccWhitelistedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccWhitelistedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
