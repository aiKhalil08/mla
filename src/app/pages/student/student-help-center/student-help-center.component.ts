import { Component } from '@angular/core';
import { FaqListComponent } from "../../../partials/faq-list/faq-list.component";
import { TrendingCoursesComponent } from "../../../partials/trending-courses/trending-courses.component";
import { ContactUsFormComponent } from "../../../partials/contact-us-form/contact-us-form.component";

@Component({
    selector: 'app-student-help-center',
    standalone: true,
    templateUrl: './student-help-center.component.html',
    styleUrls: ['./student-help-center.component.css'],
    imports: [FaqListComponent, TrendingCoursesComponent, ContactUsFormComponent]
})
export class StudentHelpCenterComponent {

}
