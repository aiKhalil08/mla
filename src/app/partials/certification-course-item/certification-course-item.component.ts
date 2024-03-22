import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ExpandItemLinkComponent } from "../links/expand-item-link/expand-item-link.component";
import { CertificationCourseItem } from 'src/app/interfaces/certification-course';
import { CartButtonComponent } from "../cart-button/cart-button.component";
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';

@Component({
    selector: 'app-certification-course-item',
    standalone: true,
    templateUrl: './certification-course-item.component.html',
    styleUrls: ['./certification-course-item.component.css'],
    imports: [CommonModule, RouterLink, ExpandItemLinkComponent, CartButtonComponent]
})
export class CertificationCourseItemComponent {
  @Input() course!: CertificationCourseItem;
  carted: boolean = false;

  constructor(private auth: AuthService, private cart: CartService) {}

  ngOnInit(): void {
    if (this.auth.isLoggedIn('student') && this.cart.has('certification_courses', this.course.code)) this.carted = true;
  }
}
