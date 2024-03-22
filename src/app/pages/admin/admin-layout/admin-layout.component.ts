import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarItem } from 'src/app/interfaces/sidebar_item';
import { SidebarNavLinkComponent } from "../../../partials/links/sidebar-nav-link/sidebar-nav-link.component";
import { UserInfoBoxComponent } from "../../../partials/user-info-box/user-info-box.component";
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs/operators';
import { LogoutModalComponent } from "../../../partials/logout-modal/logout-modal.component";

@Component({
    selector: 'app-admin-layout',
    standalone: true,
    templateUrl: './admin-layout.component.html',
    styleUrls: ['./admin-layout.component.css'],
    imports: [CommonModule, SidebarNavLinkComponent, UserInfoBoxComponent, RouterOutlet, LogoutModalComponent]
})
export class AdminLayoutComponent {
  expanded: boolean = false;
  menu_control!: HTMLImageElement;
  logout_confirmation: boolean = false;
  sidebar_items: SidebarItem[] = [
    {text: 'Dashboard', location: '/admin', image: './assets/svgs/dashboard_icon.svg'},
    {text: 'Courses', location: '/admin/courses', image: './assets/svgs/courses_icon.svg'},
    {text: 'Events', location: '/admin/events', image: './assets/svgs/events_icon.svg'},
    {text: 'Resources', location: '/admin/resources', image: './assets/svgs/resources_icon.svg'},
    {text: 'Requests', location: '/admin/requests', image: './assets/svgs/request.svg'},
    {text: 'Users', location: '/admin/users', image: './assets/svgs/users_icon.svg'},
    {text: 'Sales', location: '/admin/sales', image: './assets/svgs/sales.svg'},
    {text: 'Affiliates', location: '/admin/affiliates', image: './assets/svgs/affiliates_icon.svg'},
    {text: 'Fulfillments', location: '/admin/fulfillments', image: './assets/svgs/fulfillment.svg'},
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
