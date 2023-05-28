import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { AuthGuard } from './auth.guard';

describe('AuthGuard', () => {
  let guard: CanActivateFn;
  let MockRouter


  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        // { provides: }
      ]
    });
    // guard = TestBed.inject(AuthGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
