import { Component, signal } from '@angular/core';
import { ListFragrancesComponent } from './list-fragrances/list-fragrances.component';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../layout/header/header.component';
import { CatalogFiltersComponent } from './catalog-filters/catalog-filters.component';
import { CatalogParameter } from '../models/catalog.parameter.model';

@Component({
  selector: 'app-home-fragrances',
  imports: [
    CommonModule,
    HeaderComponent,
    ListFragrancesComponent,
    CatalogFiltersComponent,
  ],
  templateUrl: './home-fragrances.component.html',
  styleUrl: './home-fragrances.component.scss',
  standalone: true,
})
export class HomeFragrancesComponent {
  searchText = signal('');
  selectedFilters = signal<CatalogParameter[]>([]);

  updateSearch(value: string) {
    this.searchText.set(value);
  }

  updateFilters(param: CatalogParameter) {
    const current = this.selectedFilters();
    const exists = current.find(p => p.id === param.id);
    const updated = exists
      ? current.filter(p => p.id !== param.id)
      : [...current, param];
  
    this.selectedFilters.set(updated);
  }
  
  removeFilter(param: CatalogParameter) {
    this.selectedFilters.set(
      this.selectedFilters().filter(p => p.id !== param.id)
    );
  }  
  
}
