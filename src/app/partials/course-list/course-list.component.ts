import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
// import { Cart, CartItem } from 'src/app/interfaces/cart';
import { CartService } from 'src/app/services/cart.service';
// import { CartItemComponent } from "../cart-item/cart-item.component";
import { EmptyContentComponent } from '../empty-content/empty-content.component';
import { CourseItem, Courses } from 'src/app/interfaces/courses';
import { StudentService } from 'src/app/services/student.service';
import { CourseItemComponent } from '../course-item/course-item.component';

@Component({
    selector: 'app-course-list',
    standalone: true,
    templateUrl: './course-list.component.html',
    styleUrls: ['./course-list.component.css'],
    imports: [CommonModule, CourseItemComponent, EmptyContentComponent]
})
export class CourseListComponent implements OnInit {

  @Input() type: 'carted' | 'enrolled';

  courses: CourseItem[];

  constructor(private cartService: CartService, private studentService: StudentService) {}

  ngOnInit(): void {
    // console.log(this.type)

    if (this.type == 'carted') this.fetch_cart();
    else if (this.type == 'enrolled') this.fetch_enrolled_courses();
  }

  fetch_cart() {
    this.cartService.fetch_cart().subscribe({
      next: (response) => {

        this.handleResponse(response)
      }
    });
  }

  fetch_enrolled_courses() {
    this.studentService.fetch_enrolled_courses().subscribe({
      next: (response) => {
        // console.log(response)

        this.handleResponse(response)
      }
    });
  }


  handleResponse(response: {courses: Courses}) {
    // console.log(response.courses)
    this.courses = Object.entries(response.courses).flatMap(([category, courses]) => {
      return courses.map(course => ({...course, category}))
    });
    // console.log(this.courses)
  }
}