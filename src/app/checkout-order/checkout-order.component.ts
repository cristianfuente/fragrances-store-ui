import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HeaderComponent } from '../layout/header/header.component';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-checkout-order',
  imports: [CommonModule, HeaderComponent],
  templateUrl: './checkout-order.component.html',
  styleUrl: './checkout-order.component.scss',
  standalone: true,
})
export class CheckoutOrderComponent implements OnInit {
  isApproved = false;
  transactionCode = '';
  paymentDate = new Date();
  detail = 'Perfume coach new york - extrait de parfum - hombre + 1 producto';
  method = 'PSE';
  amount = 800000;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly cartService: CartService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.transactionCode = params['transaction_code'];
      this.isApproved =
        this.transactionCode !== undefined &&
        this.transactionCode !== null &&
        this.transactionCode !== '0';

      if (this.isApproved) {
        this.cartService.clearCart();
      }
    });
  }

  formatDate(date: Date): string {
    return new Intl.DateTimeFormat('es-CO', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    }).format(date);
  }
}
