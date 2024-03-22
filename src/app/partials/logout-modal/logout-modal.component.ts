import { Component, EventEmitter, Output } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-logout-modal',
  standalone: true,
  imports: [],
  templateUrl: './logout-modal.component.html',
  styleUrls: ['./logout-modal.component.css']
})
export class LogoutModalComponent {

  @Output() canceled = new EventEmitter();

  constructor(private auth: AuthService) {}

  cancel() {
    this.canceled.emit();
  }

  logout() {
    let type = this.auth.user().type;
    this.auth.logout();
    if (type != 'student') {
      document.location.href = 'login/'+type;
      return;
    }
    document.location.href = 'login'
  }
}
