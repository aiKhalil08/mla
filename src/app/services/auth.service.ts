import { Injectable } from '@angular/core';
import { JWTService } from './jwt.service';
import { CartService } from './cart.service';
import { AffiliateService } from './affiliate.service';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private token: JWTService, private cart: CartService, private storageService: StorageService, private affiliate: AffiliateService) { }

  isLoggedIn() {
    return this.token.exists() && !this.token.isExpired();// && this.token.getUserRoles().includes(role);
  }

  get exists () {
    return this.token.exists();
  }
  get expired () {
    return this.token.isExpired();
  }

  hasRole(role: string) {
    return this.token.getUserRoles().includes(role);
  }

  user() {
    return this.token.exists() ? {
      roles: this.token.getUserRoles(),
      hasRole: (role: string) => this.token.getUserRoles().includes(role),
      first_name: this.token.getUserFirstName(),
      last_name: this.token.getUserLastName(),
      email: this.token.getUserEmail(),
      image_url: this.token.getUserImageUrl(),
      has_verified_email: this.token.getUserEmailVerified(),
    } : null;
  }

  logout() {
    this.token.remove();
    this.cart.remove();
    this.storageService.remove('as');
    this.affiliate.remove();
  }
}
