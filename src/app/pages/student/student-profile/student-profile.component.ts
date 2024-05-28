import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import UserProfile from 'src/app/interfaces/user-profile';
import { RedirectButtonComponent } from "../../../partials/buttons/redirect-button/redirect-button.component";
import { JWTService } from 'src/app/services/jwt.service';
import { UserService } from 'src/app/services/user.service';

@Component({
    selector: 'app-student-profile',
    standalone: true,
    templateUrl: './student-profile.component.html',
    styleUrls: ['./student-profile.component.css'],
    imports: [CommonModule, ReactiveFormsModule, RedirectButtonComponent]
})
export class StudentProfileComponent {
  profile!: UserProfile;
  profileGroup!: FormGroup;
  pictureSelected: boolean = false;
  imageFile: any = null;
  submitted: boolean = false;
  edited: boolean = false;
  editable: boolean = false;
  formError: string;

  constructor(private formBuilder: FormBuilder, private userService: UserService, private tokenService: JWTService) {}

  ngOnInit() {
    this.userService.get_profile().subscribe({
      next: (response) => {
        this.profile = response.profile;
        this.profileGroup = this.formBuilder.group({
          first_name: [this.profile.first_name],
          last_name: [this.profile.last_name],
          email: [this.profile.email],
          phone_number: [this.profile.phone_number],
          home_address: [this.profile.info?.home_address],
          bio: [this.profile.info?.bio],
          image: [null],
        });
        setTimeout(()=>{
          (<HTMLImageElement>document.querySelector('#imagePreview')).src = this.profile.image_url || './assets/images/avatar.jpg';
          
        }, 0);
      },
    });
  }

  handleImageSelect(event: Event, img: HTMLImageElement) {
    if (this.editable) {
      let file = (<HTMLInputElement>event.target).files[0];
      let reader = new FileReader();
      reader.onloadend = () => {
        img.src = <string>reader.result;
        this.pictureSelected = true;
      };
      if (file) reader.readAsDataURL(file);
    }
  }


  onSubmit(form) {
    if (!this.submitted) {
      this.submitted = true;
      let formData = new FormData(form);
      this.userService.update_profile(formData).subscribe({
        next: (response) => {
          this.edited = true;
          this.submitted = false;
          if (response.status == 'failed') this.formError = response.message;
          else this.tokenService.set(response.access_token);
        },
      });
    }
  }
}
