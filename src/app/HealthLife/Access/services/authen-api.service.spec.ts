import { TestBed } from '@angular/core/testing';

import { AuthenApiService } from './authen-api.service';

describe('AuthenApiService', () => {
  let service: AuthenApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthenApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
