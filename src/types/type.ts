// types.ts
export interface Product {
    id: number;
    name: string;
    rating: number;
    image: string;
  }
  
  export interface Deal {
    id: number;
    name: string;
    description: string;
    discount: string;
    image: string;
  }
  
  export interface CategoryData {
    id: string;
    name: string;
    description: string;
    products: Product[];
    deals: Deal[];
    trendingProducts: Product[];
    newReleases: Product[];
  }