import { TestBed } from '@angular/core/testing';

import { RandomStringServiceService } from './random-string-service.service';

describe('RandomStringServiceService', () => {
  let service: RandomStringServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RandomStringServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
