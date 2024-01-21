import { TestBed } from '@angular/core/testing';

import { TubricService } from './tubric.service';

describe('TubricService', () => {
  let service: TubricService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TubricService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
