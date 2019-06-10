import { TestBed } from '@angular/core/testing';

import { ArmiesFactoryService } from './armies-factory.service';

describe('ArmiesFactoryService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ArmiesFactoryService = TestBed.get(ArmiesFactoryService);
    expect(service).toBeTruthy();
  });
});
