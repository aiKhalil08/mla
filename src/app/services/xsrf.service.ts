import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class XSRFService {

  constructor() { }

  get() {
    let cookies = document.cookie.split('; ');
    for (let cookie of cookies) {
        let [cookieName, cookieValue] = cookie.split('=');
        if (cookieName === 'XSRF-TOKEN') {
            return decodeURIComponent(cookieValue);
        }
    }
    return '';
  }

  delete() {
    document.cookie = 'XSRF-TOKEN=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/;';
  }
}
