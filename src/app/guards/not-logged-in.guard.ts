import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const notLoggedInGuard: CanActivateFn = (route, state) => {
  let auth = inject(AuthService);


  if (!auth.isLoggedIn('s')) {
    return true;
  }


  document.location.href = 'home';
  return false;
};
