'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import './landing_products.css';
import Link from 'next/link';

interface Product {
  id: string;
  name: string;
  image: string;
  rating: number;
}

interface Category {
  _id: string;
  id: string;
  name: string;
  products?: Product[];
}

const Products = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProductsFromCategories = async () => {
      try {
        // First fetch categories
        const categoryResponse = await fetch('/api/categories');
        if (!categoryResponse.ok) {
          throw new Error(`Failed to fetch categories: ${categoryResponse.statusText}`);
        }
        const categories: Category[] = await categoryResponse.json();

        // Get first two products from each category's products array
        let allProducts: Product[] = [];
        
        categories.forEach(category => {
          if (category.products && category.products.length > 0) {
            // Take first two products
            const categoryProducts = category.products.slice(0, 2);
            allProducts = [...allProducts, ...categoryProducts];
          }
        });
        
        setProducts(allProducts);
      } catch (error) {
        console.error('Error fetching products:', error);
        setError(error instanceof Error ? error.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchProductsFromCategories();
  }, []);

  if (loading) {
    return (
      <div>
        <h2 className="products-title text-3xl sm:text-4xl lg:text-5xl font-bold text-center mb-8 text-gray-800">Products</h2>
        <div className="products-grid">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
            <div key={item} className="product-card animate-pulse">
              <div className="relative w-full h-[80%] bg-gray-200"></div>
              <div className="product-content">
                <div className="h-5 bg-gray-200 rounded w-3/4 mb-2"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500">
        <h2 className="products-title text-3xl sm:text-4xl lg:text-5xl font-bold mb-8 text-gray-800">Products</h2>
        <p>{error}</p>
      </div>
    );
  }

  if (!products.length) {
    return (
      <div className="text-center">
        <h2 className="products-title text-3xl sm:text-4xl lg:text-5xl font-bold mb-8 text-gray-800">Products</h2>
        <p>No products found</p>
      </div>
    );
  }

  return (
    <div>
      <h2 className="products-title text-3xl sm:text-4xl lg:text-5xl font-bold text-center mb-8 text-gray-800">Products</h2>
      <div className="products-grid">
        {products.map((product) => (
          <div key={product.id} className="product-card group">
            <div className="relative w-full h-[80%]">
              <Image 
                src={product.image} 
                alt={product.name} 
                fill
                sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 16.66vw"
                className="product-image"
                priority
              />
            
            </div>
            <div className="product-content">
              <Link 
                href={`/products/${product.id}`}
                className="product-name-link"
              >
                <h3 className="product-name">{product.name}</h3>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
