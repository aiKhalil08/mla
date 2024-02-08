import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ExpandItemLinkComponent } from "../links/expand-item-link/expand-item-link.component";
import { CertificationCourseItem } from 'src/app/interfaces/certification-course';

@Component({
    selector: 'app-certification-course-item',
    standalone: true,
    templateUrl: './certification-course-item.component.html',
    styleUrls: ['./certification-course-item.component.css'],
    imports: [CommonModule, RouterLink, ExpandItemLinkComponent]
})
export class CertificationCourseItemComponent {
  @Input() course!: CertificationCourseItem;
}
