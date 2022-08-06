import { TestBed } from '@angular/core/testing';

import { WordlistCreatorService } from './wordlist-creator.service';

describe('WordlistsCreatorService', () => {
  let service: WordlistCreatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WordlistCreatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
