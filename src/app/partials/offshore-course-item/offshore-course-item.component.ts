import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ExpandItemLinkComponent } from "../links/expand-item-link/expand-item-link.component";
import { OffshoreCourseItem } from 'src/app/interfaces/offshore-course';
import { CartButtonComponent } from "../cart-button/cart-button.component";
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';

@Component({
    selector: 'app-offshore-course-item',
    standalone: true,
    templateUrl: './offshore-course-item.component.html',
    styleUrls: ['./offshore-course-item.component.css'],
    imports: [CommonModule, RouterLink, ExpandItemLinkComponent, CartButtonComponent]
})
export class OffshoreCourseItemComponent {
  @Input() course!: OffshoreCourseItem;
  carted: boolean = false;

  constructor(private auth: AuthService, private cart: CartService) {}

  ngOnInit(): void {
    if (this.auth.isLoggedIn('student') && this.cart.has('offshore_courses', this.course.title)) this.carted = true;
  }
}
