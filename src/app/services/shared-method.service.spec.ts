import { TestBed } from '@angular/core/testing';

import { SharedMethodService } from './shared-method.service';

describe('SharedMethodService', () => {
  let service: SharedMethodService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SharedMethodService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
