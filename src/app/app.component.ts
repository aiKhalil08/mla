import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Route, Router, RouterLink, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs/operators';
import DropdownItem from './interfaces/dropdown';
import { EnrollButtonComponent } from "./partials/buttons/enroll-button/enroll-button.component";
import { DoMoreLinkComponent } from "./partials/links/do-more-link/do-more-link.component";
import { ExpandItemLinkComponent } from "./partials/links/expand-item-link/expand-item-link.component";
import { NavItemDropdownComponent } from "./partials/nav-item-dropdown/nav-item-dropdown.component";


@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    standalone: true,
    imports: [RouterOutlet, EnrollButtonComponent, RouterLink, DoMoreLinkComponent, ExpandItemLinkComponent, NavItemDropdownComponent]
})
export class AppComponent implements OnInit {
  // title = 'Mitiget Learning Academy';
  expanded: boolean = false;
  menu_control!: HTMLImageElement;
  landing_page: boolean = true;

  // dropdown_items: any[] = [1,2,3,];

  dropdown_items: DropdownItem[] = [
    {
      name: 'Course Catalogue',
      items: [
        {'item-name': 'Certificate Courses', link: '/course-catalogue/certificate-courses'},
        {'item-name': 'Certification Training Courses', link: '/course-catalogue/certification-courses'},
        {'item-name': 'Off-Shore Training Courses', link: '/course-catalogue/offshore-courses'}
      ]
    },
    {
      name: 'Resources',
      items: [
        {'item-name': 'Blogs', link: '/blogs'},
      ]
    }
  ]

  constructor(private router: Router, private route: ActivatedRoute) {
    if ((<string>document.location.pathname).match('/admin*')) this.landing_page = false;
    this.route.url.subscribe((url) => console.log(url));
  }

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
}