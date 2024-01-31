import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EnrollButtonComponent } from "../../partials/buttons/enroll-button/enroll-button.component";

@Component({
    selector: 'app-connect-with-us',
    standalone: true,
    templateUrl: './connect-with-us.component.html',
    styleUrls: ['./connect-with-us.component.css'],
    imports: [CommonModule, EnrollButtonComponent]
})
export class ConnectWithUsComponent {

}
