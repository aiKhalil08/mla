import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const studentNotLoggedInGuard: CanActivateFn = (route, state) => {
  let auth = inject(AuthService);


  if (auth.isLoggedIn()) {
    document.location.href = 'home';
    return false;
  }

  return true;
};
