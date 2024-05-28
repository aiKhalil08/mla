// import { inject } from '@angular/core';
// import { CanActivateFn, Router } from '@angular/router';
// import { AuthService } from '../services/auth.service';
// import { StorageService } from '../services/storage.service';
// import { JWTService } from '../services/jwt.service';

// export const studentAuthGuard: CanActivateFn = (route, state) => {
//   let auth = inject(AuthService);
//   let storage = inject(StorageService);
//   // let jwt = inject(JWTService);

//   if (auth.isLoggedIn('student')) {
//     return true;
//   } else if (auth.isLoggedIn('admin')) {
//     document.location.href = 'login';
//     return false;
//   }

//   if (auth.exists) {
//     storage.set('expired_session', 'true');
//     auth.logout();
//   }


//   storage.set('intended', document.location.href);

//   document.location.href = 'login';
//   return false;
// }
