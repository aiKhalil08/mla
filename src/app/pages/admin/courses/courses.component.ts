import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RedirectButtonComponent } from "../../../partials/buttons/redirect-button/redirect-button.component";
import { CertificateCourseItem, CertificationCourseItem, OffshoreCourseItem } from 'src/app/interfaces/courses';
import { CoursesService } from 'src/app/services/courses.service';


@Component({
    selector: 'app-courses',
    standalone: true,
    templateUrl: './courses.component.html',
    styleUrls: ['./courses.component.css'],
    imports: [CommonModule, RedirectButtonComponent]
})

export class CoursesComponent implements OnInit {
    certificate_courses!: CertificateCourseItem[];
    certification_courses!: CertificationCourseItem[];
    offshore_courses!: OffshoreCourseItem[];
    loaded: boolean = false;
    parse = (string: any) => {
        return JSON.parse(<string> string);
    };

    constructor(private coursesService: CoursesService) {}

    ngOnInit(): void {
        console.log('initializing')
        this.coursesService.get().subscribe({
            next: (response) => {
                console.log('arrived')
                this.certificate_courses = response['certificate-courses'];
                this.certification_courses = response['certification-courses'];
                this.offshore_courses = response['offshore-courses'];
                this.loaded = true;
                // console.log(this.certificate_courses, response, response['certificate-courses'])
            }
        });
    }
}
