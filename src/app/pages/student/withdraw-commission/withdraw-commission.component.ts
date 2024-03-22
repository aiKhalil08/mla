import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import AffiliatePortal from 'src/app/interfaces/affiliate-portal';
import { AffiliateService } from 'src/app/services/affiliate.service';
import { AuthService } from 'src/app/services/auth.service';
import { PayoutService } from 'src/app/services/payout.service';
import { RedirectButtonComponent } from "../../../partials/buttons/redirect-button/redirect-button.component";

@Component({
    selector: 'app-withdraw-commission',
    standalone: true,
    templateUrl: './withdraw-commission.component.html',
    styleUrls: ['./withdraw-commission.component.css'],
    imports: [CommonModule, ReactiveFormsModule, RedirectButtonComponent]
})
export class WithdrawCommissionComponent implements OnInit {
  withdrawalGroup: FormGroup;
  affiliate: AffiliatePortal = null;
  loading_affiliate_portal: boolean = false;
  payout_amount_error: string;
  message: string;
  formError: string;
  submitted: boolean = false;
  user_name: string;
  not_affiliate: boolean = false;
  invalid_account_number: boolean;


  constructor(private fb: FormBuilder, private affiliateService: AffiliateService, private auth: AuthService, private route: ActivatedRoute, private payoutService: PayoutService) {}

  ngOnInit(): void {
    this.loading_affiliate_portal = true;

    this.affiliateService.load_affiliate_portal().subscribe({
      next: (response) => {
        this.loading_affiliate_portal = false;
        if (response.status == 'success') {

          this.affiliate = response.affiliate_portal
        } else {
          this.not_affiliate = true;
        }
      }
    });

    this.user_name = this.auth.user().first_name+' '+this.auth.user().last_name;

    this.withdrawalGroup = this.fb.group({
      account_number: ['', Validators.required],
      account_name: ['', Validators.required],
      bank_name: ['', Validators.required],
      payout_amount: ['', Validators.required],
    });

  }


  formatCurrency(number: string) {
    return Number(number).toLocaleString('en-NG', {style: 'currency', currency: 'NGN'});
  }


  validatePayoutAmount() {
    // console.log(this.payout_amount.value)
    if (this.payout_amount.value != '' && !/^[0-9.]+$/.test(this.payout_amount.value)) {
      this.payout_amount_error = 'Invalid value';
      return false;
    }
    if (Number(this.payout_amount.value) > Number(this.affiliate.withdrawable_amount)) {
      this.payout_amount_error = 'Payout cannot exceed withdrawable amount.';
      return false;
    }

    if (Number(this.payout_amount.value) < 10000) {
      this.payout_amount_error = 'Payout cannot be less than ₦10,000.00';
      return false;
    }

    this.payout_amount_error = null;
    return true;
  }


  get payout_amount() {
    return <FormControl>this.withdrawalGroup.get('payout_amount');
  }

  get accouunt_number() {
    return <FormControl>this.withdrawalGroup.get('account_number');
  }


  valid_account_number() {
    if (/\D/.test(this.accouunt_number.value)) return false;
    return true;
  }



  get no_errors() {
    // console.log('no erros')
    // if (this.withdrawalGroup.invalid) return false;

    if (!this.valid_account_number()) {
      this.invalid_account_number = true;
      return false;
    }


    this.validatePayoutAmount();
    if (this.payout_amount_error) return false;
    return true;
  }


  onSubmit(form: HTMLFormElement) {
    let proceed_link = <HTMLAnchorElement>document.querySelector('#proceed_link');
    this.submitted = true;
    let form_data = new FormData(form);
    form_data.append('type', 'withdrawal');
    this.payoutService.add_payout(form_data).subscribe({
      next: (response) => {
        this.submitted = false;
        if (response.status == 'success') {
          this.message = `Hello. I am ${this.user_name} and I would like to withdraw ${this.formatCurrency(this.payout_amount.value)} from my earned commisssion. My referral code is ${this.affiliate.referral_code}.`;
          setTimeout(() => {
            
            proceed_link.click();
          }, 0);
        } else {
          this.formError = response.message;
        }
      }
    }); 
  }
}
