import { Component, signal } from '@angular/core';
import { ListFragrancesComponent } from './list-fragrances/list-fragrances.component';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../layout/header/header.component';

@Component({
  selector: 'app-home-fragrances',
  imports: [CommonModule, HeaderComponent, ListFragrancesComponent],
  templateUrl: './home-fragrances.component.html',
  styleUrl: './home-fragrances.component.scss',
  standalone: true
})
export class HomeFragrancesComponent {
  searchText = signal('');

  updateSearch(value: string) {
    this.searchText.set(value);
  }
}