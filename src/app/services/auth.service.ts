import { Injectable } from '@angular/core';
import { JWTService } from './jwt.service';
import { CartService } from './cart.service';
import { EventWatchlistService } from './event-watchlist.service';
import { XSRFService } from './xsrf.service';
import { AffiliateService } from './affiliate.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private token: JWTService, private cart: CartService, private watchlist: EventWatchlistService, private xsrf: XSRFService, private affiliate: AffiliateService) { }

  isLoggedIn(type: string) {
    return this.token.exists() && !this.token.isExpired() && this.token.getUserType() == type;
  }

  get exists () {
    return this.token.exists();
  }
  get expired () {
    return this.token.isExpired();
  }

  user() {
    return this.token.exists() ? {
      type: this.token.getUserType(),
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
    this.watchlist.remove();
    this.xsrf.delete();
    this.affiliate.remove();
  }
}
