export interface Product {
  id: number;
  category_id: number;
  name: string;
  rating: number;
  stock: number;
  Specification: {
    weight: string;
    dimensions: string;
    ingredients: string[];
    skinType: string[];
    shelfLife: string;
  };
  HeroImages: string[];
  RelatedProducts: number[];
  Other_products: number[];
  YoutubeLink: string;
  Description: string;
  Details: {
    benefits: string[];
    how_to_use: string;
    Reviews: {
      user: string;
      rating: number;
      comment: string;
      date: string;
    }[];
    faqs: {
      question: string;
      answer: string;
    }[];
  };
}