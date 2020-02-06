import { TestBed } from '@angular/core/testing';

import { ArrivalPointSelectorService } from './arrival-point-selector.service';

describe('ArrivalPointSelectorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ArrivalPointSelectorService = TestBed.get(ArrivalPointSelectorService);
    expect(service).toBeTruthy();
  });
});
