import { ObjectId } from 'mongodb';

export interface Product {
  _id?: ObjectId | string;
  id: string;
  category_id: string;
  name: string;
  rating: number;
  specification: {
    [key: string]: string | string[];
  };
  heroImages: string[];
  relatedProducts: string[]; // Changed from number[] to string[]
  other_products: string[]; // Changed from number[] to string[]
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