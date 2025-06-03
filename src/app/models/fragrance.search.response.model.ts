import { Fragrance } from "./fragrance.model";

export interface FragranceSearchResponse {
    data: Fragrance[];
    totalPages: number;
    totalElements: number;
    currentPage: number;
    size: number;
    margin: number;
  }