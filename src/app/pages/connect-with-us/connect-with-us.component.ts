import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EnrollButtonComponent } from "../../partials/buttons/enroll-button/enroll-button.component";
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ContactUsFormComponent } from "../../partials/contact-us-form/contact-us-form.component";

@Component({
    selector: 'app-connect-with-us',
    standalone: true,
    templateUrl: './connect-with-us.component.html',
    styleUrls: ['./connect-with-us.component.css'],
    imports: [CommonModule, EnrollButtonComponent, ReactiveFormsModule, ContactUsFormComponent]
})
export class ConnectWithUsComponent implements OnInit {
    submitted: boolean = false;
    posted: boolean = false;
    requestGroup: FormGroup;

    ngOnInit(): void {
        // this.setRequestFormGroup();
}

}
