import { CatalogParameter } from "./catalog.parameter.model";

export interface Catalog {
    id: number;
    name: string;
    parameters: CatalogParameter[];
  }