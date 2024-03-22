import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { StorageService } from '../services/storage.service';

export const adminAuthGuard: CanActivateFn = (route, state) => {
  let auth = inject(AuthService);
  let storage = inject(StorageService);

  // console.log('in guard and type is',auth.isLoggedIn(), auth.user().type)

  if (auth.isLoggedIn('admin')) {
    return true;
  }
  if (auth.exists) {
    storage.set('expired_session', 'true');
    auth.logout();
  }

  document.location.href = 'login/admin';
  return false;
}