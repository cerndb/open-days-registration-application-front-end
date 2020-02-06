import { TestBed } from '@angular/core/testing';

import { MessageHandlingService } from './message-handling.service';

describe('MessageHandlingService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MessageHandlingService = TestBed.get(MessageHandlingService);
    expect(service).toBeTruthy();
  });
});
