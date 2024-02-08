import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EnrollButtonComponent } from "../../partials/buttons/enroll-button/enroll-button.component";
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ExpandItemLinkComponent } from "../../partials/links/expand-item-link/expand-item-link.component";
import { DoMoreLinkComponent } from "../../partials/links/do-more-link/do-more-link.component";
import { CertificateCourseListComponent } from "../../partials/certificate-course-list/certificate-course-list.component";
import { CertificationCourseListComponent } from "../../partials/certification-course-list/certification-course-list.component";
import { OffshoreCourseListComponent } from "../../partials/offshore-course-list/offshore-course-list.component";

interface Event {
    name: string,
    date: {month: string, start: number, end: number},
    img_src: string
}
interface Course {
    name: string,
    description: string
}
interface Resource {
    topic: string,
    description: string,
    img_src: string
}

@Component({
    selector: 'app-home',
    standalone: true,
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css'],
    imports: [CommonModule, EnrollButtonComponent, RouterLink, RouterLinkActive, ExpandItemLinkComponent, DoMoreLinkComponent, CertificateCourseListComponent, CertificationCourseListComponent, OffshoreCourseListComponent]
})
export class HomeComponent {
    events: Event[] = [
    {
        "name": "Cybersecurity 101",
        "date": {"month": "JAN", "start": 9, "end": 10},
        "img_src": "/assets/images/events/cybersecurity_101.png"
    },
    {
        "name": "Cybersecurity 102",
        "date": {"month": "JAN", "start": 9, "end": 10},
        "img_src": "/assets/images/events/cybersecurity_102.png"
    },
    {
        "name": "Cybersecurity 103",
        "date": {"month": "JAN", "start": 9, "end": 10},
        "img_src": "/assets/images/events/cybersecurity_103.png"
    }
    ];
    courses: Course[] = [
    {
        "name": "Cybersecurity 101",
        "description": "Learn the working components of hardware, software, operating systems, and computer networks, and different types of malware."
    },
    {
        "name": "Python Programming",
        "description": "Learn the foundational principles of pyrhon programming. Here, you’ll be exposed to developing dynamic applications for business"
    },
    {
        "name": "Microsoft Excel",
        "description": "Learn how to create spreadsheeets in Excel, format and print workbooks, create basic calculation formulas and visualize data and draw charts."
    },
    {
        "name": "Microsoft Excel",
        "description": "Learn how to create spreadsheeets in Excel, format and print workbooks, create basic calculation formulas and visualize data and draw charts."
    }
    ];
    resources: Resource[] = [
    {
        "topic": "Mitiget Learning Academy Set To Empower 1000 Youths",
        "img_src": "/assets/images/resources/resource_1.png",
        "description": "Learn the working components of hardware, software, operating systems, and computer networks, and different types of malware."
    },
    {
        "topic": "Mitiget Learning Academy Set To Empower 1000 Youths",
        "img_src": "/assets/images/resources/resource_1.png",
        "description": "Learn the working components of hardware, software, operating systems, and computer networks, and different types of malware."
    },
    {
        "topic": "Mitiget Learning Academy Set To Empower 1000 Youths",
        "img_src": "/assets/images/resources/resource_1.png",
        "description": "Learn the working components of hardware, software, operating systems, and computer networks, and different types of malware."
    }
    ];
}
