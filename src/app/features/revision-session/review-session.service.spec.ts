import { TestBed } from '@angular/core/testing';

import { ReviewSessionService } from './review-session.service';

describe('ReviewSessionService', () => {
  let service: ReviewSessionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReviewSessionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
