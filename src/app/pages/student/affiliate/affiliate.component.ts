import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { format, getUnixTime } from 'date-fns';
import AffiliatePortal from 'src/app/interfaces/affiliate-portal';
import { AffiliateService } from 'src/app/services/affiliate.service';

@Component({
  selector: 'app-affiliate',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './affiliate.component.html',
  styleUrls: ['./affiliate.component.css']
})
export class AffiliateComponent implements OnInit {

  processing_become_affiliate: boolean = false;
  processing_renew_code: boolean = false;
  referral_code: string = null;
  // has_become_affiliate: boolean = false;
  affiliate_portal: AffiliatePortal;
  loading_affiliate_portal: boolean = false;

  user_is_affiliate: boolean;

  constructor(private affiliateService: AffiliateService, private router: Router) {}


  ngOnInit(): void {
    this.load_affiliate_portal();
  }


  get is_affiliate() {
    // console.log(this.affiliateService.user_is_affiliate())
    // return this.affiliateService.user_is_affiliate();
    return this.user_is_affiliate;
    // return false;
    // return this.auth.user().is_affiliate;
  }


  become_affiliate() {
    this.processing_become_affiliate = true;
    this.affiliateService.create_referral_code().subscribe({
      next: (response) => {
        this.processing_become_affiliate = false;
        // console.log(response)
        // this.affiliateService.set_affiliate(response.affiliate);
        this.user_is_affiliate = true;
        this.load_affiliate_portal();
      }
    });
  }

  load_affiliate_portal() {
    this.loading_affiliate_portal = true;
    this.affiliateService.load_affiliate_portal().subscribe({
      next: (response) => {
        this.loading_affiliate_portal = false;
        // console.log(response);
        if (response.status == 'failed' && response.message == 'Not affiliate') {
          this.user_is_affiliate = false;
          return;
        }
        // this.affiliate_portal_loaded = true;
        this.user_is_affiliate = true;
        this.affiliate_portal = response.affiliate_portal;
        this.referral_code = this.affiliate_portal.referral_code;
      }
    });
  }

  formatDate(date: string) {
    return format(date, 'do MMMM, yyyy')
  }

  formatCurrency(number: string) {
    return Number(number).toLocaleString('en-NG', {style: 'currency', currency: 'NGN'});
  }

  get payout_history() {
    return this.affiliate_portal.payout_history;
  }

  // get pending_payout() {
  //   return String(this.affiliate_portal.payout_history.filter(record => record.status == 0).map((record => record.amount)).reduce((prev, present) => Number(prev) + Number(present), 0));
  // }


  async copyReferralCode() {
    try {
      await navigator.clipboard.writeText(this.referral_code);
      document.querySelector('#copy_button').innerHTML = 'Copied';
    } catch (e) {
      document.querySelector('#copy_button').innerHTML = 'Couldn\'t copy';
    }
  }


  renewReferralCode() {
    this.processing_renew_code = true;
    this.affiliateService.renew_referral_code().subscribe({
      next: (response) => {
        this.processing_renew_code = false;
        // console.log(response)
        // this.affiliateService.set_affiliate(response.affiliate);
        // console.log(this.affiliateService.get_affiliate());
        // this.referral_code = this.affiliateService.get_affiliate()['referral_code'];
        this.referral_code = response.referral_code;
        // this.has_become_affiliate = true;
        // this.load_affiliate_portal();
      }
    });
  }

  redirect_to_withdraw() {
    this.router.navigate(['/home/withdraw-commission']);
  }
}
