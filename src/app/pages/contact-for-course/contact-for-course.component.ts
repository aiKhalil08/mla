import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AffiliateService } from 'src/app/services/affiliate.service';
import { AuthService } from 'src/app/services/auth.service';
import { PayoutService } from 'src/app/services/payout.service';
import { RedirectButtonComponent } from "../../partials/buttons/redirect-button/redirect-button.component";
import AffiliatePortal from 'src/app/interfaces/affiliate-portal';

@Component({
    selector: 'app-contact-for-course',
    standalone: true,
    templateUrl: './contact-for-course.component.html',
    styleUrls: ['./contact-for-course.component.css'],
    imports: [ReactiveFormsModule, CommonModule, RedirectButtonComponent]
})
export class ContactForCourseComponent implements OnInit {

  referral_expanded: boolean = false;
  affiliate_expanded: boolean = false;
  contactGroup: FormGroup;
  affiliate: {name: string, percentage: string, email: string} = null;
  fetching_affiliate: boolean = false;
  affiliate_portal: AffiliatePortal;
  fetch_affiliate_error: string;
  payout_amount_error: string;
  referrer_email: any;
  saleGroup: any;
  user: {name: string, email: string};
  course_type: string;
  course_name: string;
  message: string;
  formError: string;
  submitted: boolean = false;
  not_affiliate: boolean;
  loading_affiliate_portal: boolean = false;


  constructor(private fb: FormBuilder, private affiliateService: AffiliateService, private auth: AuthService, private route: ActivatedRoute, private payoutService: PayoutService) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe({
      next: (params)=> {
        if (params['type'] == 'cc') {
          this.course_type = 'Certificate Course';
        } else if (params['type'] == 'ctc') {
          this.course_type = 'Certification Course';
        } else if (params['type'] == 'oc') {
          this.course_type = 'Offshore Course';
        }
        this.course_name = params['name'];
      }
    });


    this.user = {name: this.auth.user().first_name+' '+this.auth.user().last_name, email: this.auth.user().email};


    this.contactGroup = this.fb.group({
      ref_or_affiliate: [false],
      referral_code: ['',],
      payout_amount: [''],
    });

    this.message = `Hello. I am ${this.user.name} and I am chatting you regarding ${this.course_name.toUpperCase()}.`;

    this.load_affiliate_portal();
  }

  load_affiliate_portal() {
    this.loading_affiliate_portal = true;
    this.affiliateService.load_affiliate_portal().subscribe({
      next: (response) => {
        this.loading_affiliate_portal = false;
        if (response.status == 'failed') {
          this.not_affiliate = true;
          return;
        }
        this.affiliate_portal = response.affiliate_portal;
      }
    });
  }

  formatCurrency(number: string) {
    return Number(number).toLocaleString('en-NG', {style: 'currency', currency: 'NGN'});
  }

  fetch_affiliate() {
    this.fetching_affiliate = true;
    let code = this.referral_code.value;
    this.affiliateService.fetch_affiliate_details(code).subscribe({
      next: (response) => {
        this.fetching_affiliate = false;
        if (response.status == 'failed') {
          this.fetch_affiliate_error = response.message;
          this.affiliate = null;
        }
        else {
          // if (response.affiliate.email == this.auth.user().email) {
          //   this.fetch_affiliate_error = 'You cannot refer yourself';
          //   return;
          // }
          this.handleFetchAffiliateResponse(response);
        }
      }
    });
  }

  validatePayoutAmount() {
    // console.log(this.payout_amount.value == '', !!this.payout_amount.value);
    if (this.payout_amount.value != '' && !/^[0-9.]+$/.test(this.payout_amount.value)) {
      this.payout_amount_error = 'Invalid value';
      return false;
    }
    if (Number(this.payout_amount.value) > Number(this.withdrawable_amount)) {
      this.payout_amount_error = 'Payout cannot exceed withdrawable amount';
      return false;
    }

    this.payout_amount_error = null;
    return true;
  }

  get referral_code() {
    return <FormControl>this.contactGroup.get('referral_code');
  }

  get payout_amount() {
    return <FormControl>this.contactGroup.get('payout_amount');
  }

  get ref_or_affiliate() {
    return <FormControl>this.contactGroup.get('ref_or_affiliate');
  }


  get withdrawable_amount() {
    return this.affiliate_portal.withdrawable_amount;
  }

  handleFetchAffiliateResponse(response: { status: string; affiliate: {name: string; percentage: string, email: string} }) {
    this.fetch_affiliate_error = null;
    this.affiliate = response.affiliate;
  }

  get no_errors() {
    if (this.payout_amount_error || this.fetch_affiliate_error) return false;
    return true;
  }


  onSubmit(form: HTMLFormElement) {
    let proceed_link = <HTMLAnchorElement>document.querySelector('#proceed_link');
    this.submitted = true;
    if (this.ref_or_affiliate.value == 'affiliate' && this.payout_amount.value) {
      let form = new FormData;
      form.append('payout_amount', this.payout_amount.value);
      form.append('type', 'purchase');
      this.payoutService.add_payout(form).subscribe({
        next: (response) => {
          this.submitted = false;
          if (response.status == 'success') {
            this.message = `${this.message} I would like to purchase with a payout of ${this.formatCurrency(this.payout_amount.value)}. My referral code is ${this.affiliate_portal.referral_code}`;
            setTimeout(() => {
              
              proceed_link.click();
            }, 0);
          } else {
            this.formError = response.message;
          }
        }
      });
    } else if (this.ref_or_affiliate.value == 'referral' && this.referral_code.value) {
      this.message = `${this.message} I was referred by ${this.affiliate.name} [${this.referral_code.value}].`;
      
      setTimeout(() => {
        
        proceed_link.click();
        this.submitted = false;
      }, 0);
    } else {
        proceed_link.click();
        this.submitted = false;
    }
  }


}
