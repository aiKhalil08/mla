import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const userNotExternalGuard: CanActivateFn = (route, state) => {
  let auth = inject(AuthService);

  if (!auth.user().hasRole('external_user') && !auth.user().hasRole('super_admin')) {
    return true;
  }

  return false;
};
