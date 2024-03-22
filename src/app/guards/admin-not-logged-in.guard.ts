import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const adminNotLoggedInGuard: CanActivateFn = (route, state) => {
  let auth = inject(AuthService);


  if (auth.isLoggedIn('admin')) {
    document.location.href = 'admin';
    return false;
  }

  return true;
};
