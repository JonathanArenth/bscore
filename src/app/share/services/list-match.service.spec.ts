import { TestBed } from '@angular/core/testing';

import { ListMatchService } from './list-match.service';

describe('ListMatchService', () => {
  let service: ListMatchService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ListMatchService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
