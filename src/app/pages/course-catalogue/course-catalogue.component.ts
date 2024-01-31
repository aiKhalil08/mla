import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ExpandItemLinkComponent } from "../../partials/links/expand-item-link/expand-item-link.component";


interface Course {
    name: string,
    description: string
}

@Component({
    selector: 'app-course-catalogue',
    standalone: true,
    templateUrl: './course-catalogue.component.html',
    styleUrls: ['./course-catalogue.component.css'],
    imports: [CommonModule, RouterLink, ExpandItemLinkComponent]
})
export class CourseCatalogueComponent {
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
    }
    ];
}
