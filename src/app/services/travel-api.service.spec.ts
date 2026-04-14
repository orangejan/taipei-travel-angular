import { TestBed } from '@angular/core/testing';

import { TravelApiService } from './travel-api.service';

describe('TravelApiService', () => {
  let service: TravelApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TravelApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
