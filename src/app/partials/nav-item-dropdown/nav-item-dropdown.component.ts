import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExpandItemLinkComponent } from "../links/expand-item-link/expand-item-link.component";
import DropdownItem from 'src/app/interfaces/dropdown';
import { NavigationEnd, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
    selector: 'app-nav-item-dropdown',
    standalone: true,
    templateUrl: './nav-item-dropdown.component.html',
    styleUrls: ['./nav-item-dropdown.component.css'],
    imports: [CommonModule, ExpandItemLinkComponent, RouterLink, RouterLinkActive]
})
export class NavItemDropdownComponent implements OnInit {
    @Input() item!: DropdownItem;
    expanded: boolean = false;
    folded: boolean = true;

    constructor(private router: Router) {}

    ngOnInit() {
      // console.clear();
      // console.log('navbar instantiated');
      this.router.events.pipe(
        filter(event => event instanceof NavigationEnd)
      ).subscribe(() => {
        this.expanded = false;
      });
    }

    toggleDropdown($event: MouseEvent) {
      this.expanded = !this.expanded;
    }

    fold($event : MouseEvent) {
      // console.log('dropdown folded');
      this.folded = true;
    }

    unfold($event : MouseEvent) {
      // console.log('dropdown unfolded');
      this.folded = false;
    }
}
