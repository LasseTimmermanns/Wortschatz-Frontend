import { TestBed } from '@angular/core/testing';

import { WordlistSelectionCreatorService } from './wordlist-selection-creator.service';

describe('WordlistsCreatorService', () => {
  let service: WordlistSelectionCreatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WordlistSelectionCreatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
