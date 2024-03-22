import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RefreshTokenService {

  private token_name = 'refresh';

  constructor() { }


  set (token: string) {
    localStorage.setItem(this.token_name, token);
  }
  get () {
    return localStorage.getItem(this.token_name);
  }
  remove () {
    return localStorage.removeItem(this.token_name);
  }
}
