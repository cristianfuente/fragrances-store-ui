import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CartItem } from '../models/cart.item.model';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private items = new BehaviorSubject<CartItem[]>(this.loadFromStorage());
  cartItems$ = this.items.asObservable();

  get currentItems(): CartItem[] {
    return this.items.value;
  }

  clearCart(): void {
    this.items.next([]);
    localStorage.removeItem('cart');
  }

  private loadFromStorage(): CartItem[] {
    const data = localStorage.getItem('cart');
    return data ? JSON.parse(data) : [];
  }
  
  private saveToStorage(items: CartItem[]) {
    localStorage.setItem('cart', JSON.stringify(items));
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
    this.saveToStorage(updatedItems); 
  }

  getTotalQuantity(): number {
    return this.currentItems.reduce((sum, item) => sum + item.quantity, 0);
  }

  removeItem(item: CartItem) {
    const current = this.items.value;
    const updated = current.filter(p => !(p.id === item.id && p.sizeId === item.sizeId));
    this.items.next(updated);
    this.saveToStorage(updated); 
  }
  
}
