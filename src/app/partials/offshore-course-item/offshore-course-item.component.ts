import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ExpandItemLinkComponent } from "../links/expand-item-link/expand-item-link.component";
import { OffshoreCourseItem } from 'src/app/interfaces/offshore-course';

@Component({
    selector: 'app-offshore-course-item',
    standalone: true,
    templateUrl: './offshore-course-item.component.html',
    styleUrls: ['./offshore-course-item.component.css'],
    imports: [CommonModule, RouterLink, ExpandItemLinkComponent]
})
export class OffshoreCourseItemComponent {
  @Input() course!: OffshoreCourseItem;
}
