export interface Product {
  id: string;
  category_id: string;
  name: string;
  rating: number;
  specification: {
    weight: string;
    dimensions: string;
    ingredients: string[];
    skinType: string[];
    shelfLife: string;
  };
  heroImages: string[];
  relatedProducts: number[];
  other_products: number[];
  youtubeLink: string;
  description: string;
  details: {
    benefits: string[];
    information: string[];
    reviews: {
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