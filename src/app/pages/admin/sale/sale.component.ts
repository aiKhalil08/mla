import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import moment from 'moment';
import { Sale } from 'src/app/interfaces/sales';
import { SaleService } from 'src/app/services/sale.service';

@Component({
  selector: 'app-sale',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sale.component.html',
  styleUrls: ['./sale.component.css']
})
export class SaleComponent implements OnInit {

  id: number;
  loaded: boolean = false;
  sale: Sale;
  errorMessage: string;

  constructor(private route: ActivatedRoute, private saleService: SaleService) {}



  ngOnInit(): void {
    let paramObservable = this.route.paramMap;
    paramObservable.subscribe((param) => {
      this.id = Number(atob(param.get('id')));
      this.getSale();
    }); 
  }

  getSale() {
    this.saleService.get(this.id).subscribe({
      next: (response) => {
        this.loaded = true;
        if (response.status == 'failed') {
          this.errorMessage = response.message;
          return;
        }


        this.sale = response.sale;
      }
    });
  }

  formatCurrency(number: string | number) {
    return Number(number).toLocaleString('en-NG', {style: 'currency', currency: 'NGN'});
  }


  formatDate(date: string) {
    return moment(date).format('Do MMMM, YYYY');
  }
}
