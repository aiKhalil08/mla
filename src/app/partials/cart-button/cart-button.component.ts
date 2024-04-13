import { CommonModule } from '@angular/common';
import { Component, HostListener, Input } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart-button.component.html',
  styleUrls: ['./cart-button.component.css']
})
export class CartButtonComponent {


  @Input() carted: boolean;
  @Input() course: {identity: string, category: string};
  @Input() type: string = 'rounded';

  @HostListener('click', ['$event']) cart(event) {  
    if (!this.authService.isLoggedIn('student')) document.location.href = 'login';
    if (this.carted || this.processing) return false;
    this.processing = true;

      this.cartService.cart_course(this.course).subscribe({
        next: (response) => {
          this.processing = false;
          if (response.status == 'success') {
            this.carted = true;
            this.cartService.set_cart(response.cart);
          }
        }
      });
    
    return false;

  }

  processing: boolean = false;

  constructor (private cartService: CartService, private authService: AuthService) {}


}
