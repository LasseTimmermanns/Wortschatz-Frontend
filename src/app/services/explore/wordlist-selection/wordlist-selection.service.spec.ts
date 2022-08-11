import { TestBed } from '@angular/core/testing';

import { WordlistSelectionService } from './wordlist-selection.service';

describe('WordlistSelectionService', () => {
  let service: WordlistSelectionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WordlistSelectionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
