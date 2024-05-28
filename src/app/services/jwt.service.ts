import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { RefreshTokenService } from './refresh-token.service';
import { StorageService } from './storage.service';
import { getUnixTime } from 'date-fns';

@Injectable({
  providedIn: 'root'
})
export class JWTService {

  private token_name = 'token'

  constructor(@Inject('DOMAIN_NAME') private domain_name, private httpClient: HttpClient, private refreshToken: RefreshTokenService, private storage: StorageService) { }


  set (token: string) {
    return this.storage.set(this.token_name, token);
  }
  get () {
    return this.storage.get(this.token_name);
  }
  remove () {
    return this.storage.remove(this.token_name);
  }
  exists() {
    return this.storage.exists(this.token_name);
  }
  
  payload () {
    return JSON.parse(atob(this.get().split('.')[1]))
  }
  isExpired () {
    let payload = this.payload();
    return getUnixTime(new Date()) >= payload.exp;
  }
  rightIssuer(apiAuthType: string) {
    // let tokenIssuer = this.getUserType();
    // return tokenIssuer == apiAuthType;
    return this.getUserRoles().includes(apiAuthType);
  }
  isValid (apiAuthType) {
    if (!this.exists()) return null;
    return !this.isExpired && this.rightIssuer(apiAuthType);
  }
  // getUserType() {
  //   let match_1 = /\/(\w+)\/confirm-email/.exec(this.payload().iss);
  //   let match_2 = /\/(\w+)\/profile/.exec(this.payload().iss);
  //   if (match_1) return match_1[1];
  //   if (match_2) return match_2[1];
  //   else return String(this.payload().iss).match(/.*\/(\w+)$/)[1]
  // }

  getUserRoles() {
    return <string[]>this.payload().roles;
  }
  getUserFirstName() {
    return this.payload().first_name;
  }
  getUserLastName() {
    return this.payload().last_name;
  }
  getUserEmail() {
    return this.payload().email;
  }
  getUserId() {
    return this.payload().sub;
  }
  getUserEmailVerified() {
    return this.payload()['email_verified'];
  }
  getUserImageUrl() {
    return this.payload()['image_url'];
  }
  // getUserType() {
  //   return this.payload().type;
  // }
  // refresh () {
  //   let status = false;
  //   console.log('befoer refresh payload is ', this.payload())
  //   let refresh_url = `${this.domain_name}/refresh-token?refresh=${this.refreshToken.get()}`;
  //   this.httpClient.get<{'access_token': string}> (refresh_url).pipe(
  //     tap(response => {this.set(response.access_token)}),
  //     take(1)
  //   ).subscribe();


  //   console.log('after refresh, the payload is new :', this.payload());
  //   // this.httpClient.get<{'access_token': string}> (refresh_url).subscribe({
  //   //   next: (response) => {
  //   //     console.log('in token refresh');
  //   //     this.set(response.access_token);
  //   //     console.log('after refresh payload is ', this.payload())
  //   //     status = true;
  //   //   }
  //   // });
  //   return true;
  // }
}
