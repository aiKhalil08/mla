import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CourseItem } from 'src/app/interfaces/course';
import { RouterLink } from '@angular/router';
import { ExpandItemLinkComponent } from "../links/expand-item-link/expand-item-link.component";

@Component({
    selector: 'app-course-item',
    standalone: true,
    templateUrl: './course-item.component.html',
    styleUrls: ['./course-item.component.css'],
    imports: [CommonModule, RouterLink, ExpandItemLinkComponent]
})
export class CourseItemComponent {
  @Input() course!: CourseItem;
}
