import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { StorageService } from '../services/storage.service';

export const userCanTakeQuizGuard: CanActivateFn = (route, state) => {
  let auth = inject(AuthService);
  let storage = inject(StorageService);

  if (auth.isLoggedIn() && (auth.user().hasRole('external_user') || auth.user().hasRole('student'))) {
    return true;
  }

  if (auth.exists) {
    storage.set('expired_session', 'true');
    auth.logout();
  }


  storage.set('intended', document.location.href);

  document.location.href = 'login';
  return false;
};
