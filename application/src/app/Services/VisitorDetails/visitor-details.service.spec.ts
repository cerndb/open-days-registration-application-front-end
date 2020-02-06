import { TestBed } from '@angular/core/testing';

import { VisitorDetailsService } from './visitor-details.service';

describe('VisitorDetailsService', () => {
   beforeEach(() => TestBed.configureTestingModule({}));

   it('should be created', () => {
      const service: VisitorDetailsService = TestBed.get(VisitorDetailsService);
      expect(service).toBeTruthy();
   });
});
