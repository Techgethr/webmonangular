import { TestBed } from '@angular/core/testing';

import { WebmonetizationLibService } from './webmonetization-lib.service';

describe('WebmonetizationLibService', () => {
  let service: WebmonetizationLibService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WebmonetizationLibService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
