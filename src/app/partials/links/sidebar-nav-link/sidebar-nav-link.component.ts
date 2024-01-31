import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarItem } from 'src/app/interfaces/sidebar_item';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-sidebar-nav-link',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './sidebar-nav-link.component.html',
  styleUrls: ['./sidebar-nav-link.component.css']
})
export class SidebarNavLinkComponent {
  @Input() item!: SidebarItem;
}
