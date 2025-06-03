import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, Input, OnChanges, signal, SimpleChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-list-fragrances',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './list-fragrances.component.html',
  styleUrl: './list-fragrances.component.scss',
})
export class ListFragrancesComponent implements OnChanges{
  @Input() searchText: string = '';

  fragrances = signal<any[]>([]);
  page = signal(0);
  totalPages = signal(0);
  filters = signal<{ id: number; name: string }[]>([]);
  readonly pageSize = 10;

  constructor(private readonly http: HttpClient) {
    this.loadFragrances();
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['searchText']) {
      this.page.set(0);
      this.loadFragrances();
    }
  }

  loadFragrances() {
    const body = {
      filters: this.filters(), 
      searchText: this.searchText,
      page: this.page(),
      size: this.pageSize,
      apiKey: 'APIKEY123',
    };

    this.http
      .post<any>('http://localhost:8080/fragrances', body)
      .subscribe((response) => {
        this.fragrances.set(response.data);
        this.totalPages.set(response.totalPages);
      });
  }

  onSearch() {
    this.page.set(0);
    this.loadFragrances();
  }

  nextPage() {
    if (this.page() + 1 < this.totalPages()) {
      this.page.update((p) => p + 1);
      this.loadFragrances();
    }
  }

  prevPage() {
    if (this.page() > 0) {
      this.page.update((p) => p - 1);
      this.loadFragrances();
    }
  }
}
