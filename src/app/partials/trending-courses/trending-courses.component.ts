import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { CoursesService } from 'src/app/services/courses.service';

@Component({
  selector: 'app-trending-courses',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './trending-courses.component.html',
  styleUrls: ['./trending-courses.component.css']
})
export class TrendingCoursesComponent implements OnInit {

  courses: {name: {title: string, code?: string}, type: string}[];


  constructor(private courseService: CoursesService) {}


  ngOnInit(): void {
    this.courseService.get_trending_courses().subscribe({
      next: (response) => {
        this.courses = response.courses;
      }
    });
  }


  get_url(course: {name: {title: string, code?: string}, type: string}) {
    let url = `${course.type.replace(' ', '-').toLowerCase()}/`;

    let identity = course.name.code ? course.name.code :course.name.title;

    return url+identity;

  }
}
