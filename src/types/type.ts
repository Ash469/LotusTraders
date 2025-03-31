// types.ts
export interface Product {
    id: string;
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
    heroImages: string[];
    id: string;
    name: string;
    description: string;
    products: Product[];
    deals: Deal[];
    trendingProducts: Product[];
    newReleases: Product[];
  }