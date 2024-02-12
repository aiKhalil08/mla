import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { DoMoreLinkComponent } from "../links/do-more-link/do-more-link.component";
import { OffshoreCourseItem } from 'src/app/interfaces/offshore-course';
import { OffshoreCourseService } from 'src/app/services/offshore-course.service';
import { OffshoreCourseItemComponent } from '../offshore-course-item/offshore-course-item.component';

@Component({
    selector: 'app-offshore-course-list',
    standalone: true,
    templateUrl: './offshore-course-list.component.html',
    styleUrls: ['./offshore-course-list.component.css'],
    imports: [CommonModule, RouterLink, DoMoreLinkComponent, OffshoreCourseItemComponent]
})
export class OffshoreCourseListComponent implements OnInit {
  @Input() type!: string;
  @Input() count: number | 'all' = 'all';
  course_items: OffshoreCourseItem[];
  loaded: boolean = false;
  constructor (private courseService: OffshoreCourseService) {}

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
