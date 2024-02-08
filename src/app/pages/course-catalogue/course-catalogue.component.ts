import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink, RouterOutlet } from '@angular/router';
import { ExpandItemLinkComponent } from "../../partials/links/expand-item-link/expand-item-link.component";


interface Course {
    name: string,
    description: string
}

type possible_types = 'cc' | 'ctc' | 'oc';

@Component({
    selector: 'app-course-catalogue',
    standalone: true,
    templateUrl: './course-catalogue.component.html',
    styleUrls: ['./course-catalogue.component.css'],
    imports: [CommonModule, RouterLink, ExpandItemLinkComponent, RouterOutlet]
})
export class CourseCatalogueComponent implements OnInit {
    section_header: string = 'Our Certificate Courses';
    selected: possible_types = 'cc';

    constructor (private route: ActivatedRoute) {}

    ngOnInit(): void {
        if (RegExp('certificate-course').test(location.href)) {
            this.selected = 'cc';
            this.section_header = 'Our Certificate Courses';
        } else if (RegExp('certification-course').test(location.href)) {
            this.selected = 'ctc';
            this.section_header = 'Our Certification Training Courses';
        } else if (RegExp('offshore-course').test(location.href)) {
            this.selected = 'oc';
            this.section_header = 'Our Offshore Courses';
        }
        // this.route.url.subscribe((url) => {
        //     console.log(url);
        // });
    }

    select(type: possible_types) {
        this.selected = type;
        switch (type) {
            case 'cc':
                this.section_header = 'Our Certificate Courses';
                break;
            case 'ctc':
                this.section_header = 'Our Certification Training Courses';
                break;
            case 'oc':
                this.section_header = 'Our Offshore Courses';
                break;
        }
    }
//   courses: Course[] = [
//     {
//         "name": "Cybersecurity 101",
//         "description": "Learn the working components of hardware, software, operating systems, and computer networks, and different types of malware."
//     },
//     {
//         "name": "Python Programming",
//         "description": "Learn the foundational principles of pyrhon programming. Here, you’ll be exposed to developing dynamic applications for business"
//     },
//     {
//         "name": "Microsoft Excel",
//         "description": "Learn how to create spreadsheeets in Excel, format and print workbooks, create basic calculation formulas and visualize data and draw charts."
//     },
//     {
//         "name": "Cybersecurity 101",
//         "description": "Learn the working components of hardware, software, operating systems, and computer networks, and different types of malware."
//     },
//     {
//         "name": "Python Programming",
//         "description": "Learn the foundational principles of pyrhon programming. Here, you’ll be exposed to developing dynamic applications for business"
//     },
//     {
//         "name": "Microsoft Excel",
//         "description": "Learn how to create spreadsheeets in Excel, format and print workbooks, create basic calculation formulas and visualize data and draw charts."
//     },
//     {
//         "name": "Cybersecurity 101",
//         "description": "Learn the working components of hardware, software, operating systems, and computer networks, and different types of malware."
//     },
//     {
//         "name": "Python Programming",
//         "description": "Learn the foundational principles of pyrhon programming. Here, you’ll be exposed to developing dynamic applications for business"
//     },
//     {
//         "name": "Microsoft Excel",
//         "description": "Learn how to create spreadsheeets in Excel, format and print workbooks, create basic calculation formulas and visualize data and draw charts."
//     }
//     ];
}
