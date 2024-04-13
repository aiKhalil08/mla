import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import StudentProfile from 'src/app/interfaces/student-profile';
import { StudentService } from 'src/app/services/student.service';
import { EmptyContentComponent } from "../../../partials/empty-content/empty-content.component";

@Component({
    selector: 'app-user',
    standalone: true,
    templateUrl: './user.component.html',
    styleUrls: ['./user.component.css'],
    imports: [CommonModule, EmptyContentComponent]
})
export class UserComponent {


  user!: StudentProfile;
  fetching: boolean = false;
  no_user: string = null;

  constructor(private studentService: StudentService, private route: ActivatedRoute) {}

  ngOnInit() {
    let email: string;

    this.route.paramMap.subscribe((params) => {
      email = params.get('email');
    });
    
    this.fetch_user(email);
  }

  fetch_user(email: string) {
    this.fetching = true;
    // setTimeout(() => {
      
      this.studentService.get_user(email).subscribe({
        next: (response) => {
          this.fetching = false;
          if (response.status == 'failed') {
            this.no_user = response.message;
            return;
          }
          this.handleResponse(response);
        }
      });
    // }, 5000);
  }

  handleResponse(response: {
    status: string;
    message?: string;
    user?: StudentProfile;
  }) {
    this.user = response.user;
    setTimeout(()=>{
      (<HTMLImageElement>document.querySelector('#imagePreview')).src = this.user.image_url || './assets/images/avatar.jpg';
      
    }, 0);
  }


}
