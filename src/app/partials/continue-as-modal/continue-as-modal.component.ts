import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-continue-as-modal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './continue-as-modal.component.html',
  styleUrl: './continue-as-modal.component.css'
})
export class ContinueAsModalComponent implements OnInit {
  @Input() present: string;
  @Input() roles: string[];
  @Output() continueAs = new EventEmitter<string>();
  @Output() canceled = new EventEmitter();
  role_control: FormControl;

  ngOnInit(): void {
    this.role_control = new FormControl(this.present);
  }

  cancel() {
    this.canceled.emit();
  }

  choose() {
    this.continueAs.emit(this.role_control.value);
  }
}
