import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Cart, CartItem } from 'src/app/interfaces/cart';
import { CartService } from 'src/app/services/cart.service';
import { CartItemComponent } from "../cart-item/cart-item.component";
import { EmptyContentComponent } from '../empty-content/empty-content.component';

@Component({
    selector: 'app-cart',
    standalone: true,
    templateUrl: './cart.component.html',
    styleUrls: ['./cart.component.css'],
    imports: [CommonModule, CartItemComponent, EmptyContentComponent]
})
export class CartComponent implements OnInit {
  cart: CartItem[];

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    
      this.cartService.fetch_cart().subscribe({
        next: (response) => {
  
          this.handleResponse(response)
        }
      });
  }


  handleResponse(response: {cart: Cart}) {
    this.cart = Object.entries(response.cart).flatMap(([category, courses]) => {
      return courses.map(course => ({...course, category}))
    });
  }
}