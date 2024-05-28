import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, ElementRef, ViewChild } from '@angular/core';
import { Observable, fromEvent, debounceTime } from 'rxjs';
import { ExternalUserService } from 'src/app/services/external-user.service';
import { RedirectButtonComponent } from "../../../partials/buttons/redirect-button/redirect-button.component";

type ExternalUser = {
  first_name: string;
  last_name: string;
  email: string;
  company: {name: string}
};

@Component({
    selector: 'app-external-users',
    standalone: true,
    templateUrl: './external-users.component.html',
    styleUrl: './external-users.component.css',
    imports: [CommonModule, RedirectButtonComponent]
})
export class ExternalUsersComponent {
  users: ExternalUser[];
  fetching: boolean = false;
  search_input_stream: Observable<Event>;
  search_param: string = null;

  @ViewChild('search_field', {static: false}) search_field: ElementRef;

  constructor(private userService: ExternalUserService, private changeDetector: ChangeDetectorRef) {}

  ngOnInit(): void {

    this.fetch_students();
  }

  fetch_students() {
    this.fetching = true;
    this.userService.getAll().subscribe({
      next: (response) => {
        this.fetching = false;
        this.handleResponse(response)
      }
    });
  }

  handleResponse(response: {
    users: ExternalUser[];
  }) {
      this.users = response.users;

      this.changeDetector.detectChanges();


      this.search_input_stream  = fromEvent(this.search_field.nativeElement, 'input');

      this.search_input_stream.pipe(debounceTime(100)).subscribe((e)=>{
        this.search_param = (<HTMLInputElement>e.target).value;
      });
  }


  check_match(user: ExternalUser) {
    if ((String(user.first_name).toLowerCase().search(this.search_param.toLowerCase()) >= 0) ||
    (String(user.last_name).toLowerCase().search(this.search_param.toLowerCase()) >= 0) ||
    (String(user.email).toLowerCase().search(this.search_param.toLowerCase()) >= 0) || 
    (String(user.company.name).toLowerCase().search(this.search_param.toLowerCase()) >= 0)) return true;
    
      return false;
  }

}
