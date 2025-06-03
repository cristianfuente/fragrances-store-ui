import { CatalogParameter } from "./catalog.parameter.model";
import { FragranceSize } from "./fragrance.size.model";

export interface Fragrance {
    id: number;
    name: string;
    description: string;
    sizes: FragranceSize[];
    parameters: CatalogParameter[];
  }