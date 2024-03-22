import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import moment from 'moment';
import { FulfillmentItem } from 'src/app/interfaces/fulfillment';
import { FulfillmentService } from 'src/app/services/fulfillment.service';
import { RedirectButtonComponent } from "../../../partials/buttons/redirect-button/redirect-button.component";

@Component({
    selector: 'app-fulfillments',
    standalone: true,
    templateUrl: './fulfillments.component.html',
    styleUrls: ['./fulfillments.component.css'],
    imports: [CommonModule, RedirectButtonComponent]
})
export class FulfillmentsComponent implements OnInit {

  loaded: boolean = false;
  pending: FulfillmentItem[];
  history: FulfillmentItem[];
  no_pending: boolean = false;
  no_history: boolean = false;
  total_sales: number = 0;


  constructor(private fulfillmentService: FulfillmentService) {}


  ngOnInit(): void {
    this.fulfillmentService.get_all().subscribe({
      next: (response) => {
        // console.log(response)
        this.loaded = true;
        if (response.pending.length == 0) this.no_pending = true;
        else this.pending = response.pending;
        if (response.history.length == 0) this.no_history = true;
        else this.history = response.history
      }
    });
  }


  formatCurrency(number: string | number) {
    return Number(number).toLocaleString('en-NG', {style: 'currency', currency: 'NGN'});
  }


  formatDate(date: string) {
    return moment(date).format('Do MMMM, YYYY');
  }

  encryptId(id: number) {
    return btoa(String(id));
  }
}
