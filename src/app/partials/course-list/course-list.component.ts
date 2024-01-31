import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CourseItem } from 'src/app/interfaces/course';
import { RouterLink } from '@angular/router';
import { DoMoreLinkComponent } from "../links/do-more-link/do-more-link.component";
import { CourseItemComponent } from "../course-item/course-item.component";
import { CourseService } from 'src/app/course.service';

@Component({
    selector: 'app-course-list',
    standalone: true,
    templateUrl: './course-list.component.html',
    styleUrls: ['./course-list.component.css'],
    imports: [CommonModule, RouterLink, DoMoreLinkComponent, CourseItemComponent]
})
export class CourseListComponent implements OnInit {
  @Input() type!: string;
  course_items: CourseItem[];
  loaded: boolean = false;
  constructor (private courseService: CourseService) {}

  ngOnInit() {
    this.courseService.getList(4).subscribe({
      next: (response) => {
        this.loaded = true;
        this.course_items = response;
        console.log(response);
      },
    });
  }
//    = [
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
//         "name": "Microsoft Excel",
//         "description": "Learn how to create spreadsheeets in Excel, format and print workbooks, create basic calculation formulas and visualize data and draw charts."
//     }
//     ];
}
