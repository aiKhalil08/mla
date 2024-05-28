import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { format } from 'date-fns';
import { Fulfillment } from 'src/app/interfaces/fulfillment';
import { FulfillmentService } from 'src/app/services/fulfillment.service';

@Component({
  selector: 'app-fulfillment',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './fulfillment.component.html',
  styleUrls: ['./fulfillment.component.css']
})
export class FulfillmentComponent {
  id: number;
  loaded: boolean = false;
  fulfillment: Fulfillment;
  errorMessage: string;
  fulfilled: boolean = false;
  submitted_approve: boolean = false;
  submitted_reject: boolean = false;
  error: string;
  account_details: {account_name: string, account_number: string, bank_name: string} = null;

  constructor(private route: ActivatedRoute, private fulfillmentService: FulfillmentService) {}



  ngOnInit(): void {
    let paramObservable = this.route.paramMap;
    paramObservable.subscribe((param) => {
      this.id = Number(atob(param.get('id')));
      this.getFulfillment();
    }); 
  }

  getFulfillment() {
    this.fulfillmentService.get(this.id).subscribe({
      next: (response) => {
        this.loaded = true;
        if (response.status == 'failed') {
          this.errorMessage = response.message;
          return;
        }


        this.fulfillment = response.fulfillment;
        this.account_details = this.fulfillment.account_details;
        // console.log(this.account_details)

      }
    });
  }


  fulfill(fulfillment: '1' | '2') {

    if (fulfillment == '1') this.submitted_approve = true;
    if (fulfillment == '2') this.submitted_reject = true;

    let form = new FormData();

    form.append('id', String(this.id));
    form.append('fulfillment', fulfillment);

    this.fulfillmentService.fulfill(form).subscribe({
      next: (response) => {
        if (fulfillment == '1') this.submitted_approve = false;
        if (fulfillment == '2') this.submitted_reject = false;
        if (response.status == 'failed') {
          this.error = response.message;
          return;
        }

        this.fulfilled = true;
      }
    });
  }

  formatCurrency(number: string | number) {
    return Number(number).toLocaleString('en-NG', {style: 'currency', currency: 'NGN'});
  }


  formatDate(date: string) {
    return format(date, 'do MMMM, yyyy');
  }
}
