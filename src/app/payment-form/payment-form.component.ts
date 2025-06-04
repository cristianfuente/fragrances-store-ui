import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from '../layout/header/header.component';
import { CartItem } from '../models/cart.item.model';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-payment-form',
  imports: [HeaderComponent, FormsModule, CommonModule],
  templateUrl: './payment-form.component.html',
  styleUrl: './payment-form.component.scss',
})
export class PaymentFormComponent {
  
  cartItems: CartItem[] = [];
  total = 0;
  email = '';
  emailConfirmed = false;

  customer = {
    nombre: '',
    apellidos: '',
    cedula: '',
    telefono: '',
    direccion: '',
    complemento: '',
    pais: 'Colombia',
    departamento: '',
    ciudad: '',
    codigoPostal: ''
  };

  paymentMethod: string = '';
  
  constructor(private readonly cart: CartService) {
    this.cart.cartItems$.subscribe((items) => {
      this.cartItems = items;
      this.total = items.reduce((acc, i) => acc + i.quantity * i.price, 0);
    });
  }

  setPaymentMethod(method: string) {
    this.paymentMethod = method;
  }
  
  isFormValid() {
    return (
      this.email &&
      this.emailConfirmed &&
      this.customer.nombre &&
      this.customer.apellidos &&
      this.customer.cedula &&
      this.customer.telefono &&
      this.customer.direccion &&
      this.customer.departamento &&
      this.customer.ciudad &&
      this.customer.codigoPostal &&
      this.paymentMethod &&
      this.cartItems.length > 0
    );
  }

  removeFromCart(itemToRemove: CartItem) {
    this.cart.removeItem(itemToRemove);
  }

}
