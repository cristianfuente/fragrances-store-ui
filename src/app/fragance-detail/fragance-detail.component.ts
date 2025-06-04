import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CartService } from '../services/cart.service';
import { CartItem } from '../models/cart.item.model';

@Component({
  selector: 'app-fragance-detail',
  imports: [CommonModule],
  templateUrl: './fragance-detail.component.html',
  styleUrl: './fragance-detail.component.scss',
  standalone: true
})
export class FraganceDetailComponent {
  @Input() selectedFragrance: any;
  selectedSizeIndex = 0;
  @Output() onSelectFragrance = new EventEmitter();

  constructor(private readonly cartService: CartService){}

  quantity = 1;

  increment() {
    this.quantity++;
  }

  decrement() {
    if (this.quantity > 1) this.quantity--;
  }

  agregarAlCarrito() {
    console.log(this.selectedFragrance);
    const item: CartItem = {
      id: this.selectedFragrance.id,
      name: this.selectedFragrance.name,
      quantity: this.quantity,
      sizeId: this.selectedFragrance.sizes[this.selectedSizeIndex].sizeId,
      price: this.selectedFragrance.sizes[this.selectedSizeIndex].price,
      sizeLabel: this.selectedFragrance.sizes[this.selectedSizeIndex].size + ' ' 
      + this.selectedFragrance.sizes[this.selectedSizeIndex].unit,
      imageUrl: this.selectedFragrance.sizes[this.selectedSizeIndex].imageUrl
    };
  
    this.cartService.addToCart(item);
    this.onSelectFragrance.emit()
  }
  
}
