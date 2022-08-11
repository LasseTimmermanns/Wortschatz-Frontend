import { TestBed } from '@angular/core/testing';

import { CardStyleService } from './card-style.service';

describe('CardStyleService', () => {
  let service: CardStyleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CardStyleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
