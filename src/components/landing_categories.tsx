'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import './landing_categories.css';

interface Category {
  _id: string;
  id: string;
  name: string;
  description: string;
  heroImages: string[];
}

const Categories = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('/api/categories');
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (loading) {
    return <div className="text-center py-8">Loading categories...</div>;
  }

  return (
    <div>
      <h2 className="categories-title text-3xl sm:text-4xl lg:text-5xl font-bold text-center mb-8 text-gray-800">Categories</h2>
      <div className="categories-grid">
        {categories.map((category) => (
          <Link
            key={category._id}
            href={`/categories/${category.id}`}
            className="category-card"
            style={{
              background: `linear-gradient(rgba(255, 255, 255, 0.6), rgba(255, 255, 255, 0.6)), 
                          url('/assets/categories/categories-bg.png')`,
              backgroundSize: 'contain',
              backgroundPosition: 'center'
            }}
          >
            <div className="relative w-full h-[65%]">
              <Image 
                src={`/assets/categories/${category.id}_1.png`} 
                alt={category.name} 
                fill
                sizes="(max-width: 768px) 50vw, 25vw"
                className="category-image"
                priority
              />
            </div>
            <div className="category-content">
              <h3 className="category-name">{category.name}</h3>
              <p className="category-description">{category.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Categories;


