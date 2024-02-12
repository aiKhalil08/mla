import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { DoMoreLinkComponent } from "../links/do-more-link/do-more-link.component";
import { CertificationCourseService } from 'src/app/services/certification-course.service';
import { CertificationCourseItem } from 'src/app/interfaces/certification-course';
import { CertificationCourseItemComponent } from '../certification-course-item/certification-course-item.component';

@Component({
    selector: 'app-certification-course-list',
    standalone: true,
    templateUrl: './certification-course-list.component.html',
    styleUrls: ['./certification-course-list.component.css'],
    imports: [CommonModule, RouterLink, DoMoreLinkComponent, CertificationCourseItemComponent]
})
export class CertificationCourseListComponent implements OnInit {
  @Input() type!: string;
  @Input() count: number | 'all' = 'all';
  course_items: CertificationCourseItem[];
  loaded: boolean = false;
  constructor (private courseService: CertificationCourseService) {}

  ngOnInit() {
    this.courseService.getList(this.count).subscribe({
      next: (response) => {
        this.loaded = true;
        this.course_items = response;
        console.log(response);
      },
    });
  }
}
