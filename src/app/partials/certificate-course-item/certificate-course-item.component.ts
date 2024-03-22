import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ExpandItemLinkComponent } from "../links/expand-item-link/expand-item-link.component";
import { CertificateCourseItem } from 'src/app/interfaces/certificate-course';
import { CartButtonComponent } from "../cart-button/cart-button.component";
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';

@Component({
    selector: 'app-certificate-course-item',
    standalone: true,
    templateUrl: './certificate-course-item.component.html',
    styleUrls: ['./certificate-course-item.component.css'],
    imports: [CommonModule, RouterLink, ExpandItemLinkComponent, CartButtonComponent]
})
export class CertificateCourseItemComponent implements OnInit {
  @Input() course!: CertificateCourseItem;
  carted: boolean = false;

  constructor(private auth: AuthService, private cart: CartService) {}

  ngOnInit(): void {
    if (this.auth.isLoggedIn('student') && this.cart.has('certificate_courses', this.course.code)) this.carted = true;
  }
}
