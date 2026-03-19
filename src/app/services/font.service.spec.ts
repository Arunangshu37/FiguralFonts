import { TestBed } from '@angular/core/testing';

import { FontService } from './font.service';

describe('Font', () => {
  let service: FontService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FontService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
