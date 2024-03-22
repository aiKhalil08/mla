import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink, RouterOutlet } from '@angular/router';
import { ExpandItemLinkComponent } from "../../partials/links/expand-item-link/expand-item-link.component";




@Component({
    selector: 'app-course-catalogue',
    standalone: true,
    templateUrl: './course-catalogue.component.html',
    styleUrls: ['./course-catalogue.component.css'],
    imports: [CommonModule, RouterLink, ExpandItemLinkComponent, RouterOutlet]
})
export class CourseCatalogueComponent implements OnInit {
    section_header: string;
    course_type: string;

    constructor (private route: ActivatedRoute) {}

    ngOnInit(): void {
        this.route.url.subscribe((url) => {
            this.course_type = /.*\/(.+)$/.exec(location.href)[1];
            this.setHeader(this.course_type);
        })
    }

    setHeader(course_type: string) {
        switch (course_type) {
            case 'certificate-courses':
                this.section_header = 'Our Certificate Courses';
                break;
            case 'certification-courses':
                this.section_header = 'Our Certification Training Courses';
                break;
            case 'offshore-courses':
                this.section_header = 'Our Offshore Courses';
                break;
        }
    }
}
