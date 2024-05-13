import { TestBed } from '@angular/core/testing';

import { FrameworkdataService } from './frameworkdata.service';

describe('FrameworkdataService', () => {
  let service: FrameworkdataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FrameworkdataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
