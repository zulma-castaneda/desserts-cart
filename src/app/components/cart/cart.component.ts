import { Component } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent {
  cartItems: any[] = [];
  orderTotal = 0;
  totalItems = 0;

  constructor(private cartService: CartService) {
    this.cartService.getCartItems().subscribe((items) => {
      this.cartItems = items;
      this.orderTotal = this.cartItems.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
      );
      this.totalItems = this.cartItems.reduce(
        (acc, item) => acc + item.quantity,
        0
      );
    });
  }

  removeFromCart(item: any) {
    this.cartService.removeFromCart(item);
  }
  confirmOrder() {
    this.cartService.confirmOrder();
  }
}
