import { TestBed } from '@angular/core/testing';

import { WordlistRequestService } from './wordlist-request.service';

describe('WordlistRequestService', () => {
  let service: WordlistRequestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WordlistRequestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
