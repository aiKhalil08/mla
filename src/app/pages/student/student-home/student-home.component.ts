import { Component } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs/operators';
import { SidebarItem } from 'src/app/interfaces/sidebar_item';
import { SidebarNavLinkComponent } from "../../../partials/links/sidebar-nav-link/sidebar-nav-link.component";
import { UserInfoBoxComponent } from "../../../partials/user-info-box/user-info-box.component";
import { CommonModule } from '@angular/common';
import { LogoutModalComponent } from "../../../partials/logout-modal/logout-modal.component";

@Component({
    selector: 'app-student-layout',
    standalone: true,
    templateUrl: './student-home.component.html',
    styleUrls: ['./student-home.component.css'],
    imports: [CommonModule, SidebarNavLinkComponent, UserInfoBoxComponent, RouterOutlet, LogoutModalComponent]
})
export class StudentHomeComponent {
  expanded: boolean = false;
  menu_control!: HTMLImageElement;
  logout_confirmation: boolean = false;

  first_sidebar_items: SidebarItem[] = [
    {text: 'Dashboard', location: '/home', image: './assets/svgs/dashboard_icon.svg'},
    {text: 'My Courses', location: '/home/courses', image: './assets/svgs/courses_icon.svg'},
    {text: 'My Events', location: '/home/events', image: './assets/svgs/events_icon.svg'},
    {text: 'My Certificates', location: '/home/certificates', image: './assets/images/certificate.png'},
    {text: 'Cart', location: '/home/cart', image: './assets/svgs/cart.svg'},
    {text: 'Profile', location: '/home/profile', image: './assets/svgs/profile.svg'},
    {text: 'Affiliate', location: '/home/affiliate', image: './assets/svgs/affiliate.svg'},
  ];

  second_sidebar_items: SidebarItem[] = [
    {text: 'Help Center', location: '/home/help-center', image: './assets/svgs/chat_.svg'},
    // {text: 'Notifications', location: '/home/courses', image: './assets/svgs/notification.svg'},
    // {text: 'Settings', location: '/home/settings', image: './assets/svgs/settings.svg'},
    // {text: 'Logout', location: '/logout', image: './assets/svgs/logout_icon.svg'},
  ];

  constructor(private router: Router) {}

  ngOnInit() {
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
