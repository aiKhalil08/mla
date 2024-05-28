import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from 'src/app/services/auth.service';
import User from 'src/app/interfaces/user';
import { ActivatedRoute, RouterLink } from '@angular/router';

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
  path: string;

  constructor (private auth: AuthService, private route: ActivatedRoute) {}

  ngOnInit() {
    this.user = this.auth.user();
    this.route.url.subscribe((url) => this.path = url[0].path);
    this.name = `${this.user.first_name} ${this.user.last_name}`;
  }

  toggle_dropdown() {
    this.dropdown_shown = !this.dropdown_shown;
  }

  onClick() {
    this.logoutClicked.emit();
  }

  get present_role() {
    return this.path == 'home' ? 'student' : (this.path == 'admin' ? 'admin' : 'tutor');
  }

  get other_roles() {
    let all_roles = this.auth.user().roles;
    let other_roles = [];
    if (all_roles.length > 1) {
      other_roles = all_roles.filter(role => role != this.present_role)
    }
    return other_roles;
  }
  
  getLink(role: string) {
    return role == 'student' ? '/home' : '/'+role;
  }
}
