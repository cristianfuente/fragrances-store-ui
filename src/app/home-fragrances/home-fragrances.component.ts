import { Component, signal } from '@angular/core';
import { ListFragrancesComponent } from './list-fragrances/list-fragrances.component';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../layout/header/header.component';
import { CatalogFiltersComponent } from './catalog-filters/catalog-filters.component';
import { CatalogParameter } from '../models/catalog.parameter.model';
import { Fragrance } from '../models/fragrance.model';
import { FraganceDetailComponent } from '../fragance-detail/fragance-detail.component';

@Component({
  selector: 'app-home-fragrances',
  imports: [
    CommonModule,
    HeaderComponent,
    ListFragrancesComponent,
    CatalogFiltersComponent,
    FraganceDetailComponent
  ],
  templateUrl: './home-fragrances.component.html',
  styleUrl: './home-fragrances.component.scss',
  standalone: true,
})
export class HomeFragrancesComponent {
  searchText = signal('');
  selectedFilters = signal<CatalogParameter[]>([]);
  selectedFragrance: Fragrance | null = null;

  updateSearch(value: string) {
    this.searchText.set(value);
  }

  onSelectFragrance(fragrance: Fragrance){
    console.log(fragrance);
    this.selectedFragrance = fragrance;
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
