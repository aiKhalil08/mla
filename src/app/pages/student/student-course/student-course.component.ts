import { Component, OnInit } from '@angular/core';
import { TrendingCoursesComponent } from "../../../partials/trending-courses/trending-courses.component";
import { CartedCourseComponent } from "../../../partials/carted-course/carted-course.component";
import { ActivatedRoute } from '@angular/router';
import { CartedCourse, CartedCourseResponse } from 'src/app/interfaces/carted-course';
import { CartService } from 'src/app/services/cart.service';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-student-course',
    standalone: true,
    templateUrl: './student-course.component.html',
    styleUrls: ['./student-course.component.css'],
    imports: [TrendingCoursesComponent, CartedCourseComponent, CommonModule]
})
export class StudentCourseComponent implements OnInit {

    type: string;
    identity: string;
    course_type: string;
    course: CartedCourse;

    constructor(private cart: CartService, private route: ActivatedRoute) {}


    ngOnInit(): void {
        this.route.queryParams.subscribe((params) => {
            this.type = params['type'];
            this.identity = params['name'];
            this.course_type = String(this.type).replace(' ', '_').toLowerCase()
            let course = {type: this.course_type, identity: this.identity};
            this.get_course(course);
        });

    }

    get_course(course: {type: string, identity: string}) {
        this.cart.fetch_carted_course(course).subscribe({
            next: (response) => {
                if (response.status == 'success') this.handleResponse(response);
            }
        });
    }



    handleResponse(response: CartedCourseResponse) {
        this.course = response.course;
    }

    get course_name() {
        let name = this.course.title;
        if (this.course.code) name += ' - '+this.course.code;
        return name;
    }
}
