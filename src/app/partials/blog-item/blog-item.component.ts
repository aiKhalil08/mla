import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlogItem } from 'src/app/interfaces/blog';
import { ExpandItemLinkComponent } from "../links/expand-item-link/expand-item-link.component";

@Component({
    selector: 'app-blog-item',
    standalone: true,
    templateUrl: './blog-item.component.html',
    styleUrls: ['./blog-item.component.css'],
    imports: [CommonModule, ExpandItemLinkComponent]
})
export class BlogItemComponent {
  @Input() blog!: BlogItem;
}
