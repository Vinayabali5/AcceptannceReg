import { TestBed } from '@angular/core/testing';

import { LLDDCategoryService } from './lldd-category.service';

describe('LlddCategoryService', () => {
  let service: LLDDCategoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LLDDCategoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
