import { TestBed } from '@angular/core/testing';

import { PeliculasjsonService } from './peliculasjson.service';

describe('PeliculasjsonService', () => {
  let service: PeliculasjsonService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PeliculasjsonService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
