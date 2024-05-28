import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarItem } from 'src/app/interfaces/sidebar_item';
import { SidebarNavLinkComponent } from "../../../partials/links/sidebar-nav-link/sidebar-nav-link.component";
import { UserInfoBoxComponent } from "../../../partials/user-info-box/user-info-box.component";
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs/operators';
import { LogoutModalComponent } from "../../../partials/logout-modal/logout-modal.component";
import { JWTService } from 'src/app/services/jwt.service';
import { AdminService } from 'src/app/services/admin.service';
import { AuthService } from 'src/app/services/auth.service';
import { SidebarItems } from './sidebar-links';

@Component({
    selector: 'app-admin-layout',
    standalone: true,
    templateUrl: './admin-home.component.html',
    styleUrls: ['./admin-home.component.css'],
    imports: [CommonModule, SidebarNavLinkComponent, UserInfoBoxComponent, RouterOutlet, LogoutModalComponent]
})
export class AdminHomeComponent {
  expanded: boolean = false;
  menu_control!: HTMLImageElement;
  logout_confirmation: boolean = false;
  all_sidebar_items: SidebarItem[] = SidebarItems;

  authorized_sidebar_items: SidebarItem[] = [
    {text: 'Dashboard', location: '/admin', image: './assets/svgs/dashboard_icon.svg'},
  ];

  constructor(private router: Router, private auth: AuthService, private admin: AdminService, private t: JWTService) {}

  ngOnInit() {

    // console.log(this.t.payload())

    if (this.auth.user().hasRole('super_admin')) this.authorized_sidebar_items = this.all_sidebar_items
    else {
      this.all_sidebar_items.forEach(item => {
        if (item.permission && this.admin.hasPermission(item.permission)) this.authorized_sidebar_items.push(item);
      });
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
