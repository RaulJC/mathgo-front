import { TestBed } from '@angular/core/testing';

import { ProblemSharingService } from './problem-sharing.service';

describe('ProblemSharingService', () => {
  let service: ProblemSharingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProblemSharingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
