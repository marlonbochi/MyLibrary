import { TestBed, inject } from '@angular/core/testing';

import { OpenLibraryService } from './openlibrary.service';

describe('UserService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OpenLibraryService]
    });
  });

  it('should be created', inject([OpenLibraryService], (service: OpenLibraryService) => {
    expect(service).toBeTruthy();
  }));
});
