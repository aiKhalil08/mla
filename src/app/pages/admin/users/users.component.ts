import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { StudentService } from 'src/app/services/student.service';
import { RedirectButtonComponent } from "../../../partials/buttons/redirect-button/redirect-button.component";
import { Observable, debounceTime, fromEvent } from 'rxjs';

@Component({
    selector: 'app-users',
    standalone: true,
    templateUrl: './users.component.html',
    styleUrls: ['./users.component.css'],
    imports: [CommonModule, RedirectButtonComponent]
})
export class UsersComponent implements OnInit {

  users: {first_name: string; last_name: string; email: string}[];
  fetching: boolean = false;
  search_input_stream: Observable<Event>;
  search_param: string = null;

  @ViewChild('search_field', {static: false}) search_field: ElementRef;

  constructor(private studentsService: StudentService, private changeDetector: ChangeDetectorRef) {}

  ngOnInit(): void {

    this.fetch_users();
  }

  fetch_users() {
    this.fetching = true;
    this.studentsService.get_all().subscribe({
      next: (response) => {
        this.fetching = false;
        this.handleResponse(response)
      }
    });
  }

  handleResponse(response: {
    students: {
        first_name: string;
        last_name: string;
        email: string;
    }[];
  }) {
      this.users = response.students;

      this.changeDetector.detectChanges();


      this.search_input_stream  = fromEvent(this.search_field.nativeElement, 'input');

      this.search_input_stream.pipe(debounceTime(100)).subscribe((e)=>{
        this.search_param = (<HTMLInputElement>e.target).value;
      });
  }


  check_match(student: {first_name: string, last_name: string; email: string}) {
    if ((String(student.first_name).toLowerCase().search(this.search_param.toLowerCase()) >= 0) ||
    (String(student.last_name).toLowerCase().search(this.search_param.toLowerCase()) >= 0) ||
    (String(student.email).toLowerCase().search(this.search_param.toLowerCase()) >= 0)) return true;
      return false;
  }



}
