import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { TravelApiService } from './travel-api.service';

describe('TravelApiService', () => {
  let service: TravelApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        TravelApiService,
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    });
    service = TestBed.inject(TravelApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
