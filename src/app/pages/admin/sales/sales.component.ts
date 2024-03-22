import { Component, OnInit } from '@angular/core';
import { SaleService } from 'src/app/services/sale.service';
import { RedirectButtonComponent } from "../../../partials/buttons/redirect-button/redirect-button.component";
import { CommonModule } from '@angular/common';
import { SaleRecord } from 'src/app/interfaces/sales';
import moment from 'moment';

@Component({
    selector: 'app-sales',
    standalone: true,
    templateUrl: './sales.component.html',
    styleUrls: ['./sales.component.css'],
    imports: [RedirectButtonComponent, CommonModule]
})
export class SalesComponent implements OnInit{

  loaded: boolean = false;
  sales: SaleRecord[];
  no_sales: boolean = false;
  total_sales: number = 0;


  constructor(private salesService: SaleService) {}


  ngOnInit(): void {
    this.salesService.get_all().subscribe({
      next: (response) => {
        // console.log(response)
        this.loaded = true;
        if (response.sales.length > 0) {
          this.sales = response.sales;
          this.sales.map((sale) => sale.price).forEach(price => this.total_sales += Number(price));
          // console.log(this.total_sales)
        } else this.no_sales = true;
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
