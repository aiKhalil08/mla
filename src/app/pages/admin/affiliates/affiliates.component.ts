import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Observable, fromEvent, debounceTime } from 'rxjs';
import { AffiliateService } from 'src/app/services/affiliate.service';
import { RedirectButtonComponent } from "../../../partials/buttons/redirect-button/redirect-button.component";

@Component({
    selector: 'app-affiliates',
    standalone: true,
    templateUrl: './affiliates.component.html',
    styleUrls: ['./affiliates.component.css'],
    imports: [CommonModule, RedirectButtonComponent]
})
export class AffiliatesComponent implements OnInit {

  @ViewChild('search_field', {static: false}) search_field: ElementRef;

  affiliates: {first_name: string; last_name: string; email: string, referral_code: string}[];
  
  fetching: boolean = false;
  search_input_stream: Observable<Event>;
  search_param: string = null;


  constructor(private affiliateService: AffiliateService, private changeDetector: ChangeDetectorRef) {}

  ngOnInit(): void {

  this.fetch_affiliates();
  }



  fetch_affiliates() {
    this.fetching = true;
    this.affiliateService.get_all().subscribe({
      next: (response) => {
        this.fetching = false;
        this.handleResponse(response);
      }
    });
  }

  handleResponse(response: {
    affiliates: {
        first_name: string;
        last_name: string;
        email: string;
        referral_code: string;
    }[];
  }) {
      this.affiliates = response.affiliates;

      this.changeDetector.detectChanges();


      this.search_input_stream  = fromEvent(this.search_field.nativeElement, 'input');

      this.search_input_stream.pipe(debounceTime(100)).subscribe((e)=>{
        this.search_param = (<HTMLInputElement>e.target).value;
      });
  }


  check_match(affiliate: {first_name: string, last_name: string; email: string, referral_code: string}) {
    if ((String(affiliate.first_name).toLowerCase().search(this.search_param.toLowerCase()) >= 0) || 
    (String(affiliate.last_name).toLowerCase().search(this.search_param.toLowerCase()) >= 0) || 
    (String(affiliate.email).toLowerCase().search(this.search_param.toLowerCase()) >= 0) || 
    (String(affiliate.referral_code).search(this.search_param) >= 0)) return true;
      return false;
  }

}
