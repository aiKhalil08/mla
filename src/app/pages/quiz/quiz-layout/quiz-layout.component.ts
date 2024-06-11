import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs';
import { SidebarItem } from 'src/app/interfaces/sidebar_item';
import { AuthService } from 'src/app/services/auth.service';
import { ExternalUserService } from 'src/app/services/external-user.service';
import { JWTService } from 'src/app/services/jwt.service';
import { LogoutModalComponent } from "../../../partials/logout-modal/logout-modal.component";
import { UserInfoBoxComponent } from "../../../partials/user-info-box/user-info-box.component";
import { SidebarNavLinkComponent } from "../../../partials/links/sidebar-nav-link/sidebar-nav-link.component";
import { CommonModule } from '@angular/common';
import { AdminSidebarItems, StudentSidebarItems } from './sidebar-links';
import { AdminService } from 'src/app/services/admin.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
    selector: 'app-quiz-layout',
    standalone: true,
    templateUrl: './quiz-layout.component.html',
    styleUrl: './quiz-layout.component.css',
    imports: [LogoutModalComponent, RouterOutlet, UserInfoBoxComponent, SidebarNavLinkComponent, CommonModule]
})
export class QuizLayoutComponent implements OnInit {
  expanded: boolean = false;
  menu_control!: HTMLImageElement;
  logout_confirmation: boolean = false;
  all_sidebar_items: SidebarItem[];

  authorized_sidebar_items: SidebarItem[];

  constructor(private router: Router, private auth: AuthService, private admin: AdminService, private storageService: StorageService) {}

  ngOnInit() {


    // load the sidebar links based on the user role
    if (this.storageService.get('as') == 'admin') {
      // load admin sidebar links
      this.all_sidebar_items = AdminSidebarItems;
      this.authorized_sidebar_items = this.all_sidebar_items

    } else if (this.auth.user().hasRole('external_user') || this.storageService.get('as') == 'student') {
      // load external user sidebar links
      this.all_sidebar_items = StudentSidebarItems;

      let dashboard_link = this.all_sidebar_items.find(item => item.location == '/home');
      if (this.auth.user().hasRole('external_user')) dashboard_link.location = '/quiz';

      this.authorized_sidebar_items = this.all_sidebar_items;
    }

    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.expanded = false;
      window.scrollTo({
        top: 0,
        left: 0,
      })
      if (this.menu_control) this.menu_control.src = './assets/svgs/hamburger.svg';
    });
  }

  toggleMenu($event: MouseEvent) {
    let target = $event.target as HTMLImageElement;
    this.menu_control = target;
    if (this.expanded) {
      this.expanded = false;
      target.src = './assets/svgs/hamburger.svg';
    } else {
      this.expanded = true;
      target.src = './assets/svgs/cancel.svg';
    }
  }

  confirm_logout() {
    this.logout_confirmation = true;
  }

  cancel_logout() {
    this.logout_confirmation = false;
  }

}
