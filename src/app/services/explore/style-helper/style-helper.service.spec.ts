import { TestBed } from '@angular/core/testing';

import { StyleHelperService } from './style-helper.service';

describe('StyleHelperService', () => {
  let service: StyleHelperService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StyleHelperService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
