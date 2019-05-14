import { TestBed } from '@angular/core/testing';

import { LoggedGuard } from './logged.guard';

describe('LoggedGuard', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LoggedGuard = TestBed.get(LoggedGuard);
    expect(service).toBeTruthy();
  });
});
