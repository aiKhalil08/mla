import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import AffiliatePortal from 'src/app/interfaces/affiliate-portal';
import { AffiliateService } from 'src/app/services/affiliate.service';
import { EmptyContentComponent } from "../../../partials/empty-content/empty-content.component";
import { format } from 'date-fns';

@Component({
    selector: 'app-affiliate',
    standalone: true,
    templateUrl: './affiliate.component.html',
    styleUrls: ['./affiliate.component.css'],
    imports: [CommonModule, EmptyContentComponent]
})
export class AffiliateComponent {
  affiliate_portal!: AffiliatePortal;
  fetching: boolean = false;
  no_affiliate: string = null;

  constructor(private affiliatePortal: AffiliateService, private route: ActivatedRoute) {}

  ngOnInit() {
    let email: string;

    this.route.paramMap.subscribe((params) => {
      email = params.get('email');
    });
    
    this.fetch_affiliate(email);
  }

  fetch_affiliate(email: string) {
    this.fetching = true;
    // setTimeout(() => {
      
      this.affiliatePortal.get_affiliate_portal(email).subscribe({
        next: (response) => {
          this.fetching = false;
          if (response.status == 'failed') {
            this.no_affiliate = response.message;
            return;
          }
          this.handleResponse(response);
        }
      });
    // }, 5000);
  }

  handleResponse(response: {
    status: string;
    message?: string;
    affiliate_portal: AffiliatePortal;
  }) {
    this.affiliate_portal = response.affiliate_portal;
  }


  formatDate(date: string) {
    return format(date, 'do MMMM, yyyy');
  }

  formatCurrency(number: string) {
    return Number(number).toLocaleString('en-NG', {style: 'currency', currency: 'NGN'});
  }

  get payout_history() {
    return this.affiliate_portal.payout_history;
  }
}
