import { Component, Input } from '@angular/core';
import { Fragrance } from '../models/fragrance.model';
import { CommonModule } from '@angular/common';

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

}
