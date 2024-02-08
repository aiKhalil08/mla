import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ExpandItemLinkComponent } from "../links/expand-item-link/expand-item-link.component";
import { CertificateCourseItem } from 'src/app/interfaces/certificate-course';

@Component({
    selector: 'app-certificate-course-item',
    standalone: true,
    templateUrl: './certificate-course-item.component.html',
    styleUrls: ['./certificate-course-item.component.css'],
    imports: [CommonModule, RouterLink, ExpandItemLinkComponent]
})
export class CertificateCourseItemComponent {
  @Input() course!: CertificateCourseItem;
}
