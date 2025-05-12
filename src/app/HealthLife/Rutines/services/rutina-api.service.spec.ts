import { TestBed } from '@angular/core/testing';

import {RutinaApiService} from './rutina-api.service';

describe('RutinaApiService', () => {
  let service: RutinaApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RutinaApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
