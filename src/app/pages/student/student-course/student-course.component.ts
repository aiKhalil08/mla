import { Component, Input, OnInit } from '@angular/core';
import { TrendingCoursesComponent } from "../../../partials/trending-courses/trending-courses.component";
// import { CartedCourseComponent } from "../../../partials/carted-course/carted-course.component";
import { ActivatedRoute, Router } from '@angular/router';
// import { CartedCourse, CartedCourseResponse } from 'src/app/interfaces/carted-course';
import { CartService } from 'src/app/services/cart.service';
import { CommonModule } from '@angular/common';
import { Course, FetchCourseResponse } from 'src/app/interfaces/courses';
import { CourseComponent } from 'src/app/partials/course/course.component';
import { StudentService } from 'src/app/services/student.service';
import { EmptyContentComponent } from "../../../partials/empty-content/empty-content.component";

@Component({
    selector: 'app-student-course',
    standalone: true,
    templateUrl: './student-course.component.html',
    styleUrls: ['./student-course.component.css'],
    imports: [TrendingCoursesComponent, CourseComponent, CommonModule, EmptyContentComponent]
})
export class StudentCourseComponent implements OnInit {

    category: string;
    identity: string;
    // course_category: string;
    course: Course;
    certificate?: {name: string, url: string};
    carted_or_enrolled: 'carted' | 'enrolled';
    enrollment_type?: 'cohort' | 'individual';

    fetching_course: boolean = false;
    error: string = null;

    constructor(private cart: CartService, private student: StudentService, private route: ActivatedRoute, private router: Router) {}


    ngOnInit(): void {
        this.route.queryParams.subscribe((params) => {
            this.category = params['cat'];
            this.identity = params['name'];
            let coe = params['coe'];
            let et = params['et'];

            if (coe != 'carted' && coe != 'enrolled') this.router.navigate(['/home']);
            else this.carted_or_enrolled = coe;
            if (coe == 'enrolled' && (et != 'cohort' && et != 'individual')) this.router.navigate(['/home']);
            else this.enrollment_type = et;

            // let course_category = String(this.category).replace(' ', '_').toLowerCase()
            let course: {identity: string, category?: string, enrollment_type?: 'cohort' | 'individual'} = {identity: this.identity};
            if (this.category) course.category = String(this.category).replace(' ', '_').toLowerCase();
            if (this.carted_or_enrolled == 'enrolled') course.enrollment_type = this.enrollment_type;

            this.get_course(course);
        });

    }

    get_course(course: {identity: string, category?: string, enrollment_type?: 'cohort' | 'individual'}) {
        this.fetching_course = true;

        // console.log(course)
        // console.log(course)

        if (this.carted_or_enrolled == 'carted') {
            this.cart.fetch_carted_course({identity: course.identity, category: course.category}).subscribe({
                next: (response) => {
                    this.fetching_course = false;
                    if (response.status == 'failed') {
                        this.error = response.message;
                        return;
                    }
                    this.handleResponse(response);
                }
            });
        } else if (this.carted_or_enrolled == 'enrolled') {
            let data: {identity: string, category?: string, enrollment_type: 'cohort' | 'individual'} = {identity: course.identity, enrollment_type: course.enrollment_type};

            // data.enrollment_type = course.enrollment_type;
            // data.identity = data.identity;

            if (this.enrollment_type == 'individual') data.category = course.category;
            
            this.student.fetch_enrolled_course(data).subscribe({
                next: (response) => {
                    this.fetching_course = false;
                    if (response.status == 'failed') {
                        this.error = response.message;
                        return;
                    }
                    this.handleResponse(response);
                }
            });
        }
    }



    handleResponse(response: FetchCourseResponse) {
        this.error = null;
        this.course = response.course;
        this.certificate = response.certificate;
    }

    get course_name() {
        let name = this.course.title;
        if (this.course.code) name += ' - '+this.course.code;
        return name;
    }

    // get certificate_name() {
    //     if (this.carted_or_enrolled == 'carted') return null;
    //     return '';
    // }
}
