import { TestBed } from '@angular/core/testing';

import { DistributorGuard } from './distributor.guard';

describe('DistributorGuard', () => {
  let guard: DistributorGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(DistributorGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
