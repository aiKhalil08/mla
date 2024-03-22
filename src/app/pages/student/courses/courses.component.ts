// import { Component, OnInit } from '@angular/core';
// import Cart from 'src/app/interfaces/cart';
// import { CartService } from 'src/app/services/cart.service';

// @Component({
//   selector: 'app-courses',
//   standalone: true,
//   imports: [],
//   templateUrl: './courses.component.html',
//   styleUrls: ['./courses.component.css']
// })
// export class CoursesComponent implements OnInit{

//   cart: Cart;

//   constructor(private cartService: CartService) {}

//   ngOnInit(): void {
//     this.cartService.fetch_cart().subscribe({
//       next: (response) => {
//         this.cart = response.cart;
//       }
//     });
//   }

// }
