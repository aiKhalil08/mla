import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-confirm-proceed-modal',
  standalone: true,
  imports: [],
  templateUrl: './confirm-proceed-modal.component.html',
  styleUrl: './confirm-proceed-modal.component.css'
})
export class ConfirmProceedModalComponent {
  @Input() text: string;
  @Output() canceled = new EventEmitter();
  @Output() proceed = new EventEmitter();

  constructor(private auth: AuthService) {}

  cancel() {
    this.canceled.emit();
  }

  submit() {
    this.proceed.emit();
  }
}
