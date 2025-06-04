import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CartService } from '../../services/cart.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [CommonModule, FormsModule],
  standalone: true,
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  searchValue = '';
  @Output() search = new EventEmitter<string>();
  cartCount = 0;

  @Input() showCart = true;
  @Input() showSearch = true;

  constructor(
    private readonly cartService: CartService,
    private readonly router: Router
  ) {
    this.cartService.cartItems$.subscribe((items) => {
      this.cartCount = items.reduce((sum, item) => sum + item.quantity, 0);
    });
  }

  onSearch() {
    this.search.emit(this.searchValue);
  }

  goToPayment() {
    this.router.navigate(['/payment']);
  }
  
  goToHome() {
    window.location.href = '/';
  }
}
