import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { StorageService } from '../services/storage.service';

export const userIsAdminGuard: CanActivateFn = (route, state) => {
  let auth = inject(AuthService);

  if (auth.user().hasRole('admin') || auth.user().hasRole('super_admin')) {
    return true;
  }

  return false;
};
