import { TestBed } from '@angular/core/testing';

import { RequestPasscodeService } from './request-passcode.service';

describe('RequestPasscodeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RequestPasscodeService = TestBed.get(RequestPasscodeService);
    expect(service).toBeTruthy();
  });
});
