import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
// import Cart from 'src/app/interfaces/cart';
import { CartComponent } from 'src/app/partials/cart/cart.component';
import { CartService } from 'src/app/services/cart.service';
import { TrendingCoursesComponent } from "../../../partials/trending-courses/trending-courses.component";

@Component({
    selector: 'app-courses',
    standalone: true,
    templateUrl: './student-courses.component.html',
    styleUrls: ['./student-courses.component.css'],
    imports: [CommonModule, CartComponent, TrendingCoursesComponent]
})
export class StudentCoursesComponent{

  // cart: Cart;

  // constructor(private cartService: CartService) {}

  // ngOnInit(): void {
  //   this.cartService.fetch_cart().subscribe({
  //     next: (response) => {
  //       this.cart = response.cart;
  //       console.log(this.cart)
  //     }
  //   });
  // }

}
