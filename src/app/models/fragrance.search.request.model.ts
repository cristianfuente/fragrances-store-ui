import { CatalogParameter } from "./catalog.parameter.model";

export interface FragranceSearchRequest {
    filters: CatalogParameter[];
    searchText: string;
    page: number;
    size: number;
    apiKey: string;
  }