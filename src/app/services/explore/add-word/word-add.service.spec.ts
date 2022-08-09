import { TestBed } from '@angular/core/testing';

import { WordAddService } from './word-add.service';

describe('WordAddService', () => {
  let service: WordAddService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WordAddService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
