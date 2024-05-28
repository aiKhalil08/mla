import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, NavigationEnd, Router, RouterLink, RouterOutlet } from '@angular/router';
import { ExpandItemLinkComponent } from "../../partials/links/expand-item-link/expand-item-link.component";
import { Observable, Subscription, combineLatest, combineLatestAll, filter, fromEvent, map, merge, of, startWith } from 'rxjs';




@Component({
    selector: 'app-course-catalogue',
    standalone: true,
    templateUrl: './course-catalogue.component.html',
    styleUrls: ['./course-catalogue.component.css'],
    imports: [CommonModule, RouterLink, ExpandItemLinkComponent, RouterOutlet]
})
export class CourseCatalogueComponent implements OnInit, OnDestroy {
    section_header: string;
    course_type_stream: Observable<string>;
    course_type_subscription: Subscription;

    constructor (private route: ActivatedRoute, private router: Router) {}

    ngOnInit(): void {

        this.course_type_stream = this.router.events.pipe(
            filter(e => e instanceof NavigationEnd),
            map(e => /.*\/(.+)$/.exec((<NavigationEnd>e).url)[1]),
            startWith(/.*\/(.+)$/.exec(location.href)[1])
        )

        this.course_type_subscription = this.course_type_stream.subscribe(e => this.setHeader(e));
    }

    ngOnDestroy(): void {
        this.course_type_subscription.unsubscribe();
    }

    setHeader(course_type: string) {
        switch (course_type) {
            case 'certificate-courses':
                this.section_header = 'Our Certificate Courses';
                break;
            case 'certification-courses':
                this.section_header = 'Our Certification Training Courses';
                break;
            case 'offshore-courses':
                this.section_header = 'Our Offshore Courses';
                break;
        }
    }
}
