import { TestBed } from '@angular/core/testing';

import { MobileRenderDeciderService } from './mobile-render-decider.service';

describe('MobileRenderDeciderService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MobileRenderDeciderService = TestBed.get(MobileRenderDeciderService);
    expect(service).toBeTruthy();
  });
});
