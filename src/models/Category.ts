import mongoose from 'mongoose';

// Product schema
const ProductSchema = new mongoose.Schema({
  id: Number,
  name: String,
  image: String,
  rating: Number
});

// Deal schema
const DealSchema = new mongoose.Schema({
  id: Number,
  name: String,
  description: String,
  discount: String,
  image: String
});

// Trending/New Release product schema
const FeaturedProductSchema = new mongoose.Schema({
  id: Number,
  name: String,
  rating: Number,
  image: String
});

// Main category schema
const CategorySchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  description: { type: String, required: true },
  products: [ProductSchema],
  deals: [DealSchema],
  trendingProducts: [FeaturedProductSchema],
  newReleases: [FeaturedProductSchema]
});

// Create the model or get it if it already exists
export const Category = mongoose.models.Category || mongoose.model('Category', CategorySchema);