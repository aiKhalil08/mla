import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from 'src/app/services/auth.service';
import User from 'src/app/interfaces/user';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-user-info-box',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './user-info-box.component.html',
  styleUrls: ['./user-info-box.component.css']
})
export class UserInfoBoxComponent implements OnInit {
  @Input() parent!: 'sidebar' | 'header';
  @Input() location!: string;
  @Output() logoutClicked = new EventEmitter();

  user: User;
  name: string;
  dropdown_shown: boolean = false;

  constructor (private auth: AuthService) {}

  ngOnInit() {
    this.user = this.auth.user();
    this.name = `${this.user.first_name} ${this.user.last_name}`;
  }

  toggle_dropdown() {
    this.dropdown_shown = !this.dropdown_shown;
  }

  onClick() {
    this.logoutClicked.emit();
  }
}
