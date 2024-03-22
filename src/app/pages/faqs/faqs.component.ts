import { Component } from '@angular/core';
import { FaqListComponent } from "../../partials/faq-list/faq-list.component";

@Component({
    selector: 'app-faqs',
    standalone: true,
    templateUrl: './faqs.component.html',
    styleUrls: ['./faqs.component.css'],
    imports: [FaqListComponent]
})
export class FAQSComponent {

}
