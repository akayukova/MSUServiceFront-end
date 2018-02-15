import { TestBed, async, inject } from '@angular/core/testing';

import { PublicPageGuard } from './public-page.guard';

describe('PublicPageGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PublicPageGuard]
    });
  });

  it('should ...', inject([PublicPageGuard], (guard: PublicPageGuard) => {
    expect(guard).toBeTruthy();
  }));
});
