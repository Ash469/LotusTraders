'use client';

import React from 'react';
import Image from 'next/image';
import './Categories.css'; // Import the CSS file

const categories = [
  { id: 1, name: 'Concrete Mixer', image: '/assets/cateogries/cat1.png', description: 'Efficiently blends and mixes cement, sand, and water to create uniform concrete.' },
  { id: 2, name: 'Modules', image: '/assets/cateogries/cat2.png', description: 'Combines manual and automated processes for enhanced efficiency' },
  { id: 3, name: 'Testing Equipment', image: '/assets/cateogries/cat3.png', description: 'Ensures precise material binding for perfect quality, consistency, and controlled preparation' },
  { id: 4, name: 'Brick Maker', image: '/assets/cateogries/cat4.png', description: 'Used for hands-on learning, fostering experimentation, research, and scientific' },
  { id: 5, name: 'Bar Bender & Cutter', image: '/assets/cateogries/cat5.png', description: 'Efficiently blends and mixes cement, sand, and water to create uniform concrete.' },
  { id: 6, name: 'Vibrator', image: '/assets/cateogries/cat6.png', description: 'Combines manual and automated processes for enhanced efficiency' },
  { id: 7, name: 'Trimix', image: '/assets/cateogries/cat7.png', description: 'Ensures precise material binding for perfect quality, consistency, and controlled preparation' },
  { id: 8, name: 'Trolley', image: '/assets/cateogries/cat8.png', description: 'Used for hands-on learning, fostering experimentation, research, and scientific' },
  // Add more categories as needed
];

const Categories = () => {
  return (
    <div>
      <h2 className="categories-title">Categories</h2>
      <div className="categories-grid">
        {categories.map((category) => (
          <div
            key={category.id}
            className="category-card"
          >
            <div className="relative w-full h-[65%]">
              <Image 
                src={category.image} 
                alt={category.name} 
                fill
                sizes="(max-width: 768px) 50vw, 25vw"
                className="category-image"
                priority={category.id <= 4}
              />
            </div>
            <div className="category-content">
              <h3 className="category-name">{category.name}</h3>
              <p className="category-description">{category.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;