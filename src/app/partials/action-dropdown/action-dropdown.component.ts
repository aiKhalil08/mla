import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RedirectButtonComponent } from "../buttons/redirect-button/redirect-button.component";

@Component({
    selector: 'app-action-dropdown',
    standalone: true,
    templateUrl: './action-dropdown.component.html',
    styleUrls: ['./action-dropdown.component.css'],
    imports: [CommonModule, RedirectButtonComponent]
})
export class ActionDropdownComponent {

}
