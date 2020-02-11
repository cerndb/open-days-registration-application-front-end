import { TestBed } from '@angular/core/testing';

import { PointOfOriginService } from './point-of-origin.service';

describe('PointOfOriginService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PointOfOriginService = TestBed.get(PointOfOriginService);
    expect(service).toBeTruthy();
  });
});
