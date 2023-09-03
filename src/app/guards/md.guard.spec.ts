import { TestBed } from '@angular/core/testing';

import { MdGuard } from './md.guard';

describe('MdGuard', () => {
  let guard: MdGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(MdGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
