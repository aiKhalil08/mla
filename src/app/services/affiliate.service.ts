import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StorageService } from './storage.service';
import AffiliatePortal from '../interfaces/affiliate-portal';

@Injectable({
  providedIn: 'root'
})
export class AffiliateService {

  constructor(private http: HttpClient, @Inject('DOMAIN_NAME') private domain_name, private storageService: StorageService) { }


  fetch_affiliate_details(code: string) {
    let url = `${this.domain_name}/fetch-affiliate/${code}`;

    return <Observable<{status: string, message?: string, affiliate: {name: string, percentage: string, email: string}}>>this.http.get(url);
  }

  set_affiliate(affiliate: string) {
    this.storageService.set('affiliate', affiliate);
  }


  get_affiliate() {
    if (!this.storageService.exists('affiliate')) return false;
    let encoded_affiliate = this.storageService.get('affiliate');
    return <{is_affiliate: boolean, referral_code: string, referral_code_expired: boolean}>JSON.parse(atob(encoded_affiliate));
  }

  user_is_affiliate() {
    return this.get_affiliate() != false ? this.get_affiliate()['is_affiliate'] : false;
  }


  commission() {
    // console.log('in com', this.get_affiliate()['total_commission'])
    return this.get_affiliate() != false ? this.get_affiliate()['total_commission'] : false;
  }

  create_referral_code() {
    let url = `${this.domain_name}/student/become-affiliate`;

    return <Observable<{status: string, message?:string, affiliate?: string}>> this.http.get(url);
  }

  renew_referral_code() {
    let url = `${this.domain_name}/student/renew-referral-code`;

    return <Observable<{status: string, message?:string, referral_code?: string}>> this.http.get(url);
  }


  load_affiliate_portal() {
    let url = `${this.domain_name}/student/load-affiliate-portal`;

    return <Observable<{status: string, message?:string, affiliate_portal: AffiliatePortal}>> this.http.get(url);

  }

  get_affiliate_portal(email: string) {
    let url = `${this.domain_name}/admin/affiliate/${email}`;

    return <Observable<{status: string, message?:string, affiliate_portal: AffiliatePortal}>> this.http.get(url);

  }

  remove() {
    if (this.storageService.exists('affiliate')) this.storageService.remove('affiliate');
  }

  get_all() {
    let url = `${this.domain_name}/admin/affiliates`;
    return <Observable<{affiliates: {first_name: string; last_name: string; email: string, referral_code: string}[]}>>this.http.get(url);
  }
}
