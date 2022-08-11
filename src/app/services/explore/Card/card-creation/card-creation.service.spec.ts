import { TestBed } from '@angular/core/testing';

import { CardCreationService } from './card-creation.service';

describe('CardCreationService', () => {
  let service: CardCreationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CardCreationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
