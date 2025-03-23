import { inject } from '@angular/core';
import { CanActivateFn, CanMatch, CanMatchFn } from '@angular/router';
import { JwtService } from '../services/jwt.service';

export const authGuard: CanMatchFn = (route, state) => {
  const authService = inject(JwtService);
  return authService.getAuthToken();
};
