import { Component } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { CommonModule } from '@angular/common';
@Component({
  standalone: true,
  imports: [CommonModule],
  selector: 'app-order-confirmation',
  templateUrl: './order-confirmation.component.html',
  styleUrls: ['./order-confirmation.component.scss'],
})
export class OrderConfirmationComponent {
  cartItems: any[] = [];
  isVisible = false;
  orderTotal = 0;
  constructor(private cartService: CartService) {}
  ngOnInit(): void {
    this.cartService.getOrderConfirmationStatus().subscribe((status) => {
      this.isVisible = status;
      if (status) {
        this.cartService.getCartItems().subscribe((items) => {
          this.cartItems = items;
        });
        this.cartService.getOrderTotal().subscribe((total) => {
          this.orderTotal = total;
        });
      }
    });
  }

  startNewOrder() {
    this.cartService.startNewOrder();
    this.isVisible = false;
  }
}
