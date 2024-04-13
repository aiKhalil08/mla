import { CommonModule } from '@angular/common';
import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { PasswordService } from 'src/app/services/password.service';

@Component({
  selector: 'app-password-confirmation-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './password-confirmation-modal.component.html',
  styleUrls: ['./password-confirmation-modal.component.css']
})
export class PasswordConfirmationModalComponent {

  @Output() canceled = new EventEmitter();
  @Output() confirmed = new EventEmitter();
  @ViewChild('password') password_field: ElementRef;

  failed: boolean = false;


  submitted: boolean = false;

  constructor(private auth: AuthService, private passwordService: PasswordService) {}

  cancel() {
    this.canceled.emit();
  }

  confirm() {
    this.submitted = true;
    let type = this.auth.user().type;

    // console.log(this.password_field.nativeElement.value); return;
    
    let form = new FormData;
    form.append('password', this.password_field.nativeElement.value);

    this.passwordService.confirm(form, type).subscribe({
      next: (response) => {
        this.submitted = false;
        if (response.status == 'failed') {
          this.failed = true;
          return;
        } else {
          // console.log('confirmed')
          this.failed = false;
          this.confirmed.emit();
        }
      }
    });
  }
}
