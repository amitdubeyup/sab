import { TestBed } from '@angular/core/testing';

import { RetailerGuard } from './retailer.guard';

describe('RetailerGuard', () => {
  let guard: RetailerGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(RetailerGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
