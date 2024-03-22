import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartItem } from 'src/app/interfaces/cart';

@Component({
  selector: 'app-cart-item',
  standalone: true,
  imports: [],
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.css']
})
export class CartItemComponent implements OnInit {
  @Input() course: CartItem;
  course_category: string;
  course_identity: string;

  constructor(private router: Router) {}


  ngOnInit(): void {
    switch(this.course.category) {
      case 'certificate_courses':
        this.course_category = 'Certificate course';
        this.course_identity = this.course.code;
        break;
      case 'certification_courses':
        this.course_category = 'Certification course';
        this.course_identity = this.course.code;
        break;
      case 'offshore_courses':
        this.course_category = 'Offshore course';
        this.course_identity = this.course.title;
        break;
    }
  }

  get course_name() {
    let name = this.course.title;
    if (this.course.code) name += ' - '+this.course.code;
    return name;
  }

  get category() {
    return this.course_category;
  }

  get identity() {
    return this.course_identity;
  }

  onClick() {
    this.router.navigate([`/home/course`,], {queryParams: {'type': this.course_category, 'name': this.course_identity}});
  }
}
