import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { DoMoreLinkComponent } from "../links/do-more-link/do-more-link.component";
import { CertificateCourseItem } from 'src/app/interfaces/certificate-course';
import { CertificateCourseItemComponent } from '../certificate-course-item/certificate-course-item.component';
import { CertificateCourseService } from 'src/app/services/certificate-course.service';
import { CartService } from 'src/app/services/cart.service';

@Component({
    selector: 'app-certificate-course-list',
    standalone: true,
    templateUrl: './certificate-course-list.component.html',
    styleUrls: ['./certificate-course-list.component.css'],
    imports: [CommonModule, RouterLink, DoMoreLinkComponent, CertificateCourseItemComponent]
})
export class CertificateCourseListComponent implements OnInit {
  @Input() type!: string;
  @Input() count: number | 'all' = 'all';
  course_items: CertificateCourseItem[];
  loaded: boolean = false;
  constructor (private courseService: CertificateCourseService, private cartService: CartService) {}

  ngOnInit() {
    // console.log(this.cartService.get_cart());
      this.courseService.getList(this.count).subscribe({
        next: (response) => {
          this.loaded = true;
          this.course_items = response;
        },
      });
  
 }
}
