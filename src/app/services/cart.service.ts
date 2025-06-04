import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CartItem } from '../models/card.item.model';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private items = new BehaviorSubject<CartItem[]>([]);
  cartItems$ = this.items.asObservable();

  get currentItems(): CartItem[] {
    return this.items.value;
  }

  addToCart(item: CartItem) {
    const existing = this.currentItems.find(
      (i) => i.id === item.id && i.sizeId === item.sizeId
    );
    const updatedItems = existing
      ? this.currentItems.map((i) =>
          i.id === item.id && i.sizeId === item.sizeId
            ? { ...i, quantity: i.quantity + item.quantity }
            : i
        )
      : [...this.currentItems, item];

    this.items.next(updatedItems);
  }

  getTotalQuantity(): number {
    return this.currentItems.reduce((sum, item) => sum + item.quantity, 0);
  }
}
