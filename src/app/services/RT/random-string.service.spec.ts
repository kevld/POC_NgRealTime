import { TestBed } from '@angular/core/testing';

import { RandomStringService } from './random-string.service';

describe('RandomStringService', () => {
  let service: RandomStringService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RandomStringService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
