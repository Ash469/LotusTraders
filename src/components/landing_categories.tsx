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
  const [currentImageIndices, setCurrentImageIndices] = useState<{ [key: string]: number }>({});
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [sliding, setSliding] = useState<{ [key: string]: boolean }>({});

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

  useEffect(() => {
    if (!loading && categories.length > 0) {
      const columnCount = 4; // Number of columns in the grid
      
      const startColumnDominoEffect = async () => {
        // Wait for initial delay before starting the cycle
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Loop through each column
        for (let col = 0; col < columnCount; col++) {
          // Update all categories in current column
          categories.forEach((category, index) => {
            if (category.heroImages.length > 1 && index % columnCount === col) {
              setTimeout(() => {
                setCurrentImageIndices(prev => ({
                  ...prev,
                  [category._id]: ((prev[category._id] || 0) + 1) % category.heroImages.length
                }));
              }, col * 1000); // 0.5s delay between columns
            }
          });
        }
      };

      const interval = setInterval(() => {
        startColumnDominoEffect();
      }, 5000); // Complete cycle every 5 seconds

      return () => clearInterval(interval);
    }
  }, [loading, categories]);

  if (loading) {
    return (
      <div>
        <div className="animate-pulse categories-title text-3xl sm:text-4xl lg:text-5xl font-bold text-center mb-8 bg-gray-200 h-12 w-48 mx-auto rounded"></div>
        <div className="categories-grid">
          {[1, 2, 3, 4].map((item) => (
            <div 
              key={item}
              className="category-card animate-pulse"
              style={{
                background: 'linear-gradient(rgba(255, 255, 255, 0.6), rgba(255, 255, 255, 0.6))'
              }}
            >
              <div className="relative w-full h-[65%] bg-gray-200 rounded-lg"></div>
              <div className="category-content">
                <div className="h-5 bg-gray-200 rounded w-3/4 mx-auto mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-full mx-auto"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div>
      <h2 className="categories-title text-3xl sm:text-4xl lg:text-5xl font-bold text-center mb-6 mt-4 text-gray-800">Categories</h2>
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
              backgroundPosition: 'center',
              zIndex: 3,
              backgroundRepeat: 'no-repeat',
              backgroundAttachment: 'fixed',
            }}
          >
            <div className="category-image-container">
              {category.heroImages.map((image, index) => (
                <Image
                  key={`${category._id}-${index}`}
                  src={`${image}`}
                  alt={`${category.name} ${index + 1}`}
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                  className={`category-image ${
                    index === currentImageIndices[category._id] 
                      ? 'active'
                      : index === ((currentImageIndices[category._id] || 0) - 1 + category.heroImages.length) % category.heroImages.length
                      ? 'prev'
                      : ''
                  }`}
                  priority={index === 0}
                />
              ))}
            </div>
            <div className="category-content">
              <h3 className="category-name">{category.name}</h3>
              {/* <p className="category-description">{category.description}</p> */}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Categories;


