import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { StorageService } from '../services/storage.service';
import { JWTService } from '../services/jwt.service';
import { StudentService } from '../services/student.service';

export const emailVerifiedGuard: CanActivateFn = (route, state) => {
  let auth = inject(AuthService);
  let router = inject(Router);
  let storage = inject(StorageService);
  let studentService = inject(StudentService);


  if (!auth.user().has_verified_email) {
    if (auth.user().roles.includes('student')) {
      studentService.send_otp(auth.user().email).subscribe({
        next: (response) => {
          if (response.status == 'failed') document.location.href = '/';
        }
      });
    }
    storage.set('intended', document.location.href);
    router.navigate(['/verify-email']);
    return false;
  }

  return true;
}