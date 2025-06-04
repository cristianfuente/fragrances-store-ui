import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from '../layout/header/header.component';
import { CartItem } from '../models/cart.item.model';
import { CartService } from '../services/cart.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';

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
  code = '';

  paymentMethods: { id: number; name: string }[] = [];
  departamentos: string[] = [];

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
    codigoPostal: '',
  };

  paymentMethod: string = '';

  constructor(
    private readonly cart: CartService,
    private readonly http: HttpClient
  ) {
    this.cart.cartItems$.subscribe((items) => {
      this.cartItems = items;
      this.total = items.reduce((acc, i) => acc + i.quantity * i.price, 0);
    });

    this.http
      .get<{ id: number; name: string }[]>(
        `${environment.apiUrl}/payment-methods`
      )
      .subscribe((methods) => (this.paymentMethods = methods));

    this.http
      .get<any[]>(
        'https://raw.githubusercontent.com/marcovega/colombia-json/master/colombia.min.json'
      )
      .subscribe((data) => {
        this.departamentos = data.map((d) => d.departamento).sort();
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

  submitOrder() {
    if (!this.isFormValid()) {
      alert('Por favor completa todos los campos.');
      return;
    }
  
    const selectedMethod = this.paymentMethods.find(m => m.name === this.paymentMethod);
  
    const orderPayload = {
      apiKey: 'APIKEY123',
      paymentMethodId: selectedMethod?.id,
      email: this.email,
      firstName: this.customer.nombre,
      lastName: this.customer.apellidos,
      documentNumber: this.customer.cedula,
      phone: this.customer.telefono,
      address: this.customer.direccion,
      additionalAddressInfo: this.customer.complemento,
      country: 'Colombia',
      department: this.customer.departamento,
      postalCode: this.customer.codigoPostal,
      products: this.cartItems.map(item => ({
        fragranceId: item.id,
        sizeId: item.sizeId,
        quantity: item.quantity
      }))
    };
  
    this.http.post<{ code: string }>(`${environment.apiUrl}/order`, orderPayload).subscribe({
      next: (res) => {
        this.code = res.code;
      },
      error: () => alert('Error al crear la orden')
    });
  }
  
}
