import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartItems = new BehaviorSubject<any[]>([]);
  private isOrderConfirmed = new BehaviorSubject<boolean>(false);
  constructor() {}
  getCartItems() {
    return this.cartItems.asObservable();
  }

  addToCart(product: any) {
    const items = this.cartItems.value;
    const existingItem = items.find((item) => item.id === product.id);

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      items.push({ ...product, quantity: 1 });
    }
    this.cartItems.next(items);
  }

  removeFromCart(item: any) {
    const items = this.cartItems.value.filter((i) => i.id !== item.id);
    this.cartItems.next(items);
  }
  confirmOrder() {
    this.isOrderConfirmed.next(true);
  }
  startNewOrder() {
    this.cartItems.next([]);
  }

  getOrderConfirmationStatus() {
    return this.isOrderConfirmed.asObservable();
  }

  getOrderTotal(): Observable<number> {
    return this.cartItems.asObservable().pipe(
      map((items) => {
        return items.reduce((acc, item) => acc + item.price * item.quantity, 0);
      })
    );
  }
}
