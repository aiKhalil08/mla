import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EnrollButtonComponent } from "../../partials/buttons/enroll-button/enroll-button.component";
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ExpandItemLinkComponent } from "../../partials/links/expand-item-link/expand-item-link.component";
import { DoMoreLinkComponent } from "../../partials/links/do-more-link/do-more-link.component";
import { CertificateCourseListComponent } from "../../partials/certificate-course-list/certificate-course-list.component";
import { CertificationCourseListComponent } from "../../partials/certification-course-list/certification-course-list.component";
import { OffshoreCourseListComponent } from "../../partials/offshore-course-list/offshore-course-list.component";
import { BlogListComponent } from "../../partials/blog-list/blog-list.component";
import { EventListComponent } from "../../partials/event-list/event-list.component";
import { TestimonialListComponent } from "../../partials/testimonial-list/testimonial-list.component";

interface Event {
    name: string,
    date: {month: string, start: number, end: number},
    img_src: string
}
interface Course {
    name: string,
    description: string
}
interface Resource {
    topic: string,
    description: string,
    img_src: string
}

@Component({
    selector: 'app-home',
    standalone: true,
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css'],
    imports: [CommonModule, EnrollButtonComponent, RouterLink, RouterLinkActive, ExpandItemLinkComponent, DoMoreLinkComponent, CertificateCourseListComponent, CertificationCourseListComponent, OffshoreCourseListComponent, BlogListComponent, EventListComponent, TestimonialListComponent]
})
export class HomeComponent implements OnInit {
    no_events: boolean = false;
    no_testimonials: boolean = false;


    
    ngOnInit(): void {
        let left_slide = document.querySelector('#left-slide');
        let right_slide = document.querySelector('#right-slide');
        setTimeout(()=> {
            left_slide.classList.add('first-visible');
        }, 0);
        setTimeout(() => {
            left_slide.classList.remove('first-state');
            left_slide.classList.remove('first-visible');
            left_slide.classList.add('custom-hidden');
            right_slide.classList.remove('custom-hidden');
            right_slide.classList.add('custom-visible');
            setInterval(() => {
                left_slide.classList.toggle('custom-hidden');
                left_slide.classList.toggle('custom-visible');
                right_slide.classList.toggle('custom-hidden');
                right_slide.classList.toggle('custom-visible');
            }, 19000);
        }, 11000);
    }   

    // alert(p) {
    //     window.alert(p)
    // }

    handle_no_events() {
        console.log('no evetns emitted')
        this.no_events = true;
    }

    handle_no_testimonials() {
        // console.log('no evetns emitted')
        this.no_testimonials = true;
    }
}
