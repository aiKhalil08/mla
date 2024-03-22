import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FaqListComponent } from "../../partials/faq-list/faq-list.component";

@Component({
    selector: 'app-about-us',
    standalone: true,
    templateUrl: './about-us.component.html',
    styleUrls: ['./about-us.component.css'],
    imports: [CommonModule, FaqListComponent]
})
export class AboutUsComponent {

}
