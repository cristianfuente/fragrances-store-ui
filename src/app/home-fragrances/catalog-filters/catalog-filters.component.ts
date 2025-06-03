import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output, signal } from '@angular/core';
import { Catalog } from '../../models/catalog.model';
import { CatalogParameter } from '../../models/catalog.parameter.model';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-catalog-filters',
  imports: [CommonModule],
  templateUrl: './catalog-filters.component.html',
  styleUrl: './catalog-filters.component.scss',
  standalone: true,
})
export class CatalogFiltersComponent {
  catalogs: Catalog[] = [];
  selected = signal<CatalogParameter[]>([]);

  @Output() toggleFilter = new EventEmitter<CatalogParameter>();

  constructor(private readonly http: HttpClient) {
    this.http
      .get<Catalog[]>('http://localhost:8080/catalogs')
      .subscribe((res) => {
        this.catalogs = res;
      });
  }

  isSelected(param: CatalogParameter): boolean {
    return this.selected().some((p) => Number(p.id) === Number(param.id));
  }
  
  toggleParameter(param: CatalogParameter): void {
    this.toggleFilter.emit(param);
  }  
  
}
