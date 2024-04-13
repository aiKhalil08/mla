import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { CourseListComponent } from 'src/app/partials/course-list/course-list.component';
// import { CartComponent } from 'src/app/partials/cart/cart.component';
import { TrendingCoursesComponent } from 'src/app/partials/trending-courses/trending-courses.component';


@Component({
  selector: 'app-student-cart',
  standalone: true,
  imports: [CommonModule, CourseListComponent, TrendingCoursesComponent],
  templateUrl: './student-cart.component.html',
  styleUrls: ['./student-cart.component.css']
})
export class StudentCartComponent {

}
