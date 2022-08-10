import { TestBed } from '@angular/core/testing';

import { LearnWordlistService } from './learn-wordlist.service';

describe('LearnWordlistService', () => {
  let service: LearnWordlistService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LearnWordlistService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
