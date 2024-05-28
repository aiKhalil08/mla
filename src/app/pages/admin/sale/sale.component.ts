import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Sale } from 'src/app/interfaces/sales';
import { SaleService } from 'src/app/services/sale.service';
import { EmptyContentComponent } from "../../../partials/empty-content/empty-content.component";
import { format } from 'date-fns';

@Component({
    selector: 'app-sale',
    standalone: true,
    templateUrl: './sale.component.html',
    styleUrls: ['./sale.component.css'],
    imports: [CommonModule, EmptyContentComponent]
})
export class SaleComponent implements OnInit {

  id: number;
  fetching: boolean = false;
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
    this.fetching = true;
    this.saleService.get(this.id).subscribe({
      next: (response) => {
        this.fetching = false;
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
    return format(date, 'do MMMM, yyyy');
  }
}
